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
  Sparkles,
  Settings
} from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

export type AdminTab = "dashboard" | "produtos" | "pedidos" | "clientes" | "banners" | "configuracoes";

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const { products, orders, clients, banners, adminLogout } = useAdmin();

  const pendingOrders = orders.filter(
    (o) => o.status === "Novo" || o.status === "Em preparação" || o.status === "novo" || o.status === "preparacao"
  );
  const pendingWholesaleApprovals = clients.filter(
    (c) =>
      (c.type === "atacado" || c.accountType === "atacado") &&
      (c.wholesaleStatus === "pending" || c.wholesaleStatus === "pendente")
  ).length;

  return (
    <aside className="w-full md:w-64 bg-white border-r border-zinc-200/90 flex flex-col shrink-0 select-none shadow-xs">
      {/* Brand Header */}
      <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-zinc-950 flex items-center justify-center font-black text-white text-base shadow-sm border border-zinc-800">
            <span className="text-am-magenta">AM</span>
          </div>
          <div>
            <div className="font-black text-sm tracking-tight text-zinc-950 leading-none">
              AM FIT
            </div>
            <div className="text-[10px] font-black text-am-magenta tracking-widest uppercase mt-1 flex items-center gap-1">
              <span>Painel Gestão</span>
            </div>
          </div>
        </div>
        <Link
          href="/"
          target="_blank"
          title="Abrir Loja Virtual em nova aba"
          className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-colors"
        >
          <ExternalLink size={15} />
        </Link>
      </div>

      {/* Navigation Items */}
      <nav className="p-3 space-y-1 flex-1">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "dashboard"
              ? "bg-am-magenta text-white shadow-magenta-sm"
              : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100"
          }`}
        >
          <LayoutDashboard size={17} />
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => setActiveTab("produtos")}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "produtos"
              ? "bg-am-magenta text-white shadow-magenta-sm"
              : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100"
          }`}
        >
          <div className="flex items-center gap-3">
            <ShoppingBag size={17} />
            <span>Produtos</span>
          </div>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              activeTab === "produtos" ? "bg-white/20 text-white" : "bg-zinc-100 text-zinc-600"
            }`}
          >
            {products.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("pedidos")}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "pedidos"
              ? "bg-am-magenta text-white shadow-magenta-sm"
              : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100"
          }`}
        >
          <div className="flex items-center gap-3">
            <Package size={17} />
            <span>Pedidos</span>
          </div>
          {pendingOrders.length > 0 && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-extrabold border border-amber-200">
              {pendingOrders.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("clientes")}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "clientes"
              ? "bg-am-magenta text-white shadow-magenta-sm"
              : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100"
          }`}
        >
          <div className="flex items-center gap-3">
            <Users size={17} />
            <span>Clientes & Lojistas</span>
          </div>
          {pendingWholesaleApprovals > 0 && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-extrabold border border-purple-200 animate-pulse">
              {pendingWholesaleApprovals} NOVO
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("banners")}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "banners"
              ? "bg-am-magenta text-white shadow-magenta-sm"
              : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100"
          }`}
        >
          <div className="flex items-center gap-3">
            <ImageIcon size={17} />
            <span>Banners</span>
          </div>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              activeTab === "banners" ? "bg-white/20 text-white" : "bg-zinc-100 text-zinc-600"
            }`}
          >
            {banners.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("configuracoes")}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "configuracoes"
              ? "bg-am-magenta text-white shadow-magenta-sm"
              : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100"
          }`}
        >
          <div className="flex items-center gap-3">
            <Settings size={17} />
            <span>Configurações</span>
          </div>
          <span
            className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
              activeTab === "configuracoes" ? "bg-white/20 text-white" : "bg-am-magenta-light text-am-magenta"
            }`}
          >
            Fábrica
          </span>
        </button>
      </nav>

      {/* User Status & Logout Footer */}
      <div className="p-4 border-t border-zinc-100 bg-zinc-50/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-pink-100 text-am-magenta font-black text-xs flex items-center justify-center border border-pink-200 shadow-2xs">
              ADM
            </div>
            <div>
              <p className="text-xs font-black text-zinc-900 leading-none">Administrador</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">Gestão AM FIT</p>
            </div>
          </div>
          <button
            onClick={adminLogout}
            title="Sair do painel administrativo"
            className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};
