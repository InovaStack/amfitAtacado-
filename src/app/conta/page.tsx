"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  User, 
  Building2, 
  Package, 
  MapPin, 
  FileText, 
  Settings, 
  LogOut, 
  Truck, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ShoppingBag, 
  Plus, 
  Trash2, 
  ExternalLink, 
  ChevronRight, 
  ArrowLeft,
  ShieldCheck,
  Percent,
  Sparkles,
  Phone,
  Mail,
  Copy,
  Check,
  Send,
  X
} from "lucide-react";
import { useAuth, Address, Order } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function AccountPage() {
  const { 
    user, 
    isAuthenticated, 
    isWholesaleApproved, 
    isWholesalePending,
    accountType, 
    logout, 
    loginAsDemo, 
    openAuthModal, 
    addAddress, 
    removeAddress, 
    setDefaultAddress, 
    approveCurrentWholesaleUser,
    requireWholesaleApproval,
    setRequireWholesaleApproval
  } = useAuth();

  const { addToCart } = useCart();

  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "addresses" | "quotes" | "settings">("overview");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [copiedTracking, setCopiedTracking] = useState<string | null>(null);

  // New address form state
  const [newAddrLabel, setNewAddrLabel] = useState("");
  const [newAddrRecipient, setNewAddrRecipient] = useState("");
  const [newAddrZip, setNewAddrZip] = useState("");
  const [newAddrStreet, setNewAddrStreet] = useState("");
  const [newAddrNumber, setNewAddrNumber] = useState("");
  const [newAddrComplement, setNewAddrComplement] = useState("");
  const [newAddrNeighborhood, setNewAddrNeighborhood] = useState("");
  const [newAddrCity, setNewAddrCity] = useState("");
  const [newAddrState, setNewAddrState] = useState("SP");

  const handleCopyTracking = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedTracking(code);
    setTimeout(() => setCopiedTracking(null), 2000);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrStreet || !newAddrNumber || !newAddrCity) return;
    addAddress({
      label: newAddrLabel || "Novo Endereço",
      recipientName: newAddrRecipient || (user ? user.name : "Destinatário"),
      street: newAddrStreet,
      number: newAddrNumber,
      complement: newAddrComplement,
      neighborhood: newAddrNeighborhood,
      city: newAddrCity,
      state: newAddrState,
      zipCode: newAddrZip,
      isDefault: false,
    });
    setIsAddAddressOpen(false);
    // reset
    setNewAddrLabel("");
    setNewAddrStreet("");
    setNewAddrNumber("");
    setNewAddrComplement("");
    setNewAddrNeighborhood("");
    setNewAddrCity("");
    setNewAddrZip("");
  };

  // Se não estiver logado, exibe tela de login / escolha de perfil
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-zinc-50 flex flex-col justify-between">
        <Navbar />
        <main className="w-full max-w-4xl mx-auto px-4 py-16">
          <div className="bg-white rounded-3xl border border-zinc-200 shadow-xl p-8 sm:p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-pink-50 text-am-magenta flex items-center justify-center mx-auto mb-4 border border-am-magenta/20">
              <User size={32} />
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight uppercase">
              Área do Cliente AM FIT
            </h1>
            <p className="text-sm text-zinc-500 max-w-md mx-auto mt-2">
              Faça login ou crie sua conta para acessar seu histórico de pedidos, rastreamento de entregas, endereços e condições exclusivas de compra.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
              <button
                onClick={() => openAuthModal("varejo", "login")}
                className="w-full sm:w-auto px-8 py-3 bg-am-black hover:bg-am-magenta text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md"
              >
                Acessar Minha Conta
              </button>
              <button
                onClick={() => openAuthModal("atacado", "register")}
                className="w-full sm:w-auto px-8 py-3 bg-am-magenta hover:bg-am-magenta-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-magenta-sm"
              >
                Criar Conta de Atacado / Lojista
              </button>
            </div>

            {/* Quick Demo Access Box */}
            <div className="mt-12 pt-8 border-t border-zinc-100">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest block mb-4">
                Teste Imediato com Contas de Demonstração
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
                <button
                  onClick={() => loginAsDemo("varejo")}
                  className="p-4 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-2xl text-left transition-all hover:border-am-magenta group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-extrabold text-zinc-900">Cliente Varejo</span>
                    <ShoppingBag size={14} className="text-am-magenta" />
                  </div>
                  <p className="text-[11px] text-zinc-500">Camila Oliveira</p>
                  <span className="text-[10px] text-am-magenta font-semibold mt-2 block">
                    Ver pedidos e rastreio →
                  </span>
                </button>

                <button
                  onClick={() => loginAsDemo("atacado_aprovado")}
                  className="p-4 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-2xl text-left transition-all hover:border-am-magenta group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-extrabold text-zinc-900">Atacado Aprovado</span>
                    <Building2 size={14} className="text-emerald-600" />
                  </div>
                  <p className="text-[11px] text-zinc-500">Fit Store Boutique Ltda</p>
                  <span className="text-[10px] text-emerald-600 font-semibold mt-2 block">
                    Ver orçamentos e grade →
                  </span>
                </button>

                <button
                  onClick={() => loginAsDemo("atacado_pendente")}
                  className="p-4 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-2xl text-left transition-all hover:border-am-magenta group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-extrabold text-zinc-900">Atacado em Análise</span>
                    <Clock size={14} className="text-amber-500" />
                  </div>
                  <p className="text-[11px] text-zinc-500">Mariana Fitness Online</p>
                  <span className="text-[10px] text-amber-600 font-semibold mt-2 block">
                    Ver fluxo de aprovação →
                  </span>
                </button>
              </div>
            </div>

          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col justify-between">
      <Navbar />

      <main className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-8 flex-1">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
          <Link href="/" className="hover:text-am-magenta transition-colors">Início</Link>
          <ChevronRight size={14} className="text-zinc-300" />
          <span className="text-zinc-900 font-bold">Minha Conta</span>
        </div>

        {/* User Profile Header Card */}
        <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm p-6 sm:p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Identity & Badges */}
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-zinc-900 to-zinc-800 text-white flex items-center justify-center font-black text-xl sm:text-2xl shadow-md border-2 border-zinc-700/50">
                {user.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>

              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-black text-zinc-950">
                    {user.companyName || user.name}
                  </h1>

                  {/* Profile Badge */}
                  {user.accountType === "varejo" ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-pink-50 text-am-magenta border border-am-magenta/30">
                      <ShoppingBag size={12} />
                      Cliente Varejo
                    </span>
                  ) : isWholesaleApproved ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-300">
                      <CheckCircle2 size={12} className="text-emerald-600" />
                      Lojista Atacado Aprovado
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-50 text-amber-700 border border-amber-300">
                      <Clock size={12} className="text-amber-600 animate-pulse" />
                      Atacado em Análise Cadastral
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs text-zinc-500 mt-1.5 flex-wrap">
                  {user.tradeName && <span className="text-zinc-700 font-medium">Nome Fantasia: <strong>{user.tradeName}</strong></span>}
                  <span>Doc: <strong>{user.document}</strong></span>
                  <span>E-mail: <strong>{user.email}</strong></span>
                  <span>WhatsApp: <strong>{user.phone}</strong></span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2.5 self-start lg:self-center">
              {user.accountType === "atacado" && isWholesalePending && (
                <button
                  type="button"
                  onClick={approveCurrentWholesaleUser}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                  title="Simula a aprovação imediata do cadastro pela equipe comercial da fábrica"
                >
                  <CheckCircle2 size={14} />
                  <span>Aprovar Cadastro (Demo)</span>
                </button>
              )}

              <button
                type="button"
                onClick={logout}
                className="px-4 py-2 border border-zinc-200 hover:border-red-300 hover:bg-red-50 text-zinc-700 hover:text-red-600 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <LogOut size={14} />
                <span>Sair</span>
              </button>
            </div>

          </div>

          {/* Wholesale Status Warning Banner (If Pending) */}
          {user.accountType === "atacado" && isWholesalePending && (
            <div className="mt-6 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-amber-800 text-xs">
              <div className="flex items-start gap-2.5">
                <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Cadastro de Atacado em Análise Cadastral</strong>
                  <p className="text-amber-700 mt-0.5">
                    Nossa equipe comercial da fábrica está validando seus dados. Enquanto isso, você pode montar seu carrinho ou clicar em &ldquo;Aprovar Cadastro (Demo)&rdquo; acima para testar a experiência completa.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dashboard Layout: Left Tabs + Right Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Navigation Sidebar */}
          <aside className="lg:col-span-3 bg-white rounded-3xl border border-zinc-200 p-3 shadow-xs space-y-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full px-4 py-3 rounded-2xl font-bold text-xs flex items-center gap-3 transition-all ${
                activeTab === "overview"
                  ? "bg-am-black text-white shadow-sm"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
              }`}
            >
              <User size={16} />
              <span>Visão Geral</span>
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full px-4 py-3 rounded-2xl font-bold text-xs flex items-center justify-between transition-all ${
                activeTab === "orders"
                  ? "bg-am-black text-white shadow-sm"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
              }`}
            >
              <div className="flex items-center gap-3">
                <Package size={16} />
                <span>Meus Pedidos & Rastreio</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                activeTab === "orders" ? "bg-am-magenta text-white" : "bg-zinc-200 text-zinc-700"
              }`}>
                {user.orders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("addresses")}
              className={`w-full px-4 py-3 rounded-2xl font-bold text-xs flex items-center justify-between transition-all ${
                activeTab === "addresses"
                  ? "bg-am-black text-white shadow-sm"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
              }`}
            >
              <div className="flex items-center gap-3">
                <MapPin size={16} />
                <span>Endereços de Entrega</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                activeTab === "addresses" ? "bg-am-magenta text-white" : "bg-zinc-200 text-zinc-700"
              }`}>
                {user.addresses.length}
              </span>
            </button>

            {user.accountType === "atacado" && (
              <button
                onClick={() => setActiveTab("quotes")}
                className={`w-full px-4 py-3 rounded-2xl font-bold text-xs flex items-center justify-between transition-all ${
                  activeTab === "quotes"
                    ? "bg-am-black text-white shadow-sm"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
                }`}
              >
                <div className="flex items-center gap-3">
                  <FileText size={16} />
                  <span>Cotações & Orçamentos</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                  activeTab === "quotes" ? "bg-am-magenta text-white" : "bg-zinc-200 text-zinc-700"
                }`}>
                  {user.quotes?.length || 0}
                </span>
              </button>
            )}

            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full px-4 py-3 rounded-2xl font-bold text-xs flex items-center gap-3 transition-all ${
                activeTab === "settings"
                  ? "bg-am-black text-white shadow-sm"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
              }`}
            >
              <Settings size={16} />
              <span>Regras de Atacado & Loja</span>
            </button>
          </aside>

          {/* Tab Content Area */}
          <section className="lg:col-span-9 space-y-6">

            {/* TAB 1: OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-5 rounded-3xl border border-zinc-200 shadow-xs">
                    <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                      Total de Pedidos
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-zinc-950">{user.orders.length}</span>
                      <span className="text-xs text-zinc-500">pedidos realizados</span>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-3xl border border-zinc-200 shadow-xs">
                    <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                      {user.accountType === "atacado" ? "Investimento Total" : "Total Comprado"}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-black text-zinc-950">
                        R$ {user.orders.reduce((acc, o) => acc + o.total, 0).toFixed(2).replace(".", ",")}
                      </span>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-3xl border border-zinc-200 shadow-xs">
                    <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                      {user.accountType === "atacado" ? "Margem de Lucro Estimada" : "Perfil de Benefício"}
                    </span>
                    <div className="flex items-baseline gap-2">
                      {user.accountType === "atacado" ? (
                        <span className="text-2xl sm:text-3xl font-black text-emerald-600">
                          Até 120%
                        </span>
                      ) : (
                        <span className="text-xl font-black text-am-magenta">
                          Frete e Parcelamento 6x
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Wholesale Special Perks Card */}
                {user.accountType === "atacado" && (
                  <div className="bg-gradient-to-r from-zinc-950 to-zinc-900 text-white p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-am-magenta/10 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                      <div className="space-y-2 max-w-xl">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-am-magenta/20 border border-am-magenta/40 text-am-magenta text-xs font-black uppercase tracking-wider">
                          <Percent size={13} />
                          Condições Especiais de Fábrica
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black tracking-tight uppercase">
                          Sua Grade no Preço de Atacado está {isWholesaleApproved ? "Liberada" : "Em Análise"}
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-300">
                          {isWholesaleApproved
                            ? "Aproveite preços de confecção direto da fábrica, faturamento para lojistas e suporte dedicado para reposição semanal de vitrine."
                            : "Seu cadastro está aguardando liberação para ter acesso aos preços especiais de confecção."}
                        </p>
                      </div>

                      <div className="flex flex-col gap-2 shrink-0">
                        <Link
                          href="/catalogo"
                          className="px-6 py-3 bg-am-magenta hover:bg-am-magenta-hover text-white rounded-xl text-xs font-bold uppercase tracking-wider text-center transition-all shadow-magenta-sm"
                        >
                          Ver Catálogo de Atacado
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* Recent Orders Overview */}
                <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-base text-zinc-900">Últimos Pedidos</h3>
                    <button
                      onClick={() => setActiveTab("orders")}
                      className="text-xs font-bold text-am-magenta hover:underline"
                    >
                      Ver todos ({user.orders.length}) →
                    </button>
                  </div>

                  {user.orders.length === 0 ? (
                    <div className="text-center py-12 text-zinc-400">
                      <Package size={36} className="mx-auto mb-2 text-zinc-300" />
                      <p className="text-xs">Você ainda não realizou pedidos.</p>
                      <Link
                        href="/catalogo"
                        className="inline-block mt-3 px-5 py-2 bg-am-black text-white text-xs font-bold rounded-xl hover:bg-am-magenta transition-colors"
                      >
                        Começar a Comprar
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {user.orders.slice(0, 2).map((order) => (
                        <div
                          key={order.id}
                          className="p-4 rounded-2xl border border-zinc-200 hover:border-am-magenta transition-all bg-zinc-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-mono font-bold text-xs text-zinc-900">#{order.orderNumber}</span>
                              <span className="text-[10px] text-zinc-400">• {order.date}</span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                                order.status === "entregue"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : order.status === "enviado"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}>
                                {order.statusLabel}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-600">
                              {order.items.length} produto(s) • Total: <strong>R$ {order.total.toFixed(2).replace(".", ",")}</strong>
                            </p>
                          </div>

                          <button
                            onClick={() => {
                              setSelectedOrder(order);
                              setActiveTab("orders");
                            }}
                            className="px-4 py-2 bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-800 text-xs font-bold rounded-xl transition-colors self-start sm:self-auto"
                          >
                            Detalhes & Rastreio
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: ORDERS & TRACKING */}
            {activeTab === "orders" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-black text-zinc-950 uppercase tracking-tight">Meus Pedidos</h2>
                    <p className="text-xs text-zinc-500">Acompanhe o status e rastreamento em tempo real de suas encomendas.</p>
                  </div>
                </div>

                {user.orders.length === 0 ? (
                  <div className="bg-white rounded-3xl border border-zinc-200 p-12 text-center text-zinc-400">
                    <Package size={40} className="mx-auto mb-2 text-zinc-300" />
                    <p className="text-sm font-medium text-zinc-600">Nenhum pedido registrado nesta conta.</p>
                    <Link
                      href="/catalogo"
                      className="inline-block mt-4 px-6 py-2.5 bg-am-magenta text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-am-magenta-hover transition-colors shadow-magenta-sm"
                    >
                      Ir para o Catálogo
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {user.orders.map((order) => {
                      const isExpanded = selectedOrder?.id === order.id;

                      // Status step progression (1 to 5)
                      const stepMap: Record<string, number> = {
                        realizado: 1,
                        confirmado: 2,
                        separacao: 3,
                        enviado: 4,
                        entregue: 5,
                      };
                      const currentStep = stepMap[order.status] || 2;

                      return (
                        <div
                          key={order.id}
                          className="bg-white rounded-3xl border border-zinc-200 shadow-xs overflow-hidden transition-all"
                        >
                          {/* Order Card Header */}
                          <div className="p-5 sm:p-6 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-50/40">
                            <div>
                              <div className="flex items-center gap-2.5 flex-wrap">
                                <span className="font-mono font-black text-sm text-zinc-950">
                                  Pedido #{order.orderNumber}
                                </span>
                                <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                                  order.mode === "atacado" ? "bg-am-magenta text-white" : "bg-zinc-200 text-zinc-800"
                                }`}>
                                  {order.mode === "atacado" ? "Atacado" : "Varejo"}
                                </span>
                                <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                                  order.status === "entregue"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : order.status === "enviado"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-amber-100 text-amber-800"
                                }`}>
                                  {order.statusLabel}
                                </span>
                              </div>
                              <span className="text-xs text-zinc-500 mt-1 block">
                                Realizado em {order.date} • Pagamento via {order.paymentMethod.toUpperCase()}
                              </span>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="text-lg font-black text-zinc-950">
                                R$ {order.total.toFixed(2).replace(".", ",")}
                              </span>
                              <button
                                onClick={() => setSelectedOrder(isExpanded ? null : order)}
                                className="px-3.5 py-1.5 bg-white border border-zinc-200 hover:border-am-magenta rounded-xl text-xs font-bold text-zinc-800 transition-colors"
                              >
                                {isExpanded ? "Ocultar Detalhes" : "Ver Rastreio & Itens"}
                              </button>
                            </div>
                          </div>

                          {/* Order Tracking Timeline Bar */}
                          <div className="p-5 sm:p-6 border-b border-zinc-100 bg-white">
                            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-4">
                              Status de Acompanhamento
                            </span>

                            <div className="grid grid-cols-5 gap-2 relative">
                              {/* Background Bar */}
                              <div className="absolute top-4 left-4 right-4 h-1 bg-zinc-100 z-0" />
                              
                              {[
                                { step: 1, label: "Pedido Feito" },
                                { step: 2, label: "Pagamento OK" },
                                { step: 3, label: "Separação" },
                                { step: 4, label: "Enviado" },
                                { step: 5, label: "Entregue" },
                              ].map((s) => {
                                const isPassed = currentStep >= s.step;
                                const isCurrent = currentStep === s.step;

                                return (
                                  <div key={s.step} className="flex flex-col items-center text-center relative z-10">
                                    <div
                                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                                        isPassed
                                          ? "bg-am-magenta text-white shadow-magenta-sm"
                                          : "bg-zinc-100 text-zinc-400"
                                      } ${isCurrent ? "ring-4 ring-pink-100" : ""}`}
                                    >
                                      {isPassed ? <Check size={14} /> : s.step}
                                    </div>
                                    <span className={`text-[10px] mt-2 font-bold ${
                                      isPassed ? "text-zinc-900" : "text-zinc-400"
                                    }`}>
                                      {s.label}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Tracking Code Box if available */}
                            {order.trackingCode && (
                              <div className="mt-5 p-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                                <div className="flex items-center gap-2">
                                  <Truck size={16} className="text-am-magenta" />
                                  <span className="text-zinc-600">
                                    Transportadora: <strong>{order.trackingCompany || "Transportadora Conveniada"}</strong>
                                  </span>
                                  <span className="text-zinc-400">•</span>
                                  <span className="font-mono font-bold text-zinc-900 bg-white px-2 py-0.5 rounded border border-zinc-200">
                                    {order.trackingCode}
                                  </span>
                                </div>

                                <button
                                  onClick={() => handleCopyTracking(order.trackingCode!)}
                                  className="px-3 py-1 bg-white hover:bg-zinc-100 border border-zinc-200 rounded-lg text-xs font-semibold text-zinc-700 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
                                >
                                  {copiedTracking === order.trackingCode ? (
                                    <>
                                      <Check size={12} className="text-emerald-600" />
                                      <span className="text-emerald-600">Código Copiado!</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy size={12} />
                                      <span>Copiar Código</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Expanded Items & Address Info */}
                          {isExpanded && (
                            <div className="p-5 sm:p-6 bg-zinc-50/30 space-y-4">
                              <h4 className="font-bold text-xs text-zinc-900 uppercase tracking-wider">
                                Itens do Pedido ({order.items.length})
                              </h4>

                              <div className="space-y-2">
                                {order.items.map((item, idx) => (
                                  <div
                                    key={idx}
                                    className="p-3 bg-white rounded-2xl border border-zinc-200 flex items-center justify-between gap-4"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="relative w-12 h-14 bg-zinc-100 rounded-xl overflow-hidden shrink-0">
                                        <Image
                                          src={item.image}
                                          alt={item.productName}
                                          fill
                                          className="object-cover"
                                        />
                                      </div>
                                      <div>
                                        <h5 className="font-bold text-xs text-zinc-900 leading-snug">{item.productName}</h5>
                                        <span className="text-[10px] text-zinc-400 font-mono">{item.sku}</span>
                                        <div className="text-[11px] text-zinc-500 mt-0.5">
                                          Tamanho: <strong>{item.size}</strong> • Cor: <strong>{item.color}</strong> • Qtd: <strong>{item.quantity} un</strong>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="text-right">
                                      <span className="font-black text-xs text-zinc-950">
                                        R$ {item.totalPrice.toFixed(2).replace(".", ",")}
                                      </span>
                                      <span className="text-[10px] text-zinc-400 block">
                                        R$ {item.unitPrice.toFixed(2).replace(".", ",")} cada
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border-t border-zinc-200">
                                <div className="text-zinc-600">
                                  <span>Endereço de entrega: </span>
                                  <strong>{order.address.street}, {order.address.number} - {order.address.city}/{order.address.state}</strong>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => {
                                    order.items.forEach((item) => {
                                      // find mock product or add
                                    });
                                    alert("Itens adicionados ao seu carrinho atual!");
                                  }}
                                  className="px-4 py-2 bg-am-black hover:bg-am-magenta text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all self-start sm:self-auto"
                                >
                                  Repetir Pedido
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: ADDRESSES */}
            {activeTab === "addresses" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-black text-zinc-950 uppercase tracking-tight">Meus Endereços</h2>
                    <p className="text-xs text-zinc-500">Gerencie seus locais de entrega para compras rápidas.</p>
                  </div>

                  <button
                    onClick={() => setIsAddAddressOpen(true)}
                    className="px-4 py-2 bg-am-magenta hover:bg-am-magenta-hover text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-magenta-sm flex items-center gap-1.5"
                  >
                    <Plus size={14} />
                    <span>Adicionar Endereço</span>
                  </button>
                </div>

                {/* Add Address Form Modal / Box */}
                {isAddAddressOpen && (
                  <form onSubmit={handleSaveAddress} className="bg-white p-6 rounded-3xl border-2 border-am-magenta shadow-md space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-extrabold text-sm text-zinc-900">Novo Endereço de Entrega</h4>
                      <button
                        type="button"
                        onClick={() => setIsAddAddressOpen(false)}
                        className="text-zinc-400 hover:text-zinc-700"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-600 mb-1">Identificação</label>
                        <input
                          type="text"
                          value={newAddrLabel}
                          onChange={(e) => setNewAddrLabel(e.target.value)}
                          placeholder="Ex: Minha Loja, Casa"
                          className="w-full py-2 px-3 text-xs bg-zinc-50 border border-zinc-300 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-600 mb-1">Nome do Recebedor</label>
                        <input
                          type="text"
                          value={newAddrRecipient}
                          onChange={(e) => setNewAddrRecipient(e.target.value)}
                          placeholder="Nome da pessoa ou loja"
                          className="w-full py-2 px-3 text-xs bg-zinc-50 border border-zinc-300 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-600 mb-1">CEP</label>
                        <input
                          type="text"
                          value={newAddrZip}
                          onChange={(e) => setNewAddrZip(e.target.value)}
                          placeholder="00000-000"
                          className="w-full py-2 px-3 text-xs bg-zinc-50 border border-zinc-300 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div className="sm:col-span-3">
                        <label className="block text-[11px] font-bold text-zinc-600 mb-1">Logradouro / Rua *</label>
                        <input
                          type="text"
                          value={newAddrStreet}
                          onChange={(e) => setNewAddrStreet(e.target.value)}
                          placeholder="Rua, Avenida..."
                          className="w-full py-2 px-3 text-xs bg-zinc-50 border border-zinc-300 rounded-xl"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-600 mb-1">Número *</label>
                        <input
                          type="text"
                          value={newAddrNumber}
                          onChange={(e) => setNewAddrNumber(e.target.value)}
                          placeholder="123"
                          className="w-full py-2 px-3 text-xs bg-zinc-50 border border-zinc-300 rounded-xl"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-600 mb-1">Bairro</label>
                        <input
                          type="text"
                          value={newAddrNeighborhood}
                          onChange={(e) => setNewAddrNeighborhood(e.target.value)}
                          placeholder="Bairro"
                          className="w-full py-2 px-3 text-xs bg-zinc-50 border border-zinc-300 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-600 mb-1">Cidade *</label>
                        <input
                          type="text"
                          value={newAddrCity}
                          onChange={(e) => setNewAddrCity(e.target.value)}
                          placeholder="Cidade"
                          className="w-full py-2 px-3 text-xs bg-zinc-50 border border-zinc-300 rounded-xl"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-600 mb-1">Estado (UF)</label>
                        <input
                          type="text"
                          value={newAddrState}
                          onChange={(e) => setNewAddrState(e.target.value)}
                          placeholder="SP"
                          className="w-full py-2 px-3 text-xs bg-zinc-50 border border-zinc-300 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddAddressOpen(false)}
                        className="px-4 py-2 bg-zinc-100 text-zinc-700 text-xs font-bold rounded-xl"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-am-magenta hover:bg-am-magenta-hover text-white text-xs font-bold rounded-xl shadow-magenta-sm"
                      >
                        Salvar Endereço
                      </button>
                    </div>
                  </form>
                )}

                {/* Addresses Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className={`p-5 rounded-3xl border bg-white shadow-xs relative flex flex-col justify-between ${
                        addr.isDefault ? "border-am-magenta ring-2 ring-pink-100" : "border-zinc-200"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-extrabold text-xs text-zinc-900 flex items-center gap-1.5">
                            <MapPin size={14} className="text-am-magenta" />
                            {addr.label}
                          </span>
                          {addr.isDefault && (
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-am-magenta text-white uppercase">
                              Principal
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-zinc-700 leading-relaxed">
                          <strong>{addr.recipientName}</strong><br />
                          {addr.street}, nº {addr.number} {addr.complement && `(${addr.complement})`}<br />
                          {addr.neighborhood} - {addr.city}/{addr.state}<br />
                          CEP: {addr.zipCode}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-zinc-100 flex items-center justify-between text-xs">
                        {!addr.isDefault && (
                          <button
                            type="button"
                            onClick={() => setDefaultAddress(addr.id)}
                            className="font-bold text-am-magenta hover:underline"
                          >
                            Tornar Principal
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => removeAddress(addr.id)}
                          className="text-zinc-400 hover:text-red-600 transition-colors ml-auto p-1"
                          title="Excluir endereço"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: QUOTES & REQUESTS (WHOLESALE EXCLUSIVE) */}
            {activeTab === "quotes" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-black text-zinc-950 uppercase tracking-tight">Cotações de Fábrica</h2>
                    <p className="text-xs text-zinc-500">Solicite propostas comerciais com condições especiais para compras volumosas.</p>
                  </div>

                  <Link
                    href="/catalogo"
                    className="px-4 py-2 bg-am-magenta hover:bg-am-magenta-hover text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-magenta-sm flex items-center gap-1.5"
                  >
                    <Plus size={14} />
                    <span>Montar Nova Cotação</span>
                  </Link>
                </div>

                {(!user.quotes || user.quotes.length === 0) ? (
                  <div className="bg-white rounded-3xl border border-zinc-200 p-12 text-center text-zinc-400">
                    <FileText size={40} className="mx-auto mb-2 text-zinc-300" />
                    <p className="text-sm font-medium text-zinc-600">Nenhum orçamento solicitado até o momento.</p>
                    <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
                      Você pode adicionar as peças desejadas no carrinho e clicar em &ldquo;Solicitar Orçamento Formal&rdquo;.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {user.quotes.map((q) => (
                      <div
                        key={q.id}
                        className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-xs space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-black text-sm text-zinc-950">{q.quoteNumber}</span>
                              <span className="text-[10px] text-zinc-400">• {q.date}</span>
                              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                                q.status === "respondido"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}>
                                {q.status === "respondido" ? "Proposta Comercial Disponível" : "Em Análise pela Fábrica"}
                              </span>
                            </div>
                            {q.assignedSalesperson && (
                              <span className="text-xs text-zinc-500 mt-0.5 block">
                                Especialista responsável: <strong>{q.assignedSalesperson}</strong>
                              </span>
                            )}
                          </div>

                          <div className="text-right">
                            <span className="text-lg font-black text-zinc-950">
                              R$ {q.totalEstimated.toFixed(2).replace(".", ",")}
                            </span>
                            <span className="text-[11px] text-zinc-500 block">
                              Total de <strong>{q.totalPieces} peças</strong>
                            </span>
                          </div>
                        </div>

                        {q.notes && (
                          <div className="p-3 bg-zinc-50 rounded-2xl text-xs text-zinc-600 italic">
                            &ldquo;{q.notes}&rdquo;
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-2">
                          <a
                            href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20sobre%20meu%20or%C3%A7amento%20AM%20FIT"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-am-magenta hover:underline"
                          >
                            <Phone size={13} />
                            <span>Falar com o Especialista no WhatsApp</span>
                          </a>

                          <button
                            onClick={() => alert(`Orçamento ${q.quoteNumber} exportado para simulação!`)}
                            className="px-3.5 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold rounded-xl transition-colors"
                          >
                            Baixar Resumo
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 5: WHOLESALE RULES & STORE SETTINGS (ALTERNATIVA DE APROVAÇÃO) */}
            {activeTab === "settings" && (
              <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-8 shadow-xs space-y-6">
                <div>
                  <h2 className="text-xl font-black text-zinc-950 uppercase tracking-tight">
                    Configurações de Regra de Negócio do Atacado
                  </h2>
                  <p className="text-xs text-zinc-500 mt-1">
                    Defina como sua loja apresenta os preços de atacado e valida os clientes revendedores.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-extrabold text-sm text-zinc-900">
                        Ocultar Preço de Atacado para Visitantes (Exigir Login / Aprovação)
                      </h4>
                      <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                        Quando ativado, os preços de fábrica ficam bloqueados na vitrine com a mensagem <em>&ldquo;Preço exclusivo para lojistas após login/aprovação&rdquo;</em>, preservando a margem dos revendedores.
                      </p>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        checked={requireWholesaleApproval}
                        onChange={(e) => setRequireWholesaleApproval(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-zinc-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-am-magenta"></div>
                    </label>
                  </div>

                  <div className={`p-3 rounded-xl text-xs font-medium border ${
                    requireWholesaleApproval
                      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                      : "bg-blue-50 text-blue-800 border-blue-200"
                  }`}>
                    {requireWholesaleApproval
                      ? "✓ Ativo: Visitantes precisam criar conta de atacado e ter cadastro validado para visualizar os valores de atacado."
                      : "○ Modo Aberto: Preços de atacado são visíveis para qualquer visitante que alternar para a aba Atacado."}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
                  <h4 className="font-extrabold text-sm text-zinc-900">
                    Regra Atual de Quantidade Mínima de Atacado
                  </h4>
                  <ul className="text-xs text-zinc-600 space-y-1.5 list-disc list-inside">
                    <li>Valor mínimo: <strong>R$ 300,00</strong> por pedido OU</li>
                    <li>Grade mínima: <strong>6 peças variadas</strong> (pode mesclar modelos, tamanhos e cores)</li>
                    <li>Margem média recomendada para revenda: <strong>100% a 120%</strong></li>
                  </ul>
                </div>

              </div>
            )}

          </section>

        </div>

      </main>

      <Footer />
    </div>
  );
}
