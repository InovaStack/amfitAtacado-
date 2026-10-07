"use client";

import React, { useState } from "react";
import { 
  X, 
  Search, 
  Building2, 
  ShoppingBag, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Phone, 
  Mail, 
  FileDown, 
  ExternalLink,
  ShieldCheck,
  Check,
  UserCheck
} from "lucide-react";
import { useAdmin, AdminClient } from "@/context/AdminContext";

export const ClientsTab: React.FC = () => {
  const { clients, updateClientStatus } = useAdmin();
  const [clientTypeFilter, setClientTypeFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClient, setSelectedClient] = useState<AdminClient | null>(null);

  const getClientType = (c: AdminClient) => c.type || c.accountType || "varejo";
  const getWholesaleStatus = (c: AdminClient) => {
    const st = c.wholesaleStatus;
    if (st === "approved" || st === "aprovado") return "approved";
    if (st === "rejected" || st === "rejeitado") return "rejected";
    return "pending";
  };

  const wholesaleClients = clients.filter((c) => getClientType(c) === "atacado");
  const retailClients = clients.filter((c) => getClientType(c) === "varejo");
  const pendingApprovals = wholesaleClients.filter((c) => getWholesaleStatus(c) === "pending");

  // Filter clients
  const filteredClients = clients.filter((c) => {
    const type = getClientType(c);
    const status = getWholesaleStatus(c);

    // Filter by type
    if (clientTypeFilter === "varejo" && type !== "varejo") return false;
    if (clientTypeFilter === "atacado" && type !== "atacado") return false;
    if (clientTypeFilter === "pendentes" && (type !== "atacado" || status !== "pending")) return false;
    if (clientTypeFilter === "aprovados" && (type !== "atacado" || status !== "approved")) return false;

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = c.name?.toLowerCase().includes(q);
      const matchEmail = c.email?.toLowerCase().includes(q);
      const matchDoc = (c.document || c.cnpj || c.cpf || "").replace(/\D/g, "").includes(q.replace(/\D/g, ""));
      const matchCompany = (c.companyName || c.tradeName || "").toLowerCase().includes(q);
      const matchCity = (c.city || "").toLowerCase().includes(q);
      return matchName || matchEmail || matchDoc || matchCompany || matchCity;
    }

    return true;
  });

  const exportClientsCsv = () => {
    const headers = ["ID", "Nome", "Tipo", "Status Atacado", "Documento", "Email", "Telefone", "Empresa", "Cidade", "Total Pedidos", "Total Gasto", "Data Cadastro"];
    const rows = clients.map((c) => [
      c.id,
      `"${c.name}"`,
      getClientType(c),
      getWholesaleStatus(c),
      `"${c.document || c.cnpj || c.cpf || ""}"`,
      c.email,
      `"${c.phone}"`,
      `"${c.tradeName || c.companyName || ""}"`,
      `"${c.city || ""}-${c.state || ""}"`,
      c.totalOrders,
      c.totalSpent,
      c.createdAt,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `clientes_amfit_${new Date().toISOString().slice(0, 10)}.csv`);
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
            Clientes & Lojistas ({clients.length})
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Gerencie cadastros, libere preços de atacado direto da fábrica e consulte dados fiscais.
          </p>
        </div>

        <button
          onClick={exportClientsCsv}
          className="px-4 py-2.5 bg-white hover:bg-zinc-50 text-zinc-700 hover:text-zinc-900 rounded-xl text-xs font-bold flex items-center gap-2 border border-zinc-200 transition-all shadow-xs shrink-0"
        >
          <FileDown size={15} className="text-am-magenta" />
          <span>Exportar Planilha (CSV)</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Type Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setClientTypeFilter("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              clientTypeFilter === "all"
                ? "bg-am-magenta text-white shadow-xs"
                : "bg-white text-zinc-600 hover:text-zinc-900 border border-zinc-200"
            }`}
          >
            Todos ({clients.length})
          </button>
          <button
            onClick={() => setClientTypeFilter("pendentes")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              clientTypeFilter === "pendentes"
                ? "bg-amber-500 text-zinc-950 font-black shadow-xs"
                : "bg-white text-amber-700 hover:bg-amber-50 border border-amber-200"
            }`}
          >
            <Clock size={12} />
            <span>Pendentes Análise ({pendingApprovals.length})</span>
          </button>
          <button
            onClick={() => setClientTypeFilter("atacado")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              clientTypeFilter === "atacado"
                ? "bg-purple-600 text-white shadow-xs"
                : "bg-white text-purple-700 hover:bg-purple-50 border border-purple-200"
            }`}
          >
            <Building2 size={12} />
            <span>Atacado ({wholesaleClients.length})</span>
          </button>
          <button
            onClick={() => setClientTypeFilter("varejo")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              clientTypeFilter === "varejo"
                ? "bg-pink-600 text-white shadow-xs"
                : "bg-white text-pink-700 hover:bg-pink-50 border border-pink-200"
            }`}
          >
            <ShoppingBag size={12} />
            <span>Varejo ({retailClients.length})</span>
          </button>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nome, CNPJ, e-mail..."
            className="w-full py-2 pl-9 pr-3 text-xs bg-white border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-am-magenta focus:ring-2 focus:ring-am-magenta/10 transition-all shadow-xs"
          />
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50 text-zinc-500 uppercase tracking-wider border-b border-zinc-200 text-[10px]">
              <tr>
                <th className="py-3.5 px-4 font-bold">Cliente</th>
                <th className="py-3.5 px-4 font-bold">Perfil</th>
                <th className="py-3.5 px-4 font-bold">CNPJ / Loja</th>
                <th className="py-3.5 px-4 font-bold">Contato WhatsApp</th>
                <th className="py-3.5 px-4 font-bold">Status Atacado</th>
                <th className="py-3.5 px-4 font-bold">Pedidos</th>
                <th className="py-3.5 px-4 font-bold text-right">Total</th>
                <th className="py-3.5 px-4 font-bold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredClients.map((client) => {
                const type = getClientType(client);
                const status = getWholesaleStatus(client);
                const cleanPhone = client.phone.replace(/\D/g, "");

                return (
                  <tr key={client.id} className="hover:bg-zinc-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-zinc-900 text-sm">{client.name}</p>
                      <p className="text-[11px] text-zinc-400">{client.email}</p>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          type === "atacado"
                            ? "bg-purple-50 text-purple-700 border border-purple-200"
                            : "bg-pink-50 text-pink-700 border border-pink-200"
                        }`}
                      >
                        {type}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <p className="font-mono text-zinc-700">
                        {client.cnpj || client.cpf || client.document || "Não informado"}
                      </p>
                      {(client.tradeName || client.companyName) && (
                        <p className="text-[11px] text-zinc-500 font-semibold truncate max-w-[150px]">
                          {client.tradeName || client.companyName}
                        </p>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-700">{client.phone}</span>
                        {cleanPhone && (
                          <a
                            href={`https://wa.me/55${cleanPhone}?text=${encodeURIComponent(`Olá ${client.name}, sou da equipe comercial da fábrica AM FIT!`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200"
                            title="Conversar no WhatsApp"
                          >
                            <Phone size={12} />
                          </a>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      {type === "atacado" ? (
                        <div className="flex items-center gap-1.5">
                          <select
                            value={status}
                            onChange={(e) => updateClientStatus(client.id, e.target.value as any)}
                            className={`px-2.5 py-1 rounded-xl text-xs font-black border focus:outline-none bg-white cursor-pointer shadow-xs ${
                              status === "approved"
                                ? "border-emerald-300 text-emerald-700 bg-emerald-50/50"
                                : status === "pending"
                                ? "border-amber-300 text-amber-700 bg-amber-50/50 animate-pulse"
                                : "border-red-300 text-red-700 bg-red-50/50"
                            }`}
                          >
                            <option value="pending">⏳ Em Análise</option>
                            <option value="approved">✓ Aprovado</option>
                            <option value="rejected">✕ Rejeitado</option>
                          </select>
                        </div>
                      ) : (
                        <span className="text-zinc-500 text-[11px] font-semibold">Liberado Varejo</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-zinc-700">
                      {client.totalOrders} ped.
                    </td>

                    <td className="py-3.5 px-4 text-right font-black text-zinc-900">
                      {client.totalSpent.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedClient(client)}
                        className="px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-lg text-xs font-bold transition-colors border border-zinc-200"
                      >
                        Ver Perfil
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Perfil Detalhado do Cliente */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-zinc-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-8 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200 mb-6">
              <div>
                <h3 className="text-lg font-black text-zinc-900">{selectedClient.name}</h3>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    getClientType(selectedClient) === "atacado"
                      ? "bg-purple-50 text-purple-700 border border-purple-200"
                      : "bg-pink-50 text-pink-700 border border-pink-200"
                  }`}
                >
                  Perfil {getClientType(selectedClient)}
                </span>
              </div>
              <button
                onClick={() => setSelectedClient(null)}
                className="p-2 text-zinc-400 hover:text-zinc-600 rounded-lg hover:bg-zinc-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3 text-xs mb-6">
              <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200">
                <span className="text-zinc-500 block mb-0.5">E-mail:</span>
                <span className="font-bold text-zinc-900">{selectedClient.email}</span>
              </div>
              <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200">
                <span className="text-zinc-500 block mb-0.5">WhatsApp / Telefone:</span>
                <span className="font-bold text-zinc-900">{selectedClient.phone}</span>
              </div>
              {(selectedClient.tradeName || selectedClient.companyName) && (
                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200">
                  <span className="text-zinc-500 block mb-0.5">Nome Fantasia / Razão Social:</span>
                  <span className="font-bold text-zinc-900">{selectedClient.tradeName || selectedClient.companyName}</span>
                </div>
              )}
              {(selectedClient.cnpj || selectedClient.cpf || selectedClient.document) && (
                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200">
                  <span className="text-zinc-500 block mb-0.5">Documento (CNPJ/CPF):</span>
                  <span className="font-bold font-mono text-zinc-900">
                    {selectedClient.cnpj || selectedClient.cpf || selectedClient.document}
                  </span>
                </div>
              )}
              {selectedClient.city && (
                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200">
                  <span className="text-zinc-500 block mb-0.5">Localidade:</span>
                  <span className="font-bold text-zinc-900">
                    {selectedClient.city} - {selectedClient.state}
                  </span>
                </div>
              )}
              <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 flex justify-between">
                <div>
                  <span className="text-zinc-500 block mb-0.5">Total de Pedidos:</span>
                  <span className="font-bold text-zinc-900">{selectedClient.totalOrders} pedidos</span>
                </div>
                <div className="text-right">
                  <span className="text-zinc-500 block mb-0.5">Faturamento Total:</span>
                  <span className="font-black text-am-magenta">
                    {selectedClient.totalSpent.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
              </div>
            </div>

            {getClientType(selectedClient) === "atacado" && (
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl mb-6">
                <p className="text-xs font-bold text-purple-900 mb-2">
                  Aprovação de Cadastro Lojista:
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      updateClientStatus(selectedClient.id, "approved");
                      setSelectedClient({ ...selectedClient, wholesaleStatus: "approved" });
                    }}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                      getWholesaleStatus(selectedClient) === "approved"
                        ? "bg-emerald-600 text-white font-black shadow-xs"
                        : "bg-white hover:bg-emerald-600 text-zinc-700 hover:text-white border border-zinc-200"
                    }`}
                  >
                    ✓ Aprovar Atacado
                  </button>
                  <button
                    onClick={() => {
                      updateClientStatus(selectedClient.id, "rejected");
                      setSelectedClient({ ...selectedClient, wholesaleStatus: "rejected" });
                    }}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                      getWholesaleStatus(selectedClient) === "rejected"
                        ? "bg-red-600 text-white font-black shadow-xs"
                        : "bg-white hover:bg-red-600 text-zinc-700 hover:text-white border border-zinc-200"
                    }`}
                  >
                    ✕ Rejeitar
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={() => setSelectedClient(null)}
              className="w-full py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors border border-zinc-200"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
