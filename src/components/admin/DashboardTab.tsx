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
  Plus,
  ArrowRight,
  ShieldCheck,
  Building2,
  AlertCircle,
  Settings,
  CheckCircle2,
  Percent
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

  // Metrics
  const totalRevenue = orders.reduce((acc, curr) => acc + (curr.total || 0), 0);
  const wholesaleOrders = orders.filter((o) => (o.type || o.customerType) === "atacado");
  const retailOrders = orders.filter((o) => (o.type || o.customerType) !== "atacado");

  const wholesaleRevenue = wholesaleOrders.reduce((acc, curr) => acc + (curr.total || 0), 0);
  const retailRevenue = retailOrders.reduce((acc, curr) => acc + (curr.total || 0), 0);

  const pendingOrders = orders.filter(
    (o) => o.status === "Novo" || o.status === "Em preparação" || o.status === "novo" || o.status === "preparacao"
  );

  const wholesaleClientsCount = clients.filter(
    (c) => c.type === "atacado" || c.accountType === "atacado"
  ).length;

  const retailClientsCount = clients.filter(
    (c) => (c.type || c.accountType) === "varejo"
  ).length;

  const pendingWholesaleApprovals = clients.filter(
    (c) =>
      (c.type === "atacado" || c.accountType === "atacado") &&
      (c.wholesaleStatus === "pending" || c.wholesaleStatus === "pendente")
  ).length;

  const averageTicket = orders.length > 0 ? totalRevenue / orders.length : 0;
  const wholesaleShare = totalRevenue > 0 ? (wholesaleRevenue / totalRevenue) * 100 : 0;

  const topProducts = products.slice(0, 5);

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto animate-fadeIn text-zinc-900">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-widest text-emerald-600">
              Fábrica AM FIT &bull; Painel em Tempo Real
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight font-[family-name:var(--font-heading)]">
            Visão Geral do Negócio
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Controle integrado de faturamento, expedição de pedidos e aprovação de revendedores.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            target="_blank"
            className="px-4 py-2.5 bg-white hover:bg-zinc-50 text-zinc-800 rounded-xl text-xs font-bold flex items-center gap-2 transition-all border border-zinc-200 shadow-2xs"
          >
            <ExternalLink size={14} className="text-am-magenta" />
            <span>Ver Loja Virtual</span>
          </Link>
        </div>
      </div>

      {/* QUICK ACTIONS BAR (Atalhos rápidos) */}
      <div className="bg-white p-4 rounded-3xl border border-zinc-200/90 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-zinc-700">
          <span className="text-am-magenta">⚡</span>
          <span>Ações Rápidas:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab("produtos")}
            className="px-3.5 py-2 bg-am-magenta hover:bg-pink-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-magenta-sm"
          >
            <Plus size={14} /> Novo Produto
          </button>

          <button
            onClick={() => setActiveTab("pedidos")}
            className="px-3.5 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border border-zinc-200"
          >
            <Package size={14} className="text-amber-500" />
            <span>Expedição ({pendingOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("clientes")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
              pendingWholesaleApprovals > 0
                ? "bg-purple-50 border-purple-300 text-purple-700 animate-pulse font-extrabold"
                : "bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border-zinc-200"
            }`}
          >
            <Building2 size={14} className="text-purple-600" />
            <span>Lojistas para Avaliar ({pendingWholesaleApprovals})</span>
          </button>

          <button
            onClick={() => setActiveTab("configuracoes")}
            className="px-3.5 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border border-zinc-200"
          >
            <Settings size={14} className="text-zinc-600" />
            <span>Configurações</span>
          </button>
        </div>
      </div>

      {/* KPI METRICS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Faturamento Total */}
        <div className="bg-white border border-zinc-200/90 rounded-3xl p-5 relative overflow-hidden shadow-xs hover:border-zinc-300 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-black uppercase tracking-wider text-zinc-500">
              Faturamento Global
            </span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <DollarSign size={20} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-zinc-950">
            {totalRevenue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-zinc-500 pt-3 border-t border-zinc-100">
            <span>Ticket Médio:</span>
            <strong className="text-emerald-600 font-bold">
              {averageTicket.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </strong>
          </div>
        </div>

        {/* Card 2: Divisão Atacado vs Varejo */}
        <div className="bg-white border border-zinc-200/90 rounded-3xl p-5 relative overflow-hidden shadow-xs hover:border-zinc-300 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-zinc-500">
              Mix de Canais
            </span>
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
              <Percent size={18} />
            </div>
          </div>
          <div className="text-sm font-black text-zinc-950 flex items-center justify-between mb-1.5">
            <span className="text-purple-600">Atacado: {wholesaleShare.toFixed(0)}%</span>
            <span className="text-pink-600">Varejo: {(100 - wholesaleShare).toFixed(0)}%</span>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-zinc-100 h-2.5 rounded-full overflow-hidden flex">
            <div
              className="bg-purple-600 h-full transition-all"
              style={{ width: `${wholesaleShare}%` }}
              title="Atacado"
            />
            <div
              className="bg-am-magenta h-full transition-all"
              style={{ width: `${100 - wholesaleShare}%` }}
              title="Varejo"
            />
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-500 pt-3 border-t border-zinc-100">
            <span>Atacado B2B: <strong className="text-zinc-900">{wholesaleOrders.length} ped.</strong></span>
            <span>Varejo: <strong className="text-zinc-900">{retailOrders.length} ped.</strong></span>
          </div>
        </div>

        {/* Card 3: Expedição e Pedidos Pendentes */}
        <div className="bg-white border border-zinc-200/90 rounded-3xl p-5 relative overflow-hidden shadow-xs hover:border-zinc-300 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-black uppercase tracking-wider text-zinc-500">
              Expedição / Fábrica
            </span>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
              <Clock size={20} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-zinc-950">
            {pendingOrders.length} pedidos
          </div>
          <div className="mt-3 flex items-center justify-between text-xs pt-3 border-t border-zinc-100">
            <span className="text-zinc-500">Aguardando Envio:</span>
            <button
              onClick={() => setActiveTab("pedidos")}
              className="text-amber-600 hover:underline font-bold text-xs"
            >
              Despachar &rarr;
            </button>
          </div>
        </div>

        {/* Card 4: Clientes & Aprovações */}
        <div className="bg-white border border-zinc-200/90 rounded-3xl p-5 relative overflow-hidden shadow-xs hover:border-zinc-300 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-black uppercase tracking-wider text-zinc-500">
              Base de Clientes
            </span>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <Users size={20} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-zinc-950">
            {clients.length} cadastros
          </div>
          <div className="mt-3 flex items-center justify-between text-xs pt-3 border-t border-zinc-100">
            {pendingWholesaleApprovals > 0 ? (
              <span className="text-amber-600 font-bold flex items-center gap-1">
                <AlertCircle size={13} /> {pendingWholesaleApprovals} para aprovar
              </span>
            ) : (
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 size={13} /> Lojistas em dia
              </span>
            )}
            <button
              onClick={() => setActiveTab("clientes")}
              className="text-am-magenta hover:underline font-bold text-xs"
            >
              Ver &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Middle Section: Top Products & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Produtos Destaque */}
        <div className="bg-white border border-zinc-200/90 rounded-3xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-black text-xs text-zinc-950 flex items-center gap-2 uppercase tracking-wider">
              <Award className="text-am-magenta" size={17} /> Produtos em Destaque
            </h3>
            <button
              onClick={() => setActiveTab("produtos")}
              className="text-xs text-am-magenta hover:underline font-bold"
            >
              Ver catálogo
            </button>
          </div>

          <div className="space-y-3">
            {topProducts.map((prod, index) => {
              const retail = prod.retailPrice ?? (prod.priceRetail || 0);
              const wholesale = prod.wholesalePrice ?? (prod.priceWholesale || 0);
              const retailMargin = wholesale > 0
                ? (((retail - wholesale) / wholesale) * 100).toFixed(0)
                : "100";

              return (
                <div
                  key={prod.id}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:border-zinc-300 transition-all"
                >
                  <span className="text-xs font-black text-zinc-400 w-4 text-center">
                    #{index + 1}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-zinc-200 overflow-hidden shrink-0 relative">
                    <img
                      src={prod.images?.[0] || "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80"}
                      alt={prod.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-zinc-900 truncate">{prod.name}</p>
                    <p className="text-[10px] text-zinc-500 mt-0.5">
                      Estoque: <strong className={(prod.stock || 0) < 15 ? "text-red-600 font-bold" : "text-zinc-800"}>{prod.stock || 0} un</strong> &bull; Margem: <span className="text-emerald-600 font-bold">+{retailMargin}%</span>
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-black text-zinc-950">
                      R$ {retail.toFixed(2)}
                    </p>
                    <p className="text-[10px] text-purple-700 font-bold">
                      Atac: R$ {wholesale.toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pedidos Recentes */}
        <div className="lg:col-span-2 bg-white border border-zinc-200/90 rounded-3xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-black text-xs text-zinc-950 flex items-center gap-2 uppercase tracking-wider">
              <Package className="text-am-magenta" size={17} /> Pedidos Recentes da Loja
            </h3>
            <button
              onClick={() => setActiveTab("pedidos")}
              className="text-xs text-am-magenta hover:underline font-bold"
            >
              Gerenciar todos ({orders.length}) &rarr;
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-zinc-400 border-b border-zinc-100 uppercase tracking-wider text-[10px]">
                  <th className="pb-3 font-bold">Código</th>
                  <th className="pb-3 font-bold">Cliente</th>
                  <th className="pb-3 font-bold">Canal</th>
                  <th className="pb-3 font-bold">Status</th>
                  <th className="pb-3 font-bold text-right">Total</th>
                  <th className="pb-3 font-bold text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {orders.slice(0, 6).map((order) => {
                  const channel = order.type || order.customerType || "varejo";
                  return (
                    <tr
                      key={order.id}
                      className="hover:bg-zinc-50/70 transition-colors group"
                    >
                      <td className="py-3.5 font-mono font-bold text-zinc-900">{order.id}</td>
                      <td className="py-3.5">
                        <p className="font-bold text-zinc-900">{order.clientName || order.customerName}</p>
                        <p className="text-[11px] text-zinc-500">{order.clientEmail || order.customerEmail}</p>
                      </td>
                      <td className="py-3.5">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            channel === "atacado"
                              ? "bg-purple-100 text-purple-700 border border-purple-200"
                              : "bg-pink-100 text-pink-700 border border-pink-200"
                          }`}
                        >
                          {channel}
                        </span>
                      </td>
                      <td className="py-3.5">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            order.status === "Novo" || order.status === "novo"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "Pago" || order.status === "pago"
                              ? "bg-emerald-100 text-emerald-800"
                              : order.status === "Em preparação" || order.status === "preparacao"
                              ? "bg-amber-100 text-amber-800"
                              : order.status === "Enviado" || order.status === "enviado"
                              ? "bg-cyan-100 text-cyan-800"
                              : order.status === "Entregue" || order.status === "entregue"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right font-black text-zinc-900">
                        {order.total.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </td>
                      <td className="py-3.5 text-right">
                        <button
                          onClick={() => onSelectOrder?.(order)}
                          className="px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-[11px] font-bold rounded-lg transition-all"
                        >
                          Ver Detalhes
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
