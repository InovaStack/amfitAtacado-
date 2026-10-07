"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  User, 
  Building2, 
  ShoppingBag, 
  Package, 
  MapPin, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Truck, 
  ShieldCheck, 
  ArrowRight, 
  Phone, 
  Mail, 
  FileText, 
  Store, 
  LogOut, 
  Sparkles, 
  ExternalLink,
  ChevronRight,
  AlertCircle
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { useAuth, Address } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { getWhatsAppLink } from "@/config/store";

export default function AccountPage() {
  const { 
    user, 
    isAuthenticated, 
    logout, 
    openAuthModal, 
    updateProfile, 
    addAddress, 
    removeAddress, 
    setDefaultAddress,
    isWholesaleApproved,
    isWholesalePending,
    approveCurrentWholesaleUser
  } = useAuth();

  const { setMode } = useCart();

  const [activeTab, setActiveTab] = useState<"pedidos" | "orcamentos" | "enderecos" | "perfil">("pedidos");

  // Address modal / form states
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddrLabel, setNewAddrLabel] = useState("Residencial");
  const [newAddrRecipient, setNewAddrRecipient] = useState(user?.name || "");
  const [newAddrStreet, setNewAddrStreet] = useState("");
  const [newAddrNumber, setNewAddrNumber] = useState("");
  const [newAddrComplement, setNewAddrComplement] = useState("");
  const [newAddrNeighborhood, setNewAddrNeighborhood] = useState("");
  const [newAddrCity, setNewAddrCity] = useState("");
  const [newAddrState, setNewAddrState] = useState("SP");
  const [newAddrZipCode, setNewAddrZipCode] = useState("");
  const [loadingCep, setLoadingCep] = useState(false);

  // Profile edit states
  const [editName, setEditName] = useState(user?.name || "");
  const [editPhone, setEditPhone] = useState(user?.phone || "");
  const [editCompanyName, setEditCompanyName] = useState(user?.companyName || "");
  const [editTradeName, setEditTradeName] = useState(user?.tradeName || "");
  const [profileSaved, setProfileSaved] = useState(false);

  // Sync state if user changes
  React.useEffect(() => {
    if (user) {
      setEditName(user.name);
      setEditPhone(user.phone);
      setEditCompanyName(user.companyName || "");
      setEditTradeName(user.tradeName || "");
      setNewAddrRecipient(user.name);
    }
  }, [user]);

  const handleCepSearch = async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, "");
    setNewAddrZipCode(cleanCep.length > 5 ? `${cleanCep.slice(0, 5)}-${cleanCep.slice(5, 8)}` : cleanCep);
    if (cleanCep.length === 8) {
      setLoadingCep(true);
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setNewAddrStreet(data.logradouro || "");
          setNewAddrNeighborhood(data.bairro || "");
          setNewAddrCity(data.localidade || "");
          setNewAddrState(data.uf || "SP");
        }
      } catch {
        // ignore
      } finally {
        setLoadingCep(false);
      }
    }
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrStreet.trim() || !newAddrCity.trim() || !newAddrZipCode.trim()) return;

    addAddress({
      label: newAddrLabel,
      recipientName: newAddrRecipient || (user?.name || "Destinatário"),
      street: newAddrStreet,
      number: newAddrNumber || "S/N",
      complement: newAddrComplement,
      neighborhood: newAddrNeighborhood || "Centro",
      city: newAddrCity,
      state: newAddrState,
      zipCode: newAddrZipCode,
      isDefault: false,
    });

    setShowAddressModal(false);
    setNewAddrStreet("");
    setNewAddrNumber("");
    setNewAddrComplement("");
    setNewAddrNeighborhood("");
    setNewAddrCity("");
    setNewAddrZipCode("");
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: editName,
      phone: editPhone,
      companyName: editCompanyName,
      tradeName: editTradeName,
    });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handleUpgradeToWholesale = () => {
    updateProfile({
      accountType: "atacado",
      wholesaleStatus: "pending",
    });
    alert("Sua solicitação de perfil Atacado foi enviada! Entraremos em contato para validar suas condições de revenda.");
  };

  // Status badge colors
  const getStatusBadge = (status: string, label: string) => {
    switch (status) {
      case "entregue":
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-emerald-100 text-emerald-800">{label}</span>;
      case "enviado":
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-blue-100 text-blue-800">{label}</span>;
      case "separacao":
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-purple-100 text-purple-800">{label}</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-amber-100 text-amber-800">{label}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      <Navbar />

      <main className="flex-1 py-8 sm:py-12">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
            <Link href="/" className="hover:text-am-magenta">Início</Link>
            <ChevronRight size={13} />
            <span className="text-zinc-900 font-bold">Portal do Cliente</span>
          </nav>

          {/* IF USER IS NOT LOGGED IN */}
          {!isAuthenticated || !user ? (
            <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-zinc-200 text-center space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-3xl bg-pink-50 border border-pink-200 text-am-magenta flex items-center justify-center mx-auto shadow-sm">
                <User size={32} />
              </div>

              <div>
                <span className="text-xs font-black uppercase tracking-wider text-am-magenta">
                  Área Exclusiva de Clientes
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 mt-1">
                  Acesse sua Conta AM FIT
                </h1>
                <p className="text-sm text-zinc-600 mt-2 max-w-md mx-auto">
                  Faça login para acompanhar seus pedidos e orçamentos, ou crie uma conta escolhendo entre <strong>Varejo</strong> ou <strong>Atacado direto da fábrica</strong>.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto pt-2">
                <button
                  type="button"
                  onClick={() => openAuthModal("varejo", "login")}
                  className="py-3.5 px-6 rounded-2xl bg-zinc-950 hover:bg-am-magenta text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>Já tenho Conta (Entrar)</span>
                  <ArrowRight size={15} />
                </button>

                <button
                  type="button"
                  onClick={() => openAuthModal("atacado", "register")}
                  className="py-3.5 px-6 rounded-2xl bg-am-magenta hover:bg-pink-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-magenta flex items-center justify-center gap-2"
                >
                  <Building2 size={16} />
                  <span>Cadastrar Atacado / Varejo</span>
                </button>
              </div>

              {/* Demo test notice */}
              <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl text-left text-xs text-zinc-600 space-y-1 max-w-md mx-auto">
                <p className="font-bold text-zinc-900 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-am-magenta" />
                  Dica para teste rápido:
                </p>
                <p>
                  Você pode usar os botões de <strong>Acesso Rápido Demo</strong> dentro do modal de login para testar instantaneamente os perfis de Varejo e Atacado!
                </p>
              </div>
            </div>
          ) : (
            
            /* IF USER IS LOGGED IN */
            <div className="space-y-8 animate-fadeIn">
              
              {/* Account Top Header Banner */}
              <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-black rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-zinc-800 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-96 h-96 bg-am-magenta/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  
                  {/* User Profile Summary */}
                  <div className="flex items-center gap-4 sm:gap-5">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-am-magenta text-white font-black text-2xl sm:text-3xl flex items-center justify-center shadow-magenta-sm shrink-0 uppercase">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                          user.accountType === "atacado"
                            ? "bg-purple-600 text-white"
                            : "bg-white text-zinc-950"
                        }`}>
                          {user.accountType === "atacado" ? "Conta Atacado (Revenda)" : "Conta Varejo (Consumidor)"}
                        </span>

                        {user.accountType === "atacado" && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                            isWholesaleApproved
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                              : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                          }`}>
                            {isWholesaleApproved ? <CheckCircle2 size={11} /> : <Clock size={11} />}
                            <span>{isWholesaleApproved ? "Cadastro Aprovado" : "Em Análise Cadastral"}</span>
                          </span>
                        )}
                      </div>

                      <h1 className="text-xl sm:text-2xl font-black">{user.name}</h1>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-300 mt-1">
                        <span>{user.email}</span>
                        <span>&bull;</span>
                        <span>{user.phone}</span>
                        {user.tradeName && (
                          <>
                            <span>&bull;</span>
                            <span className="text-am-magenta font-semibold">{user.tradeName}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions Right */}
                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    {user.accountType === "atacado" ? (
                      <Link
                        href="/lista-atacado"
                        onClick={() => setMode("atacado")}
                        className="px-5 py-2.5 rounded-xl bg-am-magenta hover:bg-pink-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-magenta-sm flex items-center gap-2"
                      >
                        <Sparkles size={14} />
                        <span>Fazer Pedido de Atacado</span>
                      </Link>
                    ) : (
                      <Link
                        href="/catalogo"
                        onClick={() => setMode("varejo")}
                        className="px-5 py-2.5 rounded-xl bg-am-magenta hover:bg-pink-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-magenta-sm flex items-center gap-2"
                      >
                        <ShoppingBag size={14} />
                        <span>Comprar no Varejo</span>
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={logout}
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 border border-white/10"
                    >
                      <LogOut size={14} />
                      <span>Sair</span>
                    </button>
                  </div>

                </div>

                {/* Wholesale Special Status Banner */}
                {user.accountType === "atacado" && isWholesalePending && (
                  <div className="mt-5 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <Clock size={18} className="text-amber-400 shrink-0" />
                      <div>
                        <strong>Cadastro em análise pela equipe comercial:</strong> Seus dados de revenda estão sendo verificados para liberação dos preços exclusivos de atacado.
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={approveCurrentWholesaleUser}
                        className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-[11px] transition-colors"
                        title="Simular aprovação imediata para testes"
                      >
                        Aprovar Agora (Simulação)
                      </button>
                      <a
                        href={getWhatsAppLink(`Olá, fiz meu cadastro de atacado na AM FIT em nome de ${user.name} e gostaria de agilizar a análise.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] flex items-center gap-1"
                      >
                        <span>Falar no WhatsApp</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                )}

                {/* Retail to Wholesale Upgrade Banner */}
                {user.accountType === "varejo" && (
                  <div className="mt-5 p-3.5 rounded-2xl bg-pink-500/10 border border-pink-500/20 text-zinc-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <Building2 size={18} className="text-am-magenta shrink-0" />
                      <div>
                        <strong>Quer revender AM FIT na sua cidade?</strong> Mude para o perfil de Atacado para comprar com até 120% de margem e mínimo de apenas 6 peças!
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleUpgradeToWholesale}
                      className="px-4 py-1.5 rounded-lg bg-am-magenta hover:bg-pink-600 text-white font-bold text-[11px] uppercase tracking-wider shrink-0 transition-colors"
                    >
                      Solicitar Upgrade Atacado
                    </button>
                  </div>
                )}
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-2 border-b border-zinc-200 overflow-x-auto pb-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("pedidos")}
                  className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                    activeTab === "pedidos"
                      ? "border-am-magenta text-am-magenta"
                      : "border-transparent text-zinc-500 hover:text-zinc-900"
                  }`}
                >
                  <Package size={16} />
                  <span>Meus Pedidos ({user.orders?.length || 0})</span>
                </button>

                {user.accountType === "atacado" && (
                  <button
                    type="button"
                    onClick={() => setActiveTab("orcamentos")}
                    className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                      activeTab === "orcamentos"
                        ? "border-am-magenta text-am-magenta"
                        : "border-transparent text-zinc-500 hover:text-zinc-900"
                    }`}
                  >
                    <FileText size={16} />
                    <span>Cotações B2B ({user.quotes?.length || 0})</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setActiveTab("enderecos")}
                  className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                    activeTab === "enderecos"
                      ? "border-am-magenta text-am-magenta"
                      : "border-transparent text-zinc-500 hover:text-zinc-900"
                  }`}
                >
                  <MapPin size={16} />
                  <span>Endereços de Entrega ({user.addresses?.length || 0})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("perfil")}
                  className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                    activeTab === "perfil"
                      ? "border-am-magenta text-am-magenta"
                      : "border-transparent text-zinc-500 hover:text-zinc-900"
                  }`}
                >
                  <User size={16} />
                  <span>Dados Cadastrais</span>
                </button>
              </div>

              {/* =================================================== */}
              {/* TAB 1: MEUS PEDIDOS */}
              {/* =================================================== */}
              {activeTab === "pedidos" && (
                <div className="space-y-4">
                  {(!user.orders || user.orders.length === 0) ? (
                    <div className="bg-white rounded-3xl p-10 text-center border border-zinc-200 space-y-4">
                      <div className="w-14 h-14 rounded-2xl bg-zinc-100 text-zinc-400 flex items-center justify-center mx-auto">
                        <Package size={28} />
                      </div>
                      <div>
                        <h3 className="font-black text-base text-zinc-900">Você ainda não possui pedidos</h3>
                        <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
                          Seus pedidos realizados pelo site ou pelo WhatsApp ficarão registrados aqui com código de rastreamento.
                        </p>
                      </div>
                      <Link
                        href={user.accountType === "atacado" ? "/lista-atacado" : "/catalogo"}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-am-magenta text-white text-xs font-bold uppercase tracking-wider hover:bg-pink-600 transition-colors shadow-magenta-sm"
                      >
                        <span>Explorar Produtos</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {user.orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-3xl p-5 sm:p-6 border border-zinc-200 shadow-sm space-y-4">
                          {/* Order Header */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-100">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-black text-sm text-zinc-950">{order.orderNumber}</span>
                                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                                  order.mode === "atacado" ? "bg-purple-100 text-purple-700" : "bg-pink-100 text-pink-700"
                                }`}>
                                  {order.mode}
                                </span>
                              </div>
                              <p className="text-xs text-zinc-400 mt-0.5">Realizado em {order.date}</p>
                            </div>

                            <div className="flex items-center gap-3">
                              {getStatusBadge(order.status, order.statusLabel)}
                              <span className="font-black text-base text-zinc-950">
                                R$ {order.total.toFixed(2)}
                              </span>
                            </div>
                          </div>

                          {/* Tracking Info if available */}
                          {order.trackingCode && order.trackingCode !== "GERANDO-RASTREIO" && (
                            <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-between text-xs text-blue-900">
                              <div className="flex items-center gap-2">
                                <Truck size={16} className="text-blue-600 shrink-0" />
                                <div>
                                  <span className="font-bold">Rastreamento ({order.trackingCompany}):</span>{" "}
                                  <code className="bg-white px-2 py-0.5 rounded font-mono font-bold text-blue-800">
                                    {order.trackingCode}
                                  </code>
                                </div>
                              </div>
                              <span className="text-[11px] text-blue-600 font-semibold hidden sm:inline">
                                Em trânsito para seu endereço
                              </span>
                            </div>
                          )}

                          {/* Items List */}
                          <div className="space-y-3">
                            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                              Itens do Pedido ({order.items.length}):
                            </span>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-2.5 rounded-2xl bg-zinc-50 border border-zinc-200">
                                  <div className="w-12 h-12 rounded-xl bg-zinc-200 overflow-hidden relative shrink-0">
                                    <img
                                      src={item.image || "https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?auto=format&fit=crop&w=150&q=80"}
                                      alt={item.productName}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-xs font-bold text-zinc-900 truncate">{item.productName}</h4>
                                    <div className="flex items-center gap-2 text-[11px] text-zinc-500 mt-0.5">
                                      <span>Tam: <strong>{item.size}</strong></span>
                                      <span>&bull;</span>
                                      <span>Cor: <strong>{item.color}</strong></span>
                                      <span>&bull;</span>
                                      <span>Qtd: <strong>{item.quantity}</strong></span>
                                    </div>
                                  </div>
                                  <div className="text-right shrink-0">
                                    <span className="text-xs font-black text-zinc-900">
                                      R$ {item.totalPrice.toFixed(2)}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Order Footer */}
                          <div className="pt-3 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-500">
                            <div>
                              <span>Forma de Pagamento: </span>
                              <strong className="text-zinc-800 uppercase">{order.paymentMethod}</strong>
                            </div>
                            <a
                              href={getWhatsAppLink(`Olá, gostaria de saber informações sobre o pedido ${order.orderNumber}`)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-am-magenta hover:underline font-bold flex items-center gap-1"
                            >
                              <span>Dúvidas sobre este pedido? Chamar suporte</span>
                              <ExternalLink size={12} />
                            </a>
                          </div>

                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* =================================================== */}
              {/* TAB 2: COTAÇÕES ATACADO (B2B) */}
              {/* =================================================== */}
              {activeTab === "orcamentos" && user.accountType === "atacado" && (
                <div className="space-y-4">
                  {(!user.quotes || user.quotes.length === 0) ? (
                    <div className="bg-white rounded-3xl p-10 text-center border border-zinc-200 space-y-4">
                      <div className="w-14 h-14 rounded-2xl bg-zinc-100 text-zinc-400 flex items-center justify-center mx-auto">
                        <FileText size={28} />
                      </div>
                      <div>
                        <h3 className="font-black text-base text-zinc-900">Nenhum orçamento solicitado ainda</h3>
                        <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
                          Lojistas podem solicitar cotações especiais com condições diferenciadas de faturamento e grade completa.
                        </p>
                      </div>
                      <Link
                        href="/lista-atacado"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-am-magenta text-white text-xs font-bold uppercase tracking-wider hover:bg-pink-600 transition-colors shadow-magenta-sm"
                      >
                        <span>Montar Pedido de Atacado</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {user.quotes.map((quote) => (
                        <div key={quote.id} className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-black text-sm text-zinc-950">{quote.quoteNumber}</span>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-purple-100 text-purple-700">
                                  {quote.totalPieces} Peças
                                </span>
                              </div>
                              <p className="text-xs text-zinc-400 mt-0.5">Criado em {quote.date}</p>
                            </div>
                            <div className="text-right">
                              <span className="text-[11px] text-zinc-500 block">Total Estimado</span>
                              <span className="text-base font-black text-am-magenta">
                                R$ {quote.totalEstimated.toFixed(2)}
                              </span>
                            </div>
                          </div>

                          {quote.assignedSalesperson && (
                            <div className="p-3 bg-pink-50 border border-pink-200 rounded-2xl text-xs text-zinc-700 flex items-center justify-between">
                              <div>
                                <span className="font-bold text-am-magenta">Consultora Atribuída: </span>
                                <span>{quote.assignedSalesperson}</span>
                              </div>
                              <a
                                href={getWhatsAppLink(`Olá, gostaria de falar sobre a cotação ${quote.quoteNumber}`)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-bold text-am-magenta hover:underline flex items-center gap-1"
                              >
                                <span>Falar no WhatsApp</span>
                                <ExternalLink size={12} />
                              </a>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* =================================================== */}
              {/* TAB 3: ENDEREÇOS DE ENTREGA */}
              {/* =================================================== */}
              {activeTab === "enderecos" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-black text-base text-zinc-900">Locais de Entrega Cadastrados</h3>
                      <p className="text-xs text-zinc-500">Adicione endereços de envio residencial ou da sua loja física.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowAddressModal(true)}
                      className="px-4 py-2.5 rounded-xl bg-am-magenta hover:bg-pink-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-magenta-sm flex items-center gap-1.5"
                    >
                      <Plus size={15} />
                      <span>Novo Endereço</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {user.addresses?.map((addr) => (
                      <div
                        key={addr.id}
                        className={`p-5 rounded-3xl border-2 transition-all bg-white relative flex flex-col justify-between ${
                          addr.isDefault ? "border-am-magenta shadow-sm" : "border-zinc-200"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-black text-xs text-zinc-900 uppercase tracking-wide">
                              {addr.label}
                            </span>
                            {addr.isDefault && (
                              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-am-magenta text-white">
                                Padrão
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-bold text-zinc-800">{addr.recipientName}</p>
                          <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                            {addr.street}, {addr.number} {addr.complement && `(${addr.complement})`}
                            <br />
                            {addr.neighborhood} - {addr.city}/{addr.state}
                            <br />
                            CEP: {addr.zipCode}
                          </p>
                        </div>

                        <div className="pt-4 mt-4 border-t border-zinc-100 flex items-center justify-between">
                          {!addr.isDefault && (
                            <button
                              type="button"
                              onClick={() => setDefaultAddress(addr.id)}
                              className="text-xs font-bold text-am-magenta hover:underline"
                            >
                              Tornar Padrão
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => removeAddress(addr.id)}
                            className="text-xs font-semibold text-zinc-400 hover:text-red-600 ml-auto flex items-center gap-1 transition-colors"
                          >
                            <Trash2 size={13} />
                            <span>Remover</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Address Modal */}
                  {showAddressModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
                      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-zinc-200 space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                          <h3 className="font-black text-base text-zinc-950">Novo Endereço de Entrega</h3>
                          <button onClick={() => setShowAddressModal(false)} className="text-zinc-400 hover:text-zinc-600">
                            ✕
                          </button>
                        </div>

                        <form onSubmit={handleSaveAddress} className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-bold text-zinc-700 mb-1">Identificação *</label>
                              <input
                                type="text"
                                value={newAddrLabel}
                                onChange={(e) => setNewAddrLabel(e.target.value)}
                                placeholder="Ex: Loja Matriz, Residência"
                                className="w-full py-2 px-3 text-xs bg-zinc-50 border border-zinc-300 rounded-xl focus:outline-none focus:border-am-magenta"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-zinc-700 mb-1">Destinatário *</label>
                              <input
                                type="text"
                                value={newAddrRecipient}
                                onChange={(e) => setNewAddrRecipient(e.target.value)}
                                placeholder="Nome de quem recebe"
                                className="w-full py-2 px-3 text-xs bg-zinc-50 border border-zinc-300 rounded-xl focus:outline-none focus:border-am-magenta"
                                required
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-3">
                            <div className="col-span-1">
                              <label className="block text-xs font-bold text-zinc-700 mb-1">CEP *</label>
                              <input
                                type="text"
                                value={newAddrZipCode}
                                onChange={(e) => handleCepSearch(e.target.value)}
                                placeholder="00000-000"
                                maxLength={9}
                                className="w-full py-2 px-3 text-xs bg-zinc-50 border border-zinc-300 rounded-xl focus:outline-none focus:border-am-magenta"
                                required
                              />
                            </div>
                            <div className="col-span-2">
                              <label className="block text-xs font-bold text-zinc-700 mb-1">Rua / Logradouro *</label>
                              <input
                                type="text"
                                value={newAddrStreet}
                                onChange={(e) => setNewAddrStreet(e.target.value)}
                                placeholder="Rua das Flores"
                                className="w-full py-2 px-3 text-xs bg-zinc-50 border border-zinc-300 rounded-xl focus:outline-none focus:border-am-magenta"
                                required
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-3">
                            <div>
                              <label className="block text-xs font-bold text-zinc-700 mb-1">Número *</label>
                              <input
                                type="text"
                                value={newAddrNumber}
                                onChange={(e) => setNewAddrNumber(e.target.value)}
                                placeholder="100"
                                className="w-full py-2 px-3 text-xs bg-zinc-50 border border-zinc-300 rounded-xl focus:outline-none focus:border-am-magenta"
                                required
                              />
                            </div>
                            <div className="col-span-2">
                              <label className="block text-xs font-bold text-zinc-700 mb-1">Complemento</label>
                              <input
                                type="text"
                                value={newAddrComplement}
                                onChange={(e) => setNewAddrComplement(e.target.value)}
                                placeholder="Apto, Sala, Bloco"
                                className="w-full py-2 px-3 text-xs bg-zinc-50 border border-zinc-300 rounded-xl focus:outline-none focus:border-am-magenta"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-3">
                            <div>
                              <label className="block text-xs font-bold text-zinc-700 mb-1">Bairro *</label>
                              <input
                                type="text"
                                value={newAddrNeighborhood}
                                onChange={(e) => setNewAddrNeighborhood(e.target.value)}
                                placeholder="Centro"
                                className="w-full py-2 px-3 text-xs bg-zinc-50 border border-zinc-300 rounded-xl focus:outline-none focus:border-am-magenta"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-zinc-700 mb-1">Cidade *</label>
                              <input
                                type="text"
                                value={newAddrCity}
                                onChange={(e) => setNewAddrCity(e.target.value)}
                                placeholder="São Paulo"
                                className="w-full py-2 px-3 text-xs bg-zinc-50 border border-zinc-300 rounded-xl focus:outline-none focus:border-am-magenta"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-zinc-700 mb-1">UF *</label>
                              <input
                                type="text"
                                value={newAddrState}
                                onChange={(e) => setNewAddrState(e.target.value)}
                                placeholder="SP"
                                maxLength={2}
                                className="w-full py-2 px-3 text-xs bg-zinc-50 border border-zinc-300 rounded-xl focus:outline-none focus:border-am-magenta"
                                required
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-end gap-2 pt-3">
                            <button
                              type="button"
                              onClick={() => setShowAddressModal(false)}
                              className="px-4 py-2 text-xs font-bold text-zinc-600 hover:bg-zinc-100 rounded-xl"
                            >
                              Cancelar
                            </button>
                            <button
                              type="submit"
                              className="px-5 py-2 text-xs font-bold bg-am-magenta hover:bg-pink-600 text-white rounded-xl shadow-magenta-sm"
                            >
                              Salvar Endereço
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* =================================================== */}
              {/* TAB 4: DADOS CADASTRAIS */}
              {/* =================================================== */}
              {activeTab === "perfil" && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-sm max-w-3xl space-y-6">
                  <div>
                    <h3 className="font-black text-base text-zinc-900">Informações Cadastrais</h3>
                    <p className="text-xs text-zinc-500">Atualize seus dados de contato e dados comerciais.</p>
                  </div>

                  {profileSaved && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                      <span>Alterações salvas com sucesso!</span>
                    </div>
                  )}

                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-zinc-700 mb-1">Nome Completo</label>
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full py-2.5 px-3.5 text-xs bg-zinc-50 border border-zinc-300 rounded-xl focus:outline-none focus:border-am-magenta text-zinc-900"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-zinc-700 mb-1">Telefone / WhatsApp</label>
                        <input
                          type="text"
                          value={editPhone}
                          onChange={(e) => setEditPhone(e.target.value)}
                          className="w-full py-2.5 px-3.5 text-xs bg-zinc-50 border border-zinc-300 rounded-xl focus:outline-none focus:border-am-magenta text-zinc-900"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-zinc-700 mb-1">E-mail Cadastrado</label>
                        <input
                          type="email"
                          value={user.email}
                          disabled
                          className="w-full py-2.5 px-3.5 text-xs bg-zinc-100 border border-zinc-200 rounded-xl text-zinc-500 cursor-not-allowed"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-zinc-700 mb-1">
                          Documento ({user.accountType === "atacado" ? "CNPJ / CPF" : "CPF"})
                        </label>
                        <input
                          type="text"
                          value={user.document}
                          disabled
                          className="w-full py-2.5 px-3.5 text-xs bg-zinc-100 border border-zinc-200 rounded-xl text-zinc-500 cursor-not-allowed"
                        />
                      </div>
                    </div>

                    {user.accountType === "atacado" && (
                      <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-3">
                        <span className="text-[10px] font-black uppercase text-am-magenta tracking-wider">
                          Dados da Empresa / Loja
                        </span>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-zinc-700 mb-1">Nome Fantasia / Marca</label>
                            <input
                              type="text"
                              value={editTradeName}
                              onChange={(e) => setEditTradeName(e.target.value)}
                              className="w-full py-2.5 px-3 text-xs bg-white border border-zinc-300 rounded-xl focus:outline-none focus:border-am-magenta text-zinc-900"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-zinc-700 mb-1">Razão Social</label>
                            <input
                              type="text"
                              value={editCompanyName}
                              onChange={(e) => setEditCompanyName(e.target.value)}
                              className="w-full py-2.5 px-3 text-xs bg-white border border-zinc-300 rounded-xl focus:outline-none focus:border-am-magenta text-zinc-900"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="px-6 py-3 rounded-xl bg-zinc-950 hover:bg-am-magenta text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                      >
                        Salvar Alterações
                      </button>
                    </div>
                  </form>
                </div>
              )}

            </div>
          )}

        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
