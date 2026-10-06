"use client";

import React, { useState } from "react";
import { Truck, MapPin, X } from "lucide-react";
import { useAdmin, AdminOrder } from "@/context/AdminContext";

interface OrdersTabProps {
  initialSelectedOrder?: AdminOrder | null;
}

export const OrdersTab: React.FC<OrdersTabProps> = ({ initialSelectedOrder }) => {
  const { orders, updateOrderStatus, updateOrderTracking } = useAdmin();
  const [orderFilter, setOrderFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(initialSelectedOrder || null);
  const [trackingForm, setTrackingForm] = useState({
    code: "",
    carrier: "Correios (Sedex)",
  });

  const handleOpenOrder = (order: AdminOrder) => {
    setSelectedOrder(order);
    setTrackingForm({
      code: order.trackingCode || "",
      carrier: order.carrier || "Correios (Sedex)",
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-[family-name:var(--font-heading)]">
            Gestão de Pedidos ({orders.length})
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Altere status para Novo, Pago, Em preparação, Enviado, Entregue ou Cancelado.
          </p>
        </div>

        {/* Status Pills Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0">
          {["all", "Novo", "Pago", "Em preparação", "Enviado", "Entregue", "Cancelado"].map(
            (st) => (
              <button
                key={st}
                onClick={() => setOrderFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                  orderFilter === st
                    ? "bg-am-magenta text-white shadow-md shadow-am-magenta/20"
                    : "bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800"
                }`}
              >
                {st === "all" ? "Todos" : st}
              </button>
            )
          )}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950/60 text-zinc-400 uppercase tracking-wider border-b border-zinc-800">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Código</th>
                <th className="py-3.5 px-4 font-semibold">Data</th>
                <th className="py-3.5 px-4 font-semibold">Cliente</th>
                <th className="py-3.5 px-4 font-semibold">Canal</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold">Rastreio</th>
                <th className="py-3.5 px-4 font-semibold text-right">Total</th>
                <th className="py-3.5 px-4 font-semibold text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {orders
                .filter((o) => (orderFilter === "all" ? true : o.status === orderFilter))
                .map((order) => (
                  <tr key={order.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-white">{order.id}</td>
                    <td className="py-3.5 px-4 text-zinc-400">{order.date}</td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-white">{order.clientName}</p>
                      <p className="text-[11px] text-zinc-500">{order.clientEmail}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          order.type === "atacado"
                            ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                            : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        }`}
                      >
                        {order.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(order.id, e.target.value as AdminOrder["status"])
                        }
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold border focus:outline-hidden bg-zinc-950 cursor-pointer ${
                          order.status === "Novo"
                            ? "border-blue-500/40 text-blue-400"
                            : order.status === "Pago"
                            ? "border-emerald-500/40 text-emerald-400"
                            : order.status === "Em preparação"
                            ? "border-amber-500/40 text-amber-400"
                            : order.status === "Enviado"
                            ? "border-cyan-500/40 text-cyan-400"
                            : order.status === "Entregue"
                            ? "border-green-500/40 text-green-400"
                            : "border-red-500/40 text-red-400"
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
                      {order.trackingCode ? (
                        <span className="font-mono text-[11px] text-zinc-300 bg-zinc-800/80 px-2 py-1 rounded">
                          {order.trackingCode}
                        </span>
                      ) : (
                        <span className="text-[11px] text-zinc-500 italic">Sem código</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right font-black text-white">
                      {order.total.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleOpenOrder(order)}
                        className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-bold transition-colors"
                      >
                        Detalhes
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Detalhes do Pedido & Rastreio */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-black text-white text-lg">{selectedOrder.id}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      selectedOrder.type === "atacado"
                        ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                        : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    }`}
                  >
                    {selectedOrder.type}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">Realizado em {selectedOrder.date}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Client Info */}
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 mb-6">
              <h4 className="text-xs font-black uppercase text-zinc-400 tracking-wider mb-2">
                Dados do Comprador
              </h4>
              <p className="text-sm font-bold text-white">{selectedOrder.clientName}</p>
              <p className="text-xs text-zinc-400">{selectedOrder.clientEmail}</p>
              {selectedOrder.shippingAddress && (
                <p className="text-xs text-zinc-400 mt-2 flex items-center gap-1.5">
                  <MapPin size={14} className="text-am-magenta shrink-0" />
                  {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.number} -{" "}
                  {selectedOrder.shippingAddress.neighborhood},{" "}
                  {selectedOrder.shippingAddress.city} - {selectedOrder.shippingAddress.state} (
                  {selectedOrder.shippingAddress.cep})
                </p>
              )}
            </div>

            {/* Items List */}
            <div className="mb-6">
              <h4 className="text-xs font-black uppercase text-zinc-400 tracking-wider mb-3">
                Itens Comprados ({selectedOrder.items?.length || 0})
              </h4>
              <div className="space-y-2">
                {selectedOrder.items?.map((it, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-xs"
                  >
                    <div>
                      <p className="font-bold text-white">{it.name}</p>
                      <p className="text-[11px] text-zinc-400">
                        {it.quantity}x • Tam: {it.size} • Cor: {it.color}
                      </p>
                    </div>
                    <div className="text-right font-black text-white">
                      {(it.price * it.quantity).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-right">
                <span className="text-xs text-zinc-400 uppercase tracking-wider mr-2">
                  Total do Pedido:
                </span>
                <span className="text-lg font-black text-am-magenta">
                  {selectedOrder.total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
            </div>

            {/* Tracking Update Section */}
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 mb-6">
              <h4 className="text-xs font-black uppercase text-zinc-400 tracking-wider mb-3 flex items-center gap-1.5">
                <Truck size={16} className="text-am-magenta" /> Atualizar Envio & Código de Rastreio
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                    Transportadora
                  </label>
                  <input
                    type="text"
                    value={trackingForm.carrier}
                    onChange={(e) =>
                      setTrackingForm({ ...trackingForm, carrier: e.target.value })
                    }
                    placeholder="Ex: Correios (Sedex), Jadlog"
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                    Código de Rastreio
                  </label>
                  <input
                    type="text"
                    value={trackingForm.code}
                    onChange={(e) =>
                      setTrackingForm({ ...trackingForm, code: e.target.value.toUpperCase() })
                    }
                    placeholder="Ex: AM928374821BR"
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white font-mono"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  updateOrderTracking(selectedOrder.id, trackingForm.code, trackingForm.carrier);
                  setSelectedOrder({
                    ...selectedOrder,
                    trackingCode: trackingForm.code,
                    carrier: trackingForm.carrier,
                    status: "Enviado",
                  });
                  alert("Código de rastreamento salvo e pedido marcado como Enviado!");
                }}
                className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Salvar Rastreio e Marcar como Enviado
              </button>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2.5 bg-am-magenta text-white font-bold text-xs uppercase rounded-xl"
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
