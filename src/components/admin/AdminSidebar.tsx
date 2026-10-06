"use client";

import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  Image as ImageIcon,
  Tag,
  ExternalLink,
  LogOut,
} from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

export type AdminTab = "dashboard" | "produtos" | "pedidos" | "clientes" | "banners" | "cupons";

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const { products, orders, clients, banners, coupons, adminLogout } = useAdmin();

  const pendingOrders = orders.filter((o) => o.status === "Novo" || o.status === "Em preparação");
  const pendingWholesaleApprovals = clients.filter(
    (c) => c.type === "atacado" && c.wholesaleStatus === "pendente"
  ).length;

  return (
    <aside className="w-full md:w-64 bg-zinc-900/90 border-r border-zinc-800 flex flex-col shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-am-magenta to-pink-700 flex items-center justify-center font-black text-white text-base shadow-md">
            AM
          </div>
          <div>
            <div className="font-extrabold text-sm tracking-tight text-white leading-none">
              AM FIT
            </div>
            <div className="text-[10px] font-bold text-am-magenta tracking-widest uppercase mt-0.5">
              Painel Master
            </div>
          </div>
        </div>
        <Link
          href="/"
          target="_blank"
          title="Abrir Loja em nova aba"
          className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
        >
          <ExternalLink className="text-sm" />
        </Link>
      </div>

      {/* Navigation Items */}
      <nav className="p-3 space-y-1 flex-1">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === "dashboard"
              ? "bg-am-magenta text-white shadow-lg shadow-am-magenta/25"
              : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
          }`}
        >
          <LayoutDashboard className="text-lg" />
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => setActiveTab("produtos")}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === "produtos"
              ? "bg-am-magenta text-white shadow-lg shadow-am-magenta/25"
              : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
          }`}
        >
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-lg" />
            <span>Produtos</span>
          </div>
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              activeTab === "produtos" ? "bg-white/20 text-white" : "bg-zinc-800 text-zinc-400"
            }`}
          >
            {products.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("pedidos")}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === "pedidos"
              ? "bg-am-magenta text-white shadow-lg shadow-am-magenta/25"
              : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
          }`}
        >
          <div className="flex items-center gap-3">
            <Package className="text-lg" />
            <span>Pedidos</span>
          </div>
          {pendingOrders.length > 0 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
              {pendingOrders.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("clientes")}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === "clientes"
              ? "bg-am-magenta text-white shadow-lg shadow-am-magenta/25"
              : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
          }`}
        >
          <div className="flex items-center gap-3">
            <Users className="text-lg" />
            <span>Clientes</span>
          </div>
          {pendingWholesaleApprovals > 0 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500 text-white font-black animate-pulse">
              {pendingWholesaleApprovals} NOVO
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("banners")}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === "banners"
              ? "bg-am-magenta text-white shadow-lg shadow-am-magenta/25"
              : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
          }`}
        >
          <div className="flex items-center gap-3">
            <ImageIcon className="text-lg" />
            <span>Banners</span>
          </div>
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              activeTab === "banners" ? "bg-white/20 text-white" : "bg-zinc-800 text-zinc-400"
            }`}
          >
            {banners.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("cupons")}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === "cupons"
              ? "bg-am-magenta text-white shadow-lg shadow-am-magenta/25"
              : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
          }`}
        >
          <div className="flex items-center gap-3">
            <Tag className="text-lg" />
            <span>Cupons</span>
          </div>
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              activeTab === "cupons" ? "bg-white/20 text-white" : "bg-zinc-800 text-zinc-400"
            }`}
          >
            {coupons.length}
          </span>
        </button>
      </nav>

      {/* User Status & Logout Footer */}
      <div className="p-4 border-t border-zinc-800 bg-zinc-950/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-am-magenta font-black text-xs">
              ADM
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-none">Administrador</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">Proprietário Geral</p>
            </div>
          </div>
          <button
            onClick={adminLogout}
            title="Sair do painel administrativo"
            className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut className="text-base" />
          </button>
        </div>
      </div>
    </aside>
  );
};
