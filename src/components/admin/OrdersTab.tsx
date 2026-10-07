"use client";

import React, { useState } from "react";
import { 
  Truck, 
  MapPin, 
  X, 
  Search, 
  Phone, 
  FileDown, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  Building2, 
  ShoppingBag,
  PackageCheck
} from "lucide-react";
import { useAdmin, AdminOrder, AdminOrderStatus } from "@/context/AdminContext";

interface OrdersTabProps {
  initialSelectedOrder?: AdminOrder | null;
}

export const OrdersTab: React.FC<OrdersTabProps> = ({ initialSelectedOrder }) => {
  const { orders, updateOrderStatus, updateOrderTracking } = useAdmin();
  const [orderFilter, setOrderFilter] = useState("all");
  const [channelFilter, setChannelFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(initialSelectedOrder || null);
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);
  const [trackingOrder, setTrackingOrder] = useState<AdminOrder | null>(null);

  const [trackingForm, setTrackingForm] = useState({
    code: "",
    carrier: "Correios (Sedex)",
  });

  const getOrderChannel = (o: AdminOrder) => o.type || o.customerType || "varejo";

  const handleOpenTrackingModal = (order: AdminOrder) => {
    setTrackingOrder(order);
    setTrackingForm({
      code: order.trackingCode && order.trackingCode !== "GERANDO-RASTREIO" ? order.trackingCode : "",
      carrier: order.carrier || order.trackingCompany || "Correios (Sedex)",
    });
    setTrackingModalOpen(true);
  };

  const handleSaveTracking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingOrder || !trackingForm.code.trim()) return;
    updateOrderTracking(trackingOrder.id, trackingForm.code.trim(), trackingForm.carrier);
    setTrackingModalOpen(false);
  };

  // Filter orders
  const filteredOrders = orders.filter((o) => {
    // Channel filter
    const channel = getOrderChannel(o);
    if (channelFilter === "varejo" && channel !== "varejo") return false;
    if (channelFilter === "atacado" && channel !== "atacado") return false;

    // Status filter
    if (orderFilter !== "all") {
      const matchStatus = o.status.toLowerCase() === orderFilter.toLowerCase();
      if (!matchStatus) return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchId = (o.id || o.orderNumber || "").toLowerCase().includes(q);
      const matchClient = (o.clientName || o.customerName || "").toLowerCase().includes(q);
      const matchEmail = (o.clientEmail || o.customerEmail || "").toLowerCase().includes(q);
      const matchPhone = (o.clientPhone || o.customerPhone || "").replace(/\D/g, "").includes(q.replace(/\D/g, ""));
      const matchTracking = (o.trackingCode || "").toLowerCase().includes(q);
      return matchId || matchClient || matchEmail || matchPhone || matchTracking;
    }

    return true;
  });

  const exportOrdersCsv = () => {
    const headers = ["Pedido ID", "Data", "Cliente", "Canal", "Status", "Rastreio", "Transportadora", "Valor Total"];
    const rows = orders.map((o) => [
      o.id,
      `"${o.date}"`,
      `"${o.clientName || o.customerName || "Cliente"}"`,
      getOrderChannel(o),
      `"${o.status}"`,
      `"${o.trackingCode || ""}"`,
      `"${o.carrier || o.trackingCompany || ""}"`,
      o.total,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `pedidos_amfit_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight font-[family-name:var(--font-heading)]">
            Expedição & Gestão de Pedidos ({orders.length})
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Controle o fluxo de produção, faturamento, emissão de rastreio e aviso via WhatsApp.
          </p>
        </div>

        <button
          onClick={exportOrdersCsv}
          className="px-4 py-2.5 bg-white hover:bg-zinc-50 text-zinc-700 hover:text-zinc-900 rounded-xl text-xs font-bold flex items-center gap-2 border border-zinc-200 transition-all shadow-xs shrink-0"
        >
          <FileDown size={15} className="text-am-magenta" />
          <span>Exportar Pedidos (CSV)</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        <div className="flex flex-wrap items-center gap-2">
          {/* Channel selector */}
          <div className="bg-white p-1 rounded-xl border border-zinc-200 shadow-xs flex items-center">
            <button
              onClick={() => setChannelFilter("all")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                channelFilter === "all" ? "bg-am-magenta text-white shadow-xs" : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setChannelFilter("atacado")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                channelFilter === "atacado" ? "bg-purple-600 text-white shadow-xs" : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              <Building2 size={11} /> Atacado
            </button>
            <button
              onClick={() => setChannelFilter("varejo")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                channelFilter === "varejo" ? "bg-pink-600 text-white shadow-xs" : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              <ShoppingBag size={11} /> Varejo
            </button>
          </div>

          {/* Status Pills */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            {["all", "Novo", "Pago", "Em preparação", "Enviado", "Entregue", "Cancelado"].map(
              (st) => (
                <button
                  key={st}
                  onClick={() => setOrderFilter(st)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                    orderFilter === st
                      ? "bg-zinc-900 text-white font-black shadow-xs"
                      : "bg-white hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900 border border-zinc-200"
                  }`}
                >
                  {st === "all" ? "Status: Todos" : st}
                </button>
              )
            )}
          </div>
        </div>

        {/* Search input */}
        <div className="relative w-full lg:w-72">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por código, cliente, rastreio..."
            className="w-full py-2 pl-9 pr-3 text-xs bg-white border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-am-magenta focus:ring-2 focus:ring-am-magenta/10 transition-all shadow-xs"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50 text-zinc-500 uppercase tracking-wider border-b border-zinc-200 text-[10px]">
              <tr>
                <th className="py-3.5 px-4 font-bold">Código</th>
                <th className="py-3.5 px-4 font-bold">Data</th>
                <th className="py-3.5 px-4 font-bold">Cliente</th>
                <th className="py-3.5 px-4 font-bold">Canal</th>
                <th className="py-3.5 px-4 font-bold">Status do Pedido</th>
                <th className="py-3.5 px-4 font-bold">Rastreio</th>
                <th className="py-3.5 px-4 font-bold text-right">Total</th>
                <th className="py-3.5 px-4 font-bold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredOrders.map((order) => {
                const channel = getOrderChannel(order);
                const clientPhone = (order.clientPhone || order.customerPhone || "").replace(/\D/g, "");
                const clientName = order.clientName || order.customerName || "Cliente";

                return (
                  <tr key={order.id} className="hover:bg-zinc-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-zinc-900">{order.id}</td>
                    <td className="py-3.5 px-4 text-zinc-500 whitespace-nowrap">{order.date}</td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-zinc-900">{clientName}</p>
                      <p className="text-[11px] text-zinc-400">{order.clientEmail || order.customerEmail}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          channel === "atacado"
                            ? "bg-purple-50 text-purple-700 border border-purple-200"
                            : "bg-pink-50 text-pink-700 border border-pink-200"
                        }`}
                      >
                        {channel}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as AdminOrderStatus)}
                        className={`px-2.5 py-1 rounded-xl text-xs font-black border focus:outline-none bg-white cursor-pointer shadow-xs ${
                          order.status === "Novo" || order.status === "novo"
                            ? "border-blue-300 text-blue-700 bg-blue-50/50"
                            : order.status === "Pago" || order.status === "pago"
                            ? "border-emerald-300 text-emerald-700 bg-emerald-50/50"
                            : order.status === "Em preparação" || order.status === "preparacao"
                            ? "border-amber-300 text-amber-700 bg-amber-50/50"
                            : order.status === "Enviado" || order.status === "enviado"
                            ? "border-cyan-300 text-cyan-700 bg-cyan-50/50"
                            : order.status === "Entregue" || order.status === "entregue"
                            ? "border-green-300 text-green-700 bg-green-50/50"
                            : "border-red-300 text-red-700 bg-red-50/50"
                        }`}
                      >
                        <option value="Novo">Novo</option>
                        <option value="Pago">Pago</option>
                        <option value="Em preparação">Em preparação</option>
                        <option value="Enviado">Enviado</option>
                        <option value="Entregue">Entregue</option>
                        <option value="Cancelado">Cancelado</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4">
                      {order.trackingCode && order.trackingCode !== "GERANDO-RASTREIO" ? (
                        <div className="flex items-center gap-1.5">
                          <code className="px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200 text-cyan-700 font-mono text-[11px] font-bold">
                            {order.trackingCode}
                          </code>
                          <button
                            onClick={() => handleOpenTrackingModal(order)}
                            className="text-[10px] text-zinc-500 hover:text-am-magenta underline font-medium"
                          >
                            Editar
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleOpenTrackingModal(order)}
                          className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors"
                        >
                          <Truck size={12} />
                          <span>+ Inserir Rastreio</span>
                        </button>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right font-black text-zinc-900">
                      {order.total.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {clientPhone && (
                          <a
                            href={`https://wa.me/55${clientPhone}?text=${encodeURIComponent(
                              `Olá ${clientName}, informamos que seu pedido ${order.id} na AM FIT está com status: ${order.status}.${
                                order.trackingCode ? ` Código de rastreio: ${order.trackingCode}` : ""
                              }`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-lg transition-colors border border-emerald-200"
                            title="Avisar cliente pelo WhatsApp"
                          >
                            <Phone size={13} />
                          </a>
                        )}

                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-lg text-xs font-bold transition-colors border border-zinc-200"
                        >
                          Detalhes
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Inserir / Editar Rastreio */}
      {trackingModalOpen && trackingOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-zinc-200 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
              <h3 className="font-black text-zinc-900 text-base flex items-center gap-2">
                <Truck size={18} className="text-am-magenta" />
                <span>Atualizar Rastreamento ({trackingOrder.id})</span>
              </h3>
              <button onClick={() => setTrackingModalOpen(false)} className="text-zinc-400 hover:text-zinc-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveTracking} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">Transportadora / Modalidade</label>
                <select
                  value={trackingForm.carrier}
                  onChange={(e) => setTrackingForm({ ...trackingForm, carrier: e.target.value })}
                  className="w-full py-2 px-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 text-xs focus:outline-none focus:border-am-magenta"
                >
                  <option value="Correios (Sedex)">Correios (Sedex)</option>
                  <option value="Correios (PAC)">Correios (PAC)</option>
                  <option value="Jadlog Express">Jadlog Express</option>
                  <option value="Braspress Cargas">Braspress Cargas (Atacado)</option>
                  <option value="DirectLog">DirectLog</option>
                  <option value="Retirada na Fábrica">Retirada na Fábrica</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">Código de Rastreamento *</label>
                <input
                  type="text"
                  value={trackingForm.code}
                  onChange={(e) => setTrackingForm({ ...trackingForm, code: e.target.value.toUpperCase() })}
                  placeholder="Ex: BR849201934BR"
                  required
                  className="w-full py-2 px-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 text-xs focus:outline-none focus:border-am-magenta font-mono uppercase"
                />
              </div>

              <p className="text-[11px] text-zinc-500 leading-normal">
                Ao salvar, o status do pedido será automaticamente atualizado para <strong>Enviado</strong> e sincronizado na conta do cliente.
              </p>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setTrackingModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-zinc-500 hover:text-zinc-800 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-am-magenta hover:bg-pink-600 text-white rounded-xl shadow-xs"
                >
                  Salvar Rastreio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Detalhes do Pedido */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-zinc-200 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8 animate-fadeIn space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
              <div>
                <span className="font-mono text-base font-black text-zinc-900">{selectedOrder.id}</span>
                <span className="text-xs text-zinc-500 ml-2">em {selectedOrder.date}</span>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 text-zinc-400 hover:text-zinc-600 rounded-lg hover:bg-zinc-100"
              >
                <X size={18} />
              </button>
            </div>

            {/* Client & Shipping info */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-1">
                <span className="text-zinc-400 text-[10px] uppercase font-bold block">Cliente</span>
                <p className="font-bold text-zinc-900">{selectedOrder.clientName || selectedOrder.customerName}</p>
                <p className="text-zinc-600">{selectedOrder.clientEmail || selectedOrder.customerEmail}</p>
                <p className="text-zinc-600">{selectedOrder.clientPhone || selectedOrder.customerPhone}</p>
              </div>

              <div className="p-3 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-1">
                <span className="text-zinc-400 text-[10px] uppercase font-bold block">Canal & Pagamento</span>
                <p className="font-bold text-purple-600 uppercase">{getOrderChannel(selectedOrder)}</p>
                <p className="text-zinc-600">Método: <strong className="text-zinc-900">{selectedOrder.paymentMethod || "PIX"}</strong></p>
                <p className="text-zinc-600">Status: <strong className="text-emerald-600">{selectedOrder.status}</strong></p>
              </div>
            </div>

            {/* Endereço & Entrega */}
            {selectedOrder.address && (
              <div className="p-3 bg-zinc-50 rounded-2xl border border-zinc-200 text-xs space-y-1">
                <span className="text-zinc-400 text-[10px] uppercase font-bold flex items-center gap-1">
                  <MapPin size={12} className="text-am-magenta" />
                  <span>Endereço de Envio</span>
                </span>
                <p className="text-zinc-800 font-medium">{selectedOrder.address}</p>
                {selectedOrder.trackingCode && selectedOrder.trackingCode !== "GERANDO-RASTREIO" && (
                  <p className="text-zinc-500 pt-0.5 text-[11px]">
                    Rastreamento: <strong className="font-mono text-cyan-700 font-bold">{selectedOrder.trackingCode}</strong> ({selectedOrder.carrier || selectedOrder.trackingCompany || "Correios"})
                  </p>
                )}
              </div>
            )}

            {/* Items list */}
            <div>
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-2">
                Itens do Pedido ({selectedOrder.items?.length || 0}):
              </span>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {selectedOrder.items?.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs">
                    <div>
                      <p className="font-bold text-zinc-900">{item.name || item.productName}</p>
                      <p className="text-[11px] text-zinc-500">
                        Tam: {item.size} &bull; Cor: {item.color} &bull; Qtd: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right font-black text-zinc-900">
                      R$ {((item.price || item.unitPrice || 0) * (item.quantity || 1)).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Footer */}
            <div className="pt-3 border-t border-zinc-200 flex items-center justify-between">
              <span className="text-sm font-bold text-zinc-500">Total Pago:</span>
              <span className="text-xl font-black text-emerald-600">
                {selectedOrder.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </span>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setSelectedOrder(null);
                  handleOpenTrackingModal(selectedOrder);
                }}
                className="flex-1 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-xl text-xs font-bold transition-colors border border-zinc-200"
              >
                Gerenciar Rastreamento
              </button>
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-6 py-2.5 bg-am-magenta hover:bg-pink-600 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
