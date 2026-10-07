"use client";

import React, { useState, useEffect } from "react";
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  Sparkles, 
  Save, 
  Check, 
  RotateCcw,
  Clock,
  Layers,
  FileText,
  DollarSign,
  AlertCircle,
  Eye,
  EyeOff,
  Package,
  ExternalLink,
  MessageCircle,
  Globe,
  SlidersHorizontal,
  CheckCircle2,
  Activity
} from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { STORE_CONFIG, StoreConfig } from "@/config/store";

export const SettingsTab: React.FC = () => {
  const { storeConfig, updateStoreConfig } = useAdmin();

  // Local state initialized with current context config
  const [formData, setFormData] = useState<StoreConfig>(storeConfig);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<"contato" | "politicas" | "geral" | "comercial">("contato");

  // Keep form in sync when context updates
  useEffect(() => {
    setFormData(storeConfig);
  }, [storeConfig]);

  const handleChange = (section: keyof StoreConfig, field: string, value: any) => {
    setFormData((prev) => {
      if (typeof prev[section] === "object" && prev[section] !== null) {
        return {
          ...prev,
          [section]: {
            ...(prev[section] as any),
            [field]: value,
          },
        };
      }
      return {
        ...prev,
        [section]: value,
      };
    });
    setSavedSuccess(false);
  };

  const handleSimpleChange = (field: keyof StoreConfig, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setSavedSuccess(false);
  };

  const toggleChannelActive = (channelKey: keyof StoreConfig["channelsStatus"]) => {
    setFormData((prev) => {
      const current = prev.channelsStatus?.[channelKey] ?? true;
      return {
        ...prev,
        channelsStatus: {
          ...prev.channelsStatus,
          [channelKey]: !current,
        },
      };
    });
    setSavedSuccess(false);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateStoreConfig(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4500);
  };

  const handleResetToDefault = () => {
    if (confirm("Deseja restaurar as configurações e políticas originais de fábrica?")) {
      setFormData(STORE_CONFIG);
      updateStoreConfig(STORE_CONFIG);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4500);
    }
  };

  // Contagem de canais ativos
  const activeChannelsCount = Object.values(formData.channelsStatus || {}).filter(Boolean).length;

  return (
    <div className="w-full space-y-6 animate-fadeIn text-zinc-900 pb-20">
      
      {/* ============================================================== */}
      {/* 1. TOP HEADER PADRONIZADO (MESMO ESTILO DAS DEMAIS ABAS)       */}
      {/* ============================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight font-[family-name:var(--font-heading)]">
              Configurações da Loja & Políticas
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {activeChannelsCount}/4 Canais Ativos
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-1">
            Gerencie canais de atendimento, dados institucionais, políticas industriais e regras comerciais de atacado e varejo.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="px-4 py-2.5 bg-white hover:bg-zinc-50 text-zinc-700 hover:text-zinc-900 rounded-xl text-xs font-bold flex items-center gap-2 border border-zinc-200 transition-all shadow-2xs cursor-pointer active:scale-95"
            title="Restaurar padrão original"
          >
            <RotateCcw size={14} />
            <span>Padrão</span>
          </button>

          <button
            type="button"
            onClick={() => handleSubmit()}
            className="px-5 py-2.5 bg-am-magenta hover:bg-pink-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-magenta-sm transition-all cursor-pointer active:scale-95"
          >
            {savedSuccess ? <Check size={15} /> : <Save size={15} />}
            <span>{savedSuccess ? "Salvo!" : "Salvar Configurações"}</span>
          </button>
        </div>
      </div>

      {/* Alerta de Sucesso Compacto */}
      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-3 animate-fadeIn shadow-2xs">
          <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
          <div>
            <span className="font-bold">Alterações salvas com sucesso!</span> As configurações e o status dos canais já foram sincronizados na loja.
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. SUB-TABS COMPACTAS NO MESMO PADRÃO DOS FILTROS              */}
      {/* ============================================================== */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveSubTab("contato")}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === "contato"
              ? "bg-am-magenta text-white shadow-magenta-sm"
              : "bg-white text-zinc-600 hover:text-zinc-950 border border-zinc-200"
          }`}
        >
          <Phone size={14} />
          <span>Canais de Atendimento ({activeChannelsCount})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("politicas")}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === "politicas"
              ? "bg-am-magenta text-white shadow-magenta-sm"
              : "bg-white text-zinc-600 hover:text-zinc-950 border border-zinc-200"
          }`}
        >
          <Sparkles size={14} />
          <span>Políticas da Fábrica</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("geral")}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === "geral"
              ? "bg-am-magenta text-white shadow-magenta-sm"
              : "bg-white text-zinc-600 hover:text-zinc-950 border border-zinc-200"
          }`}
        >
          <Building2 size={14} />
          <span>Informações Gerais</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("comercial")}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === "comercial"
              ? "bg-am-magenta text-white shadow-magenta-sm"
              : "bg-white text-zinc-600 hover:text-zinc-950 border border-zinc-200"
          }`}
        >
          <DollarSign size={14} />
          <span>Regras Comerciais & Atacado</span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* 3. CONTEÚDO PRINCIPAL (TELA CHEIA, TAMANHO COMPACTO E LIMPO)   */}
      {/* ============================================================== */}
      <form onSubmit={handleSubmit} className="w-full space-y-6">

        {/* ============================================================ */}
        {/* ABA: CANAIS DE ATENDIMENTO (UM ABAIXO DO OUTRO)              */}
        {/* ============================================================ */}
        {activeSubTab === "contato" && (
          <div className="w-full space-y-4">
            
            {/* 1. WHATSAPP */}
            {(() => {
              const isActive = formData.channelsStatus?.whatsappActive ?? true;
              return (
                <div className={`w-full bg-white rounded-2xl p-4 sm:p-5 border transition-all ${
                  isActive 
                    ? "border-emerald-200 shadow-2xs" 
                    : "border-zinc-300 bg-zinc-50/70 opacity-80"
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                        isActive 
                          ? "bg-emerald-500 text-white shadow-xs" 
                          : "bg-zinc-300 text-zinc-600 grayscale"
                      }`}>
                        <MessageCircle size={22} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm sm:text-base text-zinc-950">
                            WhatsApp Oficial (Vendas & Atendimento)
                          </h3>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            isActive 
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                              : "bg-zinc-100 text-zinc-600 border border-zinc-300"
                          }`}>
                            {isActive ? "● Ativo" : "○ Inativo"}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 mt-0.5">
                          Recebe dúvidas e pedidos finalizados na sacola de compras.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleChannelActive("whatsappActive")}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shrink-0 cursor-pointer ${
                        isActive
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100"
                          : "bg-zinc-800 text-white hover:bg-zinc-900"
                      }`}
                    >
                      {isActive ? <Eye size={14} /> : <EyeOff size={14} />}
                      <span>{isActive ? "Ativo (Ofuscar)" : "Ofuscado (Ativar)"}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 mb-1">
                        Número Oficial (com DDI e DDD)
                      </label>
                      <input
                        type="text"
                        value={formData.contact.whatsappNumber}
                        onChange={(e) => handleChange("contact", "whatsappNumber", e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-zinc-200 focus:border-am-magenta focus:outline-none text-xs sm:text-sm font-mono text-zinc-900 bg-white"
                        placeholder="5511999999999"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-700 mb-1">
                        Formato Visual Exibido no Site
                      </label>
                      <input
                        type="text"
                        value={formData.contact.whatsappFormatted}
                        onChange={(e) => handleChange("contact", "whatsappFormatted", e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-zinc-200 focus:border-am-magenta focus:outline-none text-xs sm:text-sm font-mono text-zinc-900 bg-white"
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* 2. INSTAGRAM */}
            {(() => {
              const isActive = formData.channelsStatus?.instagramActive ?? true;
              return (
                <div className={`w-full bg-white rounded-2xl p-4 sm:p-5 border transition-all ${
                  isActive 
                    ? "border-pink-200 shadow-2xs" 
                    : "border-zinc-300 bg-zinc-50/70 opacity-80"
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                        isActive 
                          ? "bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white shadow-xs" 
                          : "bg-zinc-300 text-zinc-600 grayscale"
                      }`}>
                        <Instagram size={22} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm sm:text-base text-zinc-950">
                            Instagram Oficial da Fábrica
                          </h3>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            isActive 
                              ? "bg-rose-50 text-rose-700 border border-rose-200" 
                              : "bg-zinc-100 text-zinc-600 border border-zinc-300"
                          }`}>
                            {isActive ? "● Ativo" : "○ Inativo"}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 mt-0.5">
                          Lançamentos, fotos em modelos e bastidores da confecção.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleChannelActive("instagramActive")}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shrink-0 cursor-pointer ${
                        isActive
                          ? "bg-rose-50 text-rose-700 border border-rose-300 hover:bg-rose-100"
                          : "bg-zinc-800 text-white hover:bg-zinc-900"
                      }`}
                    >
                      {isActive ? <Eye size={14} /> : <EyeOff size={14} />}
                      <span>{isActive ? "Ativo (Ofuscar)" : "Ofuscado (Ativar)"}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 mb-1">
                        Usuário (@username)
                      </label>
                      <input
                        type="text"
                        value={formData.social.instagram}
                        onChange={(e) => handleChange("social", "instagram", e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-zinc-200 focus:border-am-magenta focus:outline-none text-xs sm:text-sm text-zinc-900 bg-white"
                        placeholder="@amfit.oficial"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-700 mb-1">
                        Link do Perfil (URL)
                      </label>
                      <input
                        type="url"
                        value={formData.social.instagramUrl}
                        onChange={(e) => handleChange("social", "instagramUrl", e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-zinc-200 focus:border-am-magenta focus:outline-none text-xs sm:text-sm text-zinc-900 bg-white"
                        placeholder="https://instagram.com/amfit.oficial"
                      />
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* 3. SHOPEE */}
            {(() => {
              const isActive = formData.channelsStatus?.shopeeActive ?? true;
              return (
                <div className={`w-full bg-white rounded-2xl p-4 sm:p-5 border transition-all ${
                  isActive 
                    ? "border-orange-200 shadow-2xs" 
                    : "border-zinc-300 bg-zinc-50/70 opacity-80"
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                        isActive 
                          ? "bg-[#ee4d2d] text-white shadow-xs" 
                          : "bg-zinc-300 text-zinc-600 grayscale"
                      }`}>
                        <ShoppingBag size={22} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm sm:text-base text-zinc-950">
                            Loja Oficial na Shopee
                          </h3>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            isActive 
                              ? "bg-orange-50 text-orange-700 border border-orange-200" 
                              : "bg-zinc-100 text-zinc-600 border border-zinc-300"
                          }`}>
                            {isActive ? "● Ativo" : "○ Inativo"}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 mt-0.5">
                          Canal de vendas com benefícios e promoções da plataforma Shopee.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleChannelActive("shopeeActive")}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shrink-0 cursor-pointer ${
                        isActive
                          ? "bg-orange-50 text-orange-700 border border-orange-300 hover:bg-orange-100"
                          : "bg-zinc-800 text-white hover:bg-zinc-900"
                      }`}
                    >
                      {isActive ? <Eye size={14} /> : <EyeOff size={14} />}
                      <span>{isActive ? "Ativo (Ofuscar)" : "Ofuscado (Ativar)"}</span>
                    </button>
                  </div>

                  <div className="pt-4">
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      Link Direto da Loja na Shopee (URL)
                    </label>
                    <input
                      type="url"
                      value={formData.social.shopeeUrl}
                      onChange={(e) => handleChange("social", "shopeeUrl", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-zinc-200 focus:border-am-magenta focus:outline-none text-xs sm:text-sm text-zinc-900 bg-white"
                      placeholder="https://shopee.com.br/amfit"
                    />
                  </div>
                </div>
              );
            })()}

            {/* 4. MERCADO LIVRE */}
            {(() => {
              const isActive = formData.channelsStatus?.mercadoLivreActive ?? true;
              return (
                <div className={`w-full bg-white rounded-2xl p-4 sm:p-5 border transition-all ${
                  isActive 
                    ? "border-yellow-300 shadow-2xs" 
                    : "border-zinc-300 bg-zinc-50/70 opacity-80"
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                        isActive 
                          ? "bg-[#ffe600] text-zinc-950 shadow-xs" 
                          : "bg-zinc-300 text-zinc-600 grayscale"
                      }`}>
                        <Package size={22} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm sm:text-base text-zinc-950">
                            Loja Oficial no Mercado Livre
                          </h3>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            isActive 
                              ? "bg-yellow-50 text-amber-900 border border-yellow-200" 
                              : "bg-zinc-100 text-zinc-600 border border-zinc-300"
                          }`}>
                            {isActive ? "● Ativo" : "○ Inativo"}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 mt-0.5">
                          Envio expresso e compra com garantia da plataforma.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleChannelActive("mercadoLivreActive")}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shrink-0 cursor-pointer ${
                        isActive
                          ? "bg-yellow-50 text-amber-900 border border-yellow-300 hover:bg-yellow-100"
                          : "bg-zinc-800 text-white hover:bg-zinc-900"
                      }`}
                    >
                      {isActive ? <Eye size={14} /> : <EyeOff size={14} />}
                      <span>{isActive ? "Ativo (Ofuscar)" : "Ofuscado (Ativar)"}</span>
                    </button>
                  </div>

                  <div className="pt-4">
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      Link Direto da Loja no Mercado Livre (URL)
                    </label>
                    <input
                      type="url"
                      value={formData.social.mercadoLivreUrl}
                      onChange={(e) => handleChange("social", "mercadoLivreUrl", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-zinc-200 focus:border-am-magenta focus:outline-none text-xs sm:text-sm text-zinc-900 bg-white"
                      placeholder="https://www.mercadolivre.com.br/pagina/amfit"
                    />
                  </div>
                </div>
              );
            })()}

            {/* Bloco de E-mails & Endereço Compacto */}
            <div className="w-full bg-white rounded-2xl p-5 border border-zinc-200/90 shadow-2xs space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 border-b border-zinc-100 pb-2 flex items-center gap-2">
                <Mail size={15} className="text-am-magenta" />
                <span>E-mails Corporativos & Localização da Fábrica</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    E-mail Institucional Geral
                  </label>
                  <input
                    type="email"
                    value={formData.contact.email}
                    onChange={(e) => handleChange("contact", "email", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 focus:border-am-magenta focus:outline-none text-xs sm:text-sm text-zinc-900 bg-white"
                    placeholder="contato@amfitatacado.com.br"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    E-mail Comercial / Vendas
                  </label>
                  <input
                    type="email"
                    value={formData.contact.salesEmail}
                    onChange={(e) => handleChange("contact", "salesEmail", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 focus:border-am-magenta focus:outline-none text-xs sm:text-sm text-zinc-900 bg-white"
                    placeholder="vendas@amfitatacado.com.br"
                  />
                </div>

                <div className="md:col-span-2 lg:col-span-1">
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Horário de Atendimento
                  </label>
                  <input
                    type="text"
                    value={formData.contact.hours}
                    onChange={(e) => handleChange("contact", "hours", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 focus:border-am-magenta focus:outline-none text-xs sm:text-sm text-zinc-900 bg-white"
                    placeholder="Segunda a Sexta: 08:00 às 18:00"
                  />
                </div>

                <div className="md:col-span-2 lg:col-span-3">
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Endereço Completo da Fábrica / Showroom
                  </label>
                  <input
                    type="text"
                    value={formData.address.fullAddress}
                    onChange={(e) => handleChange("address", "fullAddress", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 focus:border-am-magenta focus:outline-none text-xs sm:text-sm text-zinc-900 bg-white"
                    placeholder="Polo de Confecção - Brás / Bom Retiro - São Paulo, SP"
                  />
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ============================================================ */}
        {/* ABA: POLÍTICAS DA FÁBRICA (GRID 2 COLUNAS COMPACTO)          */}
        {/* ============================================================ */}
        {activeSubTab === "politicas" && (
          <div className="w-full space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
              
              {/* Card 1 */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-zinc-200/90 shadow-2xs space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2.5 border-b border-zinc-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-am-magenta/10 text-am-magenta flex items-center justify-center font-bold">
                        <MapPin size={16} />
                      </div>
                      <h3 className="font-bold text-xs sm:text-sm text-zinc-900">
                        1. Origem & Polo Têxtil (Confecção Própria)
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-400">
                      {formData.policies.factoryOrigin?.length || 0} carac.
                    </span>
                  </div>

                  <div className="mt-2.5">
                    <textarea
                      rows={4}
                      value={formData.policies.factoryOrigin}
                      onChange={(e) => handleChange("policies", "factoryOrigin", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-zinc-200 focus:border-am-magenta focus:outline-none text-xs sm:text-sm text-zinc-900 bg-zinc-50/50 resize-y leading-relaxed"
                      placeholder="Descreva a confecção própria e origem do produto..."
                    />
                  </div>
                </div>
                <p className="text-[11px] text-zinc-400 border-t border-zinc-100 pt-2">
                  Exibido na página inicial e no rodapé do site.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-zinc-200/90 shadow-2xs space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2.5 border-b border-zinc-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-am-magenta/10 text-am-magenta flex items-center justify-center font-bold">
                        <ShoppingBag size={16} />
                      </div>
                      <h3 className="font-bold text-xs sm:text-sm text-zinc-900">
                        2. Regras de Atacado & Grade Livre
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-400">
                      {formData.policies.wholesaleRule?.length || 0} carac.
                    </span>
                  </div>

                  <div className="mt-2.5">
                    <textarea
                      rows={4}
                      value={formData.policies.wholesaleRule}
                      onChange={(e) => handleChange("policies", "wholesaleRule", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-zinc-200 focus:border-am-magenta focus:outline-none text-xs sm:text-sm text-zinc-900 bg-zinc-50/50 resize-y leading-relaxed"
                      placeholder="Descreva as condições de atacado e pedido mínimo..."
                    />
                  </div>
                </div>
                <p className="text-[11px] text-zinc-400 border-t border-zinc-100 pt-2">
                  Exibido na página do produto, sacola e página de atacado.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-zinc-200/90 shadow-2xs space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2.5 border-b border-zinc-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                        <ShieldCheck size={16} />
                      </div>
                      <h3 className="font-bold text-xs sm:text-sm text-zinc-900">
                        3. Garantia & 1ª Troca Grátis
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-400">
                      {formData.policies.warrantyAndExchange?.length || 0} carac.
                    </span>
                  </div>

                  <div className="mt-2.5">
                    <textarea
                      rows={4}
                      value={formData.policies.warrantyAndExchange}
                      onChange={(e) => handleChange("policies", "warrantyAndExchange", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-zinc-200 focus:border-am-magenta focus:outline-none text-xs sm:text-sm text-zinc-900 bg-zinc-50/50 resize-y leading-relaxed"
                      placeholder="Descreva a política de garantia e troca..."
                    />
                  </div>
                </div>
                <p className="text-[11px] text-zinc-400 border-t border-zinc-100 pt-2">
                  Transmite segurança e proteção aos clientes.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-zinc-200/90 shadow-2xs space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2.5 border-b border-zinc-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-am-magenta/10 text-am-magenta flex items-center justify-center font-bold">
                        <Truck size={16} />
                      </div>
                      <h3 className="font-bold text-xs sm:text-sm text-zinc-900">
                        4. Prazos de Envio & Despacho
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-400">
                      {formData.policies.shippingPolicy?.length || 0} carac.
                    </span>
                  </div>

                  <div className="mt-2.5">
                    <textarea
                      rows={4}
                      value={formData.policies.shippingPolicy}
                      onChange={(e) => handleChange("policies", "shippingPolicy", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-zinc-200 focus:border-am-magenta focus:outline-none text-xs sm:text-sm text-zinc-900 bg-zinc-50/50 resize-y leading-relaxed"
                      placeholder="Descreva os prazos para envio..."
                    />
                  </div>
                </div>
                <p className="text-[11px] text-zinc-400 border-t border-zinc-100 pt-2">
                  Exibido na simulação de frete e detalhes do produto.
                </p>
              </div>

            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* ABA: INFORMAÇÕES GERAIS (COMPACTO)                           */}
        {/* ============================================================ */}
        {activeSubTab === "geral" && (
          <div className="w-full bg-white rounded-2xl p-5 border border-zinc-200/90 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 border-b border-zinc-100 pb-2">
              Identidade Institucional da Loja
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Nome da Marca (Fantasia)
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleSimpleChange("name", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 focus:border-am-magenta focus:outline-none text-xs sm:text-sm text-zinc-900 bg-white"
                  placeholder="Ex: AM FIT"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Razão Social / Nome Comercial
                </label>
                <input
                  type="text"
                  value={formData.tradeName}
                  onChange={(e) => handleSimpleChange("tradeName", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 focus:border-am-magenta focus:outline-none text-xs sm:text-sm text-zinc-900 bg-white"
                  placeholder="Ex: AM FIT Atacado & Varejo"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Domínio Oficial do Site
                </label>
                <input
                  type="text"
                  value={formData.domain}
                  onChange={(e) => handleSimpleChange("domain", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 focus:border-am-magenta focus:outline-none text-xs sm:text-sm text-zinc-900 bg-white"
                  placeholder="Ex: amfitatacado.com.br"
                />
              </div>

              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Slogan Comercial Principal (Tagline)
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => handleSimpleChange("tagline", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 focus:border-am-magenta focus:outline-none text-xs sm:text-sm text-zinc-900 bg-white"
                  placeholder="Ex: Lucre 100% com nossos produtos | Atacado Preço de fábrica"
                />
              </div>

              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Texto da Barra Superior de Anúncios (Faixa Superior)
                </label>
                <input
                  type="text"
                  value={formData.policies.announcementBarText}
                  onChange={(e) => handleChange("policies", "announcementBarText", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 focus:border-am-magenta focus:outline-none text-xs sm:text-sm text-zinc-900 bg-white"
                  placeholder="Ex: ✨ Lucre 100% com nossos produtos | 📦 Atacado Preço de fábrica"
                />
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* ABA: REGRAS COMERCIAIS & ATACADO (CARDS COMPACTOS)           */}
        {/* ============================================================ */}
        {activeSubTab === "comercial" && (
          <div className="w-full bg-white rounded-2xl p-5 border border-zinc-200/90 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 border-b border-zinc-100 pb-2">
              Condições Comerciais, Mínimos & Descontos
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
              
              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1">
                <label className="block text-[11px] font-bold text-zinc-600 uppercase">
                  Mínimo Atacado (R$)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400">
                    R$
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={formData.commercial.minWholesaleOrderAmount}
                    onChange={(e) => handleChange("commercial", "minWholesaleOrderAmount", Number(e.target.value))}
                    className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-zinc-200 focus:border-am-magenta focus:outline-none text-sm font-black text-zinc-900 bg-white"
                  />
                </div>
                <span className="text-[10px] text-zinc-400 block">
                  Valor financeiro mínimo no atacado.
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1">
                <label className="block text-[11px] font-bold text-zinc-600 uppercase">
                  Mínimo de Peças
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.commercial.minWholesalePieces}
                  onChange={(e) => handleChange("commercial", "minWholesalePieces", Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 focus:border-am-magenta focus:outline-none text-sm font-black text-zinc-900 bg-white"
                />
                <span className="text-[10px] text-zinc-400 block">
                  Número mínimo de peças no pedido.
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1">
                <label className="block text-[11px] font-bold text-zinc-600 uppercase">
                  Frete Grátis Varejo
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400">
                    R$
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="10"
                    value={formData.commercial.freeShippingRetailThreshold}
                    onChange={(e) => handleChange("commercial", "freeShippingRetailThreshold", Number(e.target.value))}
                    className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-zinc-200 focus:border-am-magenta focus:outline-none text-sm font-black text-zinc-900 bg-white"
                  />
                </div>
                <span className="text-[10px] text-zinc-400 block">
                  Apenas para pedidos no varejo.
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1">
                <label className="block text-[11px] font-bold text-zinc-600 uppercase">
                  Desconto PIX (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={formData.commercial.pixDiscountPercentage}
                    onChange={(e) => handleChange("commercial", "pixDiscountPercentage", Number(e.target.value))}
                    className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 focus:border-am-magenta focus:outline-none text-sm font-black text-zinc-900 bg-white"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400">
                    %
                  </span>
                </div>
                <span className="text-[10px] text-zinc-400 block">
                  Desconto no pagamento à vista.
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1">
                <label className="block text-[11px] font-bold text-zinc-600 uppercase">
                  Parcelas sem Juros
                </label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={formData.commercial.maxInstallments}
                  onChange={(e) => handleChange("commercial", "maxInstallments", Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 focus:border-am-magenta focus:outline-none text-sm font-black text-zinc-900 bg-white"
                />
                <span className="text-[10px] text-zinc-400 block">
                  Limite de parcelamento no cartão.
                </span>
              </div>

            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 4. BARRA DE SALVAMENTO INFERIOR (COMPACTA E HARMONIOSA)        */}
        {/* ============================================================== */}
        <div className="w-full bg-white rounded-2xl p-4 border border-zinc-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 sticky bottom-4 z-20">
          <div className="text-xs text-zinc-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Configurações sincronizadas com a loja online e atendimento.</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleResetToDefault}
              className="px-4 py-2 bg-white hover:bg-zinc-50 text-zinc-700 rounded-xl text-xs font-bold border border-zinc-200 transition-all cursor-pointer"
            >
              Restaurar Padrão
            </button>

            <button
              type="submit"
              className="flex-1 sm:flex-none px-5 py-2 bg-am-magenta hover:bg-pink-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-magenta-sm transition-all cursor-pointer active:scale-95"
            >
              {savedSuccess ? <Check size={14} /> : <Save size={14} />}
              <span>{savedSuccess ? "Salvo com Sucesso!" : "Salvar Alterações"}</span>
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};
