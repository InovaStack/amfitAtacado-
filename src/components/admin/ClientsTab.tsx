"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { useAdmin, AdminClient } from "@/context/AdminContext";

export const ClientsTab: React.FC = () => {
  const { clients, updateClientStatus } = useAdmin();
  const [clientTypeFilter, setClientTypeFilter] = useState("all");
  const [selectedClient, setSelectedClient] = useState<AdminClient | null>(null);

  const wholesaleClientsCount = clients.filter((c) => c.type === "atacado").length;
  const retailClientsCount = clients.filter((c) => c.type === "varejo").length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-[family-name:var(--font-heading)]">
            Clientes Varejo & Atacado ({clients.length})
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Gerencie contas, aprove cadastros de lojistas para liberar preços de atacado e consulte histórico.
          </p>
        </div>

        {/* Filter Type */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setClientTypeFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              clientTypeFilter === "all"
                ? "bg-am-magenta text-white"
                : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
            }`}
          >
            Todos ({clients.length})
          </button>
          <button
            onClick={() => setClientTypeFilter("varejo")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              clientTypeFilter === "varejo"
                ? "bg-blue-600 text-white"
                : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
            }`}
          >
            Varejo ({retailClientsCount})
          </button>
          <button
            onClick={() => setClientTypeFilter("atacado")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              clientTypeFilter === "atacado"
                ? "bg-purple-600 text-white"
                : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
            }`}
          >
            Atacado ({wholesaleClientsCount})
          </button>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950/60 text-zinc-400 uppercase tracking-wider border-b border-zinc-800">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Cliente</th>
                <th className="py-3.5 px-4 font-semibold">Tipo</th>
                <th className="py-3.5 px-4 font-semibold">Documento / Loja</th>
                <th className="py-3.5 px-4 font-semibold">Contato</th>
                <th className="py-3.5 px-4 font-semibold">Status Atacado</th>
                <th className="py-3.5 px-4 font-semibold">Pedidos</th>
                <th className="py-3.5 px-4 font-semibold text-right">Total Gasto</th>
                <th className="py-3.5 px-4 font-semibold text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {clients
                .filter((c) => (clientTypeFilter === "all" ? true : c.type === clientTypeFilter))
                .map((client) => (
                  <tr key={client.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-white text-sm">{client.name}</p>
                      <p className="text-[11px] text-zinc-500">Cadastrado em {client.createdAt}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          client.type === "atacado"
                            ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                            : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        }`}
                      >
                        {client.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-mono text-zinc-300">
                        {client.cnpj || client.cpf || "Não informado"}
                      </p>
                      {client.companyName && (
                        <p className="text-[11px] text-zinc-400 font-semibold">
                          {client.companyName}
                        </p>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="text-zinc-300">{client.email}</p>
                      <p className="text-[11px] text-zinc-500">{client.phone}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      {client.type === "atacado" ? (
                        <select
                          value={client.wholesaleStatus}
                          onChange={(e) =>
                            updateClientStatus(
                              client.id,
                              e.target.value as "aprovado" | "pendente" | "rejeitado"
                            )
                          }
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold border focus:outline-hidden bg-zinc-950 cursor-pointer ${
                            client.wholesaleStatus === "aprovado"
                              ? "border-emerald-500/40 text-emerald-400"
                              : client.wholesaleStatus === "pendente"
                              ? "border-amber-500/40 text-amber-400 animate-pulse"
                              : "border-red-500/40 text-red-400"
                          }`}
                        >
                          <option value="pendente">Pendente de Aprovação</option>
                          <option value="aprovado">Aprovado (Preço Atacado ON)</option>
                          <option value="rejeitado">Rejeitado</option>
                        </select>
                      ) : (
                        <span className="text-zinc-500 text-[11px]">Liberado Varejo</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-zinc-300">
                      {client.totalOrders} pedidos
                    </td>
                    <td className="py-3.5 px-4 text-right font-black text-white">
                      {client.totalSpent.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedClient(client)}
                        className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-bold transition-colors"
                      >
                        Ver Perfil
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Perfil do Cliente */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-6">
              <div>
                <h3 className="text-lg font-black text-white">{selectedClient.name}</h3>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    selectedClient.type === "atacado"
                      ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                      : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  }`}
                >
                  Perfil {selectedClient.type}
                </span>
              </div>
              <button
                onClick={() => setSelectedClient(null)}
                className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3 text-xs mb-6">
              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                <span className="text-zinc-500 block mb-0.5">E-mail:</span>
                <span className="font-bold text-white">{selectedClient.email}</span>
              </div>
              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                <span className="text-zinc-500 block mb-0.5">WhatsApp / Telefone:</span>
                <span className="font-bold text-white">{selectedClient.phone}</span>
              </div>
              {selectedClient.companyName && (
                <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                  <span className="text-zinc-500 block mb-0.5">Razão Social / Nome Fantasia:</span>
                  <span className="font-bold text-white">{selectedClient.companyName}</span>
                </div>
              )}
              {(selectedClient.cnpj || selectedClient.cpf) && (
                <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                  <span className="text-zinc-500 block mb-0.5">Documento (CNPJ/CPF):</span>
                  <span className="font-bold font-mono text-white">
                    {selectedClient.cnpj || selectedClient.cpf}
                  </span>
                </div>
              )}
              {selectedClient.city && (
                <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                  <span className="text-zinc-500 block mb-0.5">Localidade:</span>
                  <span className="font-bold text-white">
                    {selectedClient.city} - {selectedClient.state}
                  </span>
                </div>
              )}
              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 flex justify-between">
                <div>
                  <span className="text-zinc-500 block mb-0.5">Total de Pedidos:</span>
                  <span className="font-bold text-white">{selectedClient.totalOrders} pedidos</span>
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

            {selectedClient.type === "atacado" && (
              <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl mb-6">
                <p className="text-xs font-bold text-purple-300 mb-2">
                  Aprovação de Conta Lojista:
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      updateClientStatus(selectedClient.id, "aprovado");
                      setSelectedClient({ ...selectedClient, wholesaleStatus: "aprovado" });
                    }}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg ${
                      selectedClient.wholesaleStatus === "aprovado"
                        ? "bg-emerald-500 text-white"
                        : "bg-zinc-800 hover:bg-emerald-600 text-zinc-300 hover:text-white"
                    }`}
                  >
                    ✓ Aprovar Atacado
                  </button>
                  <button
                    onClick={() => {
                      updateClientStatus(selectedClient.id, "rejeitado");
                      setSelectedClient({ ...selectedClient, wholesaleStatus: "rejeitado" });
                    }}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg ${
                      selectedClient.wholesaleStatus === "rejeitado"
                        ? "bg-red-500 text-white"
                        : "bg-zinc-800 hover:bg-red-600 text-zinc-300 hover:text-white"
                    }`}
                  >
                    ✕ Rejeitar
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={() => setSelectedClient(null)}
              className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
