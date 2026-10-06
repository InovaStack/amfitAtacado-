"use client";

import React from "react";
import Link from "next/link";
import {
  DollarSign,
  TrendingUp,
  ShoppingBag,
  Clock,
  Users,
  Award,
  Package,
  ExternalLink,
} from "lucide-react";
import { useAdmin, AdminOrder } from "@/context/AdminContext";
import { AdminTab } from "./AdminSidebar";

interface DashboardTabProps {
  setActiveTab: (tab: AdminTab) => void;
  onSelectOrder?: (order: AdminOrder) => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  setActiveTab,
  onSelectOrder,
}) => {
  const { products, orders, clients } = useAdmin();

  const totalRevenue = orders.reduce((acc, curr) => acc + curr.total, 0);
  const pendingOrders = orders.filter((o) => o.status === "Novo" || o.status === "Em preparação");
  const wholesaleClientsCount = clients.filter((c) => c.type === "atacado").length;
  const retailClientsCount = clients.filter((c) => c.type === "varejo").length;
  const topProducts = products.slice(0, 4);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-[family-name:var(--font-heading)]">
            Visão Geral do Negócio
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Acompanhe em tempo real o faturamento, pedidos e clientes da fábrica AM FIT.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Loja Virtual Online
          </span>
          <Link
            href="/"
            target="_blank"
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border border-zinc-700"
          >
            <ExternalLink size={14} /> Ver Loja
          </Link>
        </div>
      </div>

      {/* KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Faturamento Total */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 relative overflow-hidden shadow-sm hover:border-zinc-700 transition-all">
          <div className="flex items-center justify-between text-zinc-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Faturamento Total</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-lg">
              <DollarSign size={20} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {totalRevenue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
            <TrendingUp size={14} /> +18.4% este mês
          </div>
        </div>

        {/* Card 2: Vendas do Mês */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 relative overflow-hidden shadow-sm hover:border-zinc-700 transition-all">
          <div className="flex items-center justify-between text-zinc-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Vendas do Mês</span>
            <div className="w-9 h-9 rounded-xl bg-am-magenta/10 text-am-magenta flex items-center justify-center text-lg">
              <ShoppingBag size={20} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">{orders.length} pedidos</div>
          <div className="mt-2 text-xs text-zinc-400">
            Hoje: <strong className="text-white">R$ 1.840,00</strong> (3 vendas)
          </div>
        </div>

        {/* Card 3: Pedidos Pendentes */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 relative overflow-hidden shadow-sm hover:border-zinc-700 transition-all">
          <div className="flex items-center justify-between text-zinc-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Pedidos a Despachar</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-lg">
              <Clock size={20} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {pendingOrders.length} aguardando
          </div>
          <div className="mt-2 text-xs text-amber-400 font-semibold">
            Requer atenção para expedição
          </div>
        </div>

        {/* Card 4: Clientes */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 relative overflow-hidden shadow-sm hover:border-zinc-700 transition-all">
          <div className="flex items-center justify-between text-zinc-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Base de Clientes</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center text-lg">
              <Users size={20} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">{clients.length} cadastrados</div>
          <div className="mt-2 text-xs text-zinc-400 flex gap-2">
            <span>
              Atacado: <strong className="text-blue-400">{wholesaleClientsCount}</strong>
            </span>
            <span>•</span>
            <span>
              Varejo: <strong className="text-purple-400">{retailClientsCount}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Middle Section: Top Products & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Produtos Mais Vendidos */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-extrabold text-base text-white flex items-center gap-2">
              <Award className="text-am-magenta" size={18} /> Produtos Mais Vendidos
            </h3>
            <button
              onClick={() => setActiveTab("produtos")}
              className="text-xs text-am-magenta hover:underline font-bold"
            >
              Ver catálogo
            </button>
          </div>
          <div className="space-y-4">
            {topProducts.map((prod, index) => (
              <div
                key={prod.id}
                className="flex items-center gap-3.5 p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80"
              >
                <span className="text-xs font-black text-zinc-500 w-4 text-center">
                  #{index + 1}
                </span>
                <img
                  src={prod.images[0]}
                  alt={prod.name}
                  className="w-12 h-12 rounded-lg object-cover bg-zinc-800 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate">{prod.name}</p>
                  <p className="text-[11px] text-zinc-400">
                    {prod.category} • Estoque: {prod.stock}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-black text-white">
                    {prod.priceRetail.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                  <p className="text-[10px] text-emerald-400 font-bold">
                    Atacado: {prod.priceWholesale.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pedidos Recentes */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-extrabold text-base text-white flex items-center gap-2">
              <Package className="text-am-magenta" size={18} /> Pedidos Recentes da Loja
            </h3>
            <button
              onClick={() => setActiveTab("pedidos")}
              className="text-xs text-am-magenta hover:underline font-bold"
            >
              Gerenciar todos ({orders.length})
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-zinc-500 border-b border-zinc-800 uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Pedido</th>
                  <th className="pb-3 font-semibold">Cliente</th>
                  <th className="pb-3 font-semibold">Tipo</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {orders.slice(0, 5).map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-zinc-800/40 cursor-pointer transition-colors"
                    onClick={() => onSelectOrder?.(order)}
                  >
                    <td className="py-3.5 font-mono font-bold text-white">{order.id}</td>
                    <td className="py-3.5">
                      <p className="font-semibold text-white">{order.clientName}</p>
                      <p className="text-[11px] text-zinc-500">{order.clientEmail}</p>
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          order.type === "atacado"
                            ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                            : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        }`}
                      >
                        {order.type}
                      </span>
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          order.status === "Novo"
                            ? "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                            : order.status === "Pago"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                            : order.status === "Em preparação"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                            : order.status === "Enviado"
                            ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                            : order.status === "Entregue"
                            ? "bg-green-500/10 text-green-400 border border-green-500/30"
                            : "bg-red-500/10 text-red-400 border border-red-500/30"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right font-black text-white">
                      {order.total.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
