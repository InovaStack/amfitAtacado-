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
  HelpCircle,
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
    <div className="w-full space-y-6 pb-24 animate-fadeIn">
      
      {/* ============================================================== */}
      {/* 1. HEADER EXECUTIVO FULL-WIDTH                                */}
      {/* ============================================================== */}
      <div className="w-full bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 rounded-3xl p-6 sm:p-8 lg:p-10 text-white shadow-xl border border-zinc-800 relative overflow-hidden">
        {/* Glow de fundo */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-am-magenta/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-pink-600/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          <div className="space-y-3 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-am-magenta/20 border border-am-magenta/40 text-am-magenta font-black text-xs uppercase tracking-wider">
                <SlidersHorizontal size={13} />
                Painel Master
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold text-xs">
                <Activity size={13} />
                Sincronização em Tempo Real Ativa
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-zinc-300 font-medium text-xs">
                {activeChannelsCount} de 4 canais de atendimento ativos
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-[family-name:var(--font-heading)]">
              Configurações & Políticas da Fábrica
            </h1>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Gerencie canais de vendas oficiais, dados da empresa, políticas industriais e regras comerciais de atacado e varejo com atualização instantânea na loja.
            </p>
          </div>

          {/* Botões de Ação do Topo */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleResetToDefault}
              className="px-5 py-3.5 rounded-2xl border border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 hover:text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <RotateCcw size={16} />
              <span>Restaurar Padrão</span>
            </button>

            <button
              type="button"
              onClick={() => handleSubmit()}
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-am-magenta via-pink-600 to-am-magenta hover:opacity-95 text-white text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-2.5 transition-all shadow-lg shadow-am-magenta/30 active:scale-95 cursor-pointer"
            >
              {savedSuccess ? <Check size={18} className="text-emerald-300" /> : <Save size={18} />}
              <span>{savedSuccess ? "Alterações Salvas!" : "Salvar Configurações"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Alerta de Sucesso Dinâmico */}
      {savedSuccess && (
        <div className="w-full p-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-sm font-semibold flex items-center gap-4 animate-fadeIn shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <CheckCircle2 size={22} />
          </div>
          <div className="flex-1">
            <p className="font-black text-base text-emerald-950">Configurações salvas e publicadas com sucesso!</p>
            <p className="text-emerald-800 text-xs sm:text-sm mt-0.5">
              Todos os canais de atendimento, regras comerciais e políticas da fábrica foram sincronizados no catálogo e rodapé.
            </p>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. SUB-TABS MODERNAS EM TELA CHEIA                             */}
      {/* ============================================================== */}
      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3">
        <button
          type="button"
          onClick={() => setActiveSubTab("contato")}
          className={`p-4 sm:p-5 rounded-2xl text-left transition-all border flex items-center gap-4 cursor-pointer ${
            activeSubTab === "contato"
              ? "bg-white border-am-magenta shadow-md ring-2 ring-am-magenta/20"
              : "bg-white/80 hover:bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300"
          }`}
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
            activeSubTab === "contato" ? "bg-am-magenta text-white shadow-sm" : "bg-zinc-100 text-zinc-600"
          }`}>
            <Phone size={22} />
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-zinc-400">Atendimento</div>
            <div className="text-sm sm:text-base font-black text-zinc-900 mt-0.5">Canais & Contato</div>
            <div className="text-[11px] text-zinc-500 mt-0.5 hidden sm:block">WhatsApp, Instagram, Shopee, Mercado Livre</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("politicas")}
          className={`p-4 sm:p-5 rounded-2xl text-left transition-all border flex items-center gap-4 cursor-pointer ${
            activeSubTab === "politicas"
              ? "bg-white border-am-magenta shadow-md ring-2 ring-am-magenta/20"
              : "bg-white/80 hover:bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300"
          }`}
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
            activeSubTab === "politicas" ? "bg-am-magenta text-white shadow-sm" : "bg-zinc-100 text-zinc-600"
          }`}>
            <Sparkles size={22} />
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-zinc-400">Institucional</div>
            <div className="text-sm sm:text-base font-black text-zinc-900 mt-0.5">Políticas da Fábrica</div>
            <div className="text-[11px] text-zinc-500 mt-0.5 hidden sm:block">Garantia, polo têxtil, trocas e envios</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("geral")}
          className={`p-4 sm:p-5 rounded-2xl text-left transition-all border flex items-center gap-4 cursor-pointer ${
            activeSubTab === "geral"
              ? "bg-white border-am-magenta shadow-md ring-2 ring-am-magenta/20"
              : "bg-white/80 hover:bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300"
          }`}
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
            activeSubTab === "geral" ? "bg-am-magenta text-white shadow-sm" : "bg-zinc-100 text-zinc-600"
          }`}>
            <Building2 size={22} />
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-zinc-400">Identidade</div>
            <div className="text-sm sm:text-base font-black text-zinc-900 mt-0.5">Informações Gerais</div>
            <div className="text-[11px] text-zinc-500 mt-0.5 hidden sm:block">Nome comercial, slogan e topo do site</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("comercial")}
          className={`p-4 sm:p-5 rounded-2xl text-left transition-all border flex items-center gap-4 cursor-pointer ${
            activeSubTab === "comercial"
              ? "bg-white border-am-magenta shadow-md ring-2 ring-am-magenta/20"
              : "bg-white/80 hover:bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300"
          }`}
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
            activeSubTab === "comercial" ? "bg-emerald-600 text-white shadow-sm" : "bg-zinc-100 text-zinc-600"
          }`}>
            <DollarSign size={22} />
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-zinc-400">Condições</div>
            <div className="text-sm sm:text-base font-black text-zinc-900 mt-0.5">Regras Comerciais</div>
            <div className="text-[11px] text-zinc-500 mt-0.5 hidden sm:block">Pedido mínimo atacado, peças e PIX</div>
          </div>
        </button>
      </div>

      {/* ============================================================== */}
      {/* 3. CONTEÚDO PRINCIPAL DAS CONFIGURAÇÕES                        */}
      {/* ============================================================== */}
      <form onSubmit={handleSubmit} className="w-full space-y-6">

        {/* ============================================================ */}
        {/* ABA: CANAIS DE ATENDIMENTO ORGANIZADOS UM ABAIXO DO OUTRO    */}
        {/* ============================================================ */}
        {activeSubTab === "contato" && (
          <div className="w-full space-y-6">
            
            {/* Bloco de Instrução */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-zinc-950 flex items-center gap-2.5">
                  <Phone size={24} className="text-am-magenta" />
                  <span>Canais Oficiais de Venda & Atendimento</span>
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-3xl leading-relaxed">
                  Os canais abaixo estão dispostos um abaixo do outro. Você pode configurar links, telefones e utilizar o interruptor de cada canal para torná-lo <strong>ativo</strong> ou <strong>ofuscado/bloqueado</strong> imediatamente para os clientes da loja.
                </p>
              </div>
              <div className="px-4 py-2 bg-zinc-100 rounded-xl text-xs font-bold text-zinc-700 shrink-0 border border-zinc-200">
                Status: <span className="text-am-magenta font-black">{activeChannelsCount} canais visíveis</span>
              </div>
            </div>

            {/* LISTA COMPLETA DOS 4 CANAIS (UM ABAIXO DO OUTRO) */}
            <div className="space-y-4">
              
              {/* 1. WHATSAPP */}
              {(() => {
                const isActive = formData.channelsStatus?.whatsappActive ?? true;
                return (
                  <div className={`w-full bg-white rounded-3xl p-6 sm:p-8 border transition-all ${
                    isActive 
                      ? "border-emerald-300 shadow-sm" 
                      : "border-zinc-300 bg-zinc-50/70 opacity-75"
                  }`}>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-100">
                      
                      {/* Identificação */}
                      <div className="flex items-start sm:items-center gap-4">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-transform ${
                          isActive 
                            ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/25 scale-100" 
                            : "bg-zinc-300 text-zinc-600 grayscale"
                        }`}>
                          <MessageCircle size={32} />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="font-black text-lg sm:text-xl text-zinc-950">
                              WhatsApp Comercial & Fechamento de Sacola
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                              isActive 
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-300" 
                                : "bg-zinc-200 text-zinc-600 border border-zinc-300"
                            }`}>
                              {isActive ? "● Canal Ativo na Loja" : "○ Canal Ofuscado (Inativo)"}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-2xl">
                            Canal direto onde os clientes tiram dúvidas de peças, negociam frete e fecham pedidos gerados no carrinho.
                          </p>
                        </div>
                      </div>

                      {/* Botão de Toggle */}
                      <button
                        type="button"
                        onClick={() => toggleChannelActive("whatsappActive")}
                        className={`px-6 py-3.5 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-sm active:scale-95 shrink-0 cursor-pointer ${
                          isActive
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                            : "bg-zinc-800 hover:bg-zinc-900 text-white"
                        }`}
                      >
                        {isActive ? <Eye size={18} /> : <EyeOff size={18} />}
                        <span>{isActive ? "Canal Ativo (Clique p/ Ofuscar)" : "Canal Ofuscado (Clique p/ Ativar)"}</span>
                      </button>
                    </div>

                    {/* Inputs em Grid Responsivo de Tela Cheia */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-6">
                      <div>
                        <label className="block text-xs font-bold text-zinc-800 mb-1.5 uppercase tracking-wide">
                          Número Oficial (DDI + DDD + Telefone)
                        </label>
                        <input
                          type="text"
                          value={formData.contact.whatsappNumber}
                          onChange={(e) => handleChange("contact", "whatsappNumber", e.target.value)}
                          className="w-full px-4 py-3.5 rounded-xl border border-zinc-300 focus:border-am-magenta focus:ring-2 focus:ring-am-magenta/10 focus:outline-none text-sm font-mono text-zinc-900 bg-white"
                          placeholder="5511999999999"
                        />
                        <span className="text-[11px] text-zinc-400 mt-1 block">
                          Número técnico para links da API do WhatsApp (apenas dígitos).
                        </span>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-zinc-800 mb-1.5 uppercase tracking-wide">
                          Formato Visual Exibido no Site
                        </label>
                        <input
                          type="text"
                          value={formData.contact.whatsappFormatted}
                          onChange={(e) => handleChange("contact", "whatsappFormatted", e.target.value)}
                          className="w-full px-4 py-3.5 rounded-xl border border-zinc-300 focus:border-am-magenta focus:ring-2 focus:ring-am-magenta/10 focus:outline-none text-sm font-mono text-zinc-900 bg-white"
                          placeholder="(11) 99999-9999"
                        />
                        <span className="text-[11px] text-zinc-400 mt-1 block">
                          Texto amigável formatado exibido no topo e rodapé.
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* 2. INSTAGRAM */}
              {(() => {
                const isActive = formData.channelsStatus?.instagramActive ?? true;
                return (
                  <div className={`w-full bg-white rounded-3xl p-6 sm:p-8 border transition-all ${
                    isActive 
                      ? "border-pink-300 shadow-sm" 
                      : "border-zinc-300 bg-zinc-50/70 opacity-75"
                  }`}>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-100">
                      
                      <div className="flex items-start sm:items-center gap-4">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-transform ${
                          isActive 
                            ? "bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white shadow-md shadow-rose-500/25 scale-100" 
                            : "bg-zinc-300 text-zinc-600 grayscale"
                        }`}>
                          <Instagram size={32} />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="font-black text-lg sm:text-xl text-zinc-950">
                              Instagram Oficial da Fábrica
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                              isActive 
                                ? "bg-rose-100 text-rose-800 border border-rose-300" 
                                : "bg-zinc-200 text-zinc-600 border border-zinc-300"
                            }`}>
                              {isActive ? "● Canal Ativo na Loja" : "○ Canal Ofuscado (Inativo)"}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-2xl">
                            Canal de lançamentos, fotos reais das peças nos corpos dos modelos e bastidores da confecção.
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleChannelActive("instagramActive")}
                        className={`px-6 py-3.5 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-sm active:scale-95 shrink-0 cursor-pointer ${
                          isActive
                            ? "bg-rose-600 hover:bg-rose-700 text-white"
                            : "bg-zinc-800 hover:bg-zinc-900 text-white"
                        }`}
                      >
                        {isActive ? <Eye size={18} /> : <EyeOff size={18} />}
                        <span>{isActive ? "Canal Ativo (Clique p/ Ofuscar)" : "Canal Ofuscado (Clique p/ Ativar)"}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-6">
                      <div>
                        <label className="block text-xs font-bold text-zinc-800 mb-1.5 uppercase tracking-wide">
                          Usuário (@username)
                        </label>
                        <input
                          type="text"
                          value={formData.social.instagram}
                          onChange={(e) => handleChange("social", "instagram", e.target.value)}
                          className="w-full px-4 py-3.5 rounded-xl border border-zinc-300 focus:border-am-magenta focus:ring-2 focus:ring-am-magenta/10 focus:outline-none text-sm text-zinc-900 bg-white"
                          placeholder="@amfit.oficial"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-zinc-800 mb-1.5 uppercase tracking-wide">
                          Link Completo do Perfil (URL)
                        </label>
                        <input
                          type="url"
                          value={formData.social.instagramUrl}
                          onChange={(e) => handleChange("social", "instagramUrl", e.target.value)}
                          className="w-full px-4 py-3.5 rounded-xl border border-zinc-300 focus:border-am-magenta focus:ring-2 focus:ring-am-magenta/10 focus:outline-none text-sm text-zinc-900 bg-white"
                          placeholder="https://instagram.com/amfitoficial"
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
                  <div className={`w-full bg-white rounded-3xl p-6 sm:p-8 border transition-all ${
                    isActive 
                      ? "border-orange-300 shadow-sm" 
                      : "border-zinc-300 bg-zinc-50/70 opacity-75"
                  }`}>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-100">
                      
                      <div className="flex items-start sm:items-center gap-4">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-transform ${
                          isActive 
                            ? "bg-[#ee4d2d] text-white shadow-md shadow-orange-500/25 scale-100" 
                            : "bg-zinc-300 text-zinc-600 grayscale"
                        }`}>
                          <ShoppingBag size={32} />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="font-black text-lg sm:text-xl text-zinc-950">
                              Loja Oficial na Shopee
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                              isActive 
                                ? "bg-orange-100 text-orange-800 border border-orange-300" 
                                : "bg-zinc-200 text-zinc-600 border border-zinc-300"
                            }`}>
                              {isActive ? "● Canal Ativo na Loja" : "○ Canal Ofuscado (Inativo)"}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-2xl">
                            Canal de vendas no marketplace com frete facilitado e milhares de avaliações verificadas.
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleChannelActive("shopeeActive")}
                        className={`px-6 py-3.5 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-sm active:scale-95 shrink-0 cursor-pointer ${
                          isActive
                            ? "bg-[#ee4d2d] hover:bg-[#d43d1f] text-white"
                            : "bg-zinc-800 hover:bg-zinc-900 text-white"
                        }`}
                      >
                        {isActive ? <Eye size={18} /> : <EyeOff size={18} />}
                        <span>{isActive ? "Canal Ativo (Clique p/ Ofuscar)" : "Canal Ofuscado (Clique p/ Ativar)"}</span>
                      </button>
                    </div>

                    <div className="pt-6">
                      <label className="block text-xs font-bold text-zinc-800 mb-1.5 uppercase tracking-wide">
                        Link Direto da Loja na Shopee (URL)
                      </label>
                      <input
                        type="url"
                        value={formData.social.shopeeUrl}
                        onChange={(e) => handleChange("social", "shopeeUrl", e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl border border-zinc-300 focus:border-am-magenta focus:ring-2 focus:ring-am-magenta/10 focus:outline-none text-sm text-zinc-900 bg-white"
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
                  <div className={`w-full bg-white rounded-3xl p-6 sm:p-8 border transition-all ${
                    isActive 
                      ? "border-yellow-400 shadow-sm" 
                      : "border-zinc-300 bg-zinc-50/70 opacity-75"
                  }`}>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-100">
                      
                      <div className="flex items-start sm:items-center gap-4">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-transform ${
                          isActive 
                            ? "bg-[#ffe600] text-zinc-950 shadow-md shadow-yellow-500/25 scale-100" 
                            : "bg-zinc-300 text-zinc-600 grayscale"
                        }`}>
                          <Package size={32} />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="font-black text-lg sm:text-xl text-zinc-950">
                              Loja Oficial no Mercado Livre
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                              isActive 
                                ? "bg-yellow-100 text-amber-900 border border-yellow-300" 
                                : "bg-zinc-200 text-zinc-600 border border-zinc-300"
                            }`}>
                              {isActive ? "● Canal Ativo na Loja" : "○ Canal Ofuscado (Inativo)"}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-2xl">
                            Canal com estoque Full, envio imediato para todo o Brasil e compra protegida.
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleChannelActive("mercadoLivreActive")}
                        className={`px-6 py-3.5 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-sm active:scale-95 shrink-0 cursor-pointer ${
                          isActive
                            ? "bg-zinc-900 hover:bg-black text-[#ffe600]"
                            : "bg-zinc-800 hover:bg-zinc-900 text-white"
                        }`}
                      >
                        {isActive ? <Eye size={18} /> : <EyeOff size={18} />}
                        <span>{isActive ? "Canal Ativo (Clique p/ Ofuscar)" : "Canal Ofuscado (Clique p/ Ativar)"}</span>
                      </button>
                    </div>

                    <div className="pt-6">
                      <label className="block text-xs font-bold text-zinc-800 mb-1.5 uppercase tracking-wide">
                        Link Direto da Loja no Mercado Livre (URL)
                      </label>
                      <input
                        type="url"
                        value={formData.social.mercadoLivreUrl}
                        onChange={(e) => handleChange("social", "mercadoLivreUrl", e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl border border-zinc-300 focus:border-am-magenta focus:ring-2 focus:ring-am-magenta/10 focus:outline-none text-sm text-zinc-900 bg-white"
                        placeholder="https://www.mercadolivre.com.br/pagina/amfit"
                      />
                    </div>
                  </div>
                );
              })()}

            </div>

            {/* Bloco Adicional Full-Width: E-mails e Endereço Físico */}
            <div className="w-full bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-sm space-y-6">
              <h3 className="text-base sm:text-lg font-black text-zinc-950 uppercase tracking-wide border-b border-zinc-100 pb-3 flex items-center gap-2">
                <Mail size={20} className="text-am-magenta" />
                <span>E-mails Corporativos & Localização da Fábrica</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-bold text-zinc-800 mb-1.5 uppercase tracking-wide">
                    E-mail Institucional Geral
                  </label>
                  <input
                    type="email"
                    value={formData.contact.email}
                    onChange={(e) => handleChange("contact", "email", e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-zinc-300 focus:border-am-magenta focus:ring-2 focus:ring-am-magenta/10 focus:outline-none text-sm text-zinc-900 bg-white"
                    placeholder="contato@amfitatacado.com.br"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-800 mb-1.5 uppercase tracking-wide">
                    E-mail Comercial / Vendas Atacado
                  </label>
                  <input
                    type="email"
                    value={formData.contact.salesEmail}
                    onChange={(e) => handleChange("contact", "salesEmail", e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-zinc-300 focus:border-am-magenta focus:ring-2 focus:ring-am-magenta/10 focus:outline-none text-sm text-zinc-900 bg-white"
                    placeholder="vendas@amfitatacado.com.br"
                  />
                </div>

                <div className="md:col-span-2 lg:col-span-1">
                  <label className="block text-xs font-bold text-zinc-800 mb-1.5 uppercase tracking-wide">
                    Horário de Atendimento
                  </label>
                  <input
                    type="text"
                    value={formData.contact.hours}
                    onChange={(e) => handleChange("contact", "hours", e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-zinc-300 focus:border-am-magenta focus:ring-2 focus:ring-am-magenta/10 focus:outline-none text-sm text-zinc-900 bg-white"
                    placeholder="Segunda a Sexta: 08:00 às 18:00"
                  />
                </div>

                <div className="md:col-span-2 lg:col-span-3">
                  <label className="block text-xs font-bold text-zinc-800 mb-1.5 uppercase tracking-wide">
                    Endereço Completo da Fábrica / Showroom
                  </label>
                  <input
                    type="text"
                    value={formData.address.fullAddress}
                    onChange={(e) => handleChange("address", "fullAddress", e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-zinc-300 focus:border-am-magenta focus:ring-2 focus:ring-am-magenta/10 focus:outline-none text-sm text-zinc-900 bg-white"
                    placeholder="Polo de Confecção - Brás / Bom Retiro - São Paulo, SP"
                  />
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ============================================================ */}
        {/* ABA: POLÍTICAS DA FÁBRICA EM GRID 2 COLUNAS FULL-WIDTH       */}
        {/* ============================================================ */}
        {activeSubTab === "politicas" && (
          <div className="w-full space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-zinc-950 flex items-center gap-2.5">
                  <Sparkles size={24} className="text-am-magenta" />
                  <span>Políticas Oficiais da Fábrica & Garantias</span>
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-3xl leading-relaxed">
                  Estes textos alimentam as seções de atendimento, políticas de garantia, rodapé e as páginas de produtos. Você pode customizar os termos industriais para transmitir total credibilidade aos clientes e revendedoras.
                </p>
              </div>
            </div>

            {/* Grid 2x2 preenchendo toda a tela */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Card 1: Origem & Polo Têxtil */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200/90 shadow-sm flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-am-magenta/10 text-am-magenta flex items-center justify-center font-bold">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <h3 className="font-black text-base text-zinc-950">1. Origem & Polo Têxtil</h3>
                        <p className="text-xs text-zinc-400">Confecção própria e pronta entrega</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-zinc-400">
                      {formData.policies.factoryOrigin?.length || 0} carac.
                    </span>
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5 uppercase tracking-wide">
                      Texto Exibido no Site:
                    </label>
                    <textarea
                      rows={5}
                      value={formData.policies.factoryOrigin}
                      onChange={(e) => handleChange("policies", "factoryOrigin", e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-zinc-300 focus:border-am-magenta focus:ring-2 focus:ring-am-magenta/10 focus:outline-none text-sm text-zinc-900 bg-zinc-50/50 resize-y leading-relaxed"
                      placeholder="Descreva a confecção própria e origem do produto..."
                    />
                  </div>
                </div>
                <p className="text-xs text-zinc-400 pt-2 border-t border-zinc-100">
                  Exibido no card "Origem & Polo Têxtil" na página inicial e no rodapé.
                </p>
              </div>

              {/* Card 2: Regra de Atacado & Grade */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200/90 shadow-sm flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-am-magenta/10 text-am-magenta flex items-center justify-center font-bold">
                        <ShoppingBag size={20} />
                      </div>
                      <div>
                        <h3 className="font-black text-base text-zinc-950">2. Regras de Atacado & Grade Livre</h3>
                        <p className="text-xs text-zinc-400">Condições mínimas de compra</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-zinc-400">
                      {formData.policies.wholesaleRule?.length || 0} carac.
                    </span>
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5 uppercase tracking-wide">
                      Texto Exibido no Site:
                    </label>
                    <textarea
                      rows={5}
                      value={formData.policies.wholesaleRule}
                      onChange={(e) => handleChange("policies", "wholesaleRule", e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-zinc-300 focus:border-am-magenta focus:ring-2 focus:ring-am-magenta/10 focus:outline-none text-sm text-zinc-900 bg-zinc-50/50 resize-y leading-relaxed"
                      placeholder="Descreva as condições de atacado, pedido mínimo e liberdade de grade..."
                    />
                  </div>
                </div>
                <p className="text-xs text-zinc-400 pt-2 border-t border-zinc-100">
                  Exibido na página de detalhes do produto, sacola e página de atacado.
                </p>
              </div>

              {/* Card 3: Garantia Zero Transparência & 1ª Troca */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200/90 shadow-sm flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                        <ShieldCheck size={20} />
                      </div>
                      <div>
                        <h3 className="font-black text-base text-zinc-950">3. Garantia & 1ª Troca Grátis</h3>
                        <p className="text-xs text-zinc-400">Proteção contra defeitos e zero transparência</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-zinc-400">
                      {formData.policies.warrantyAndExchange?.length || 0} carac.
                    </span>
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5 uppercase tracking-wide">
                      Texto Exibido no Site:
                    </label>
                    <textarea
                      rows={5}
                      value={formData.policies.warrantyAndExchange}
                      onChange={(e) => handleChange("policies", "warrantyAndExchange", e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-zinc-300 focus:border-am-magenta focus:ring-2 focus:ring-am-magenta/10 focus:outline-none text-sm text-zinc-900 bg-zinc-50/50 resize-y leading-relaxed"
                      placeholder="Descreva a garantia de qualidade, política de devolução e troca..."
                    />
                  </div>
                </div>
                <p className="text-xs text-zinc-400 pt-2 border-t border-zinc-100">
                  Transmite segurança ao revendedor e aos clientes finais.
                </p>
              </div>

              {/* Card 4: Política de Despacho & Prazos */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200/90 shadow-sm flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-am-magenta/10 text-am-magenta flex items-center justify-center font-bold">
                        <Truck size={20} />
                      </div>
                      <div>
                        <h3 className="font-black text-base text-zinc-950">4. Despacho & Envio Imediato</h3>
                        <p className="text-xs text-zinc-400">Logística por Correios e transportadoras</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-zinc-400">
                      {formData.policies.shippingPolicy?.length || 0} carac.
                    </span>
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5 uppercase tracking-wide">
                      Texto Exibido no Site:
                    </label>
                    <textarea
                      rows={5}
                      value={formData.policies.shippingPolicy}
                      onChange={(e) => handleChange("policies", "shippingPolicy", e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-zinc-300 focus:border-am-magenta focus:ring-2 focus:ring-am-magenta/10 focus:outline-none text-sm text-zinc-900 bg-zinc-50/50 resize-y leading-relaxed"
                      placeholder="Descreva prazos para envio após confirmação de pagamento..."
                    />
                  </div>
                </div>
                <p className="text-xs text-zinc-400 pt-2 border-t border-zinc-100">
                  Exibido na página de produto e no modal de cálculo de frete.
                </p>
              </div>

            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* ABA: INFORMAÇÕES GERAIS FULL-WIDTH                           */}
        {/* ============================================================ */}
        {activeSubTab === "geral" && (
          <div className="w-full bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-zinc-200/90 shadow-sm space-y-8">
            <div className="border-b border-zinc-100 pb-5">
              <h2 className="text-xl sm:text-2xl font-black text-zinc-950 flex items-center gap-2.5">
                <Building2 size={24} className="text-am-magenta" />
                <span>Identidade Institucional da Loja</span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-3xl leading-relaxed">
                Nomes da marca, slogans comerciais, mensagens da barra superior de anúncios e domínio web.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-zinc-800 mb-1.5 uppercase tracking-wide">
                  Nome da Marca (Fantasia)
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleSimpleChange("name", e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-zinc-300 focus:border-am-magenta focus:ring-2 focus:ring-am-magenta/10 focus:outline-none text-sm text-zinc-900 bg-white"
                  placeholder="Ex: AM FIT"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-800 mb-1.5 uppercase tracking-wide">
                  Razão Social / Nome Comercial
                </label>
                <input
                  type="text"
                  value={formData.tradeName}
                  onChange={(e) => handleSimpleChange("tradeName", e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-zinc-300 focus:border-am-magenta focus:ring-2 focus:ring-am-magenta/10 focus:outline-none text-sm text-zinc-900 bg-white"
                  placeholder="Ex: AM FIT Atacado & Varejo"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-800 mb-1.5 uppercase tracking-wide">
                  Domínio Oficial da Loja
                </label>
                <input
                  type="text"
                  value={formData.domain}
                  onChange={(e) => handleSimpleChange("domain", e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-zinc-300 focus:border-am-magenta focus:ring-2 focus:ring-am-magenta/10 focus:outline-none text-sm text-zinc-900 bg-white"
                  placeholder="Ex: amfitatacado.com.br"
                />
              </div>

              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-xs font-bold text-zinc-800 mb-1.5 uppercase tracking-wide">
                  Slogan Comercial Principal (Tagline)
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => handleSimpleChange("tagline", e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-zinc-300 focus:border-am-magenta focus:ring-2 focus:ring-am-magenta/10 focus:outline-none text-sm text-zinc-900 bg-white font-medium"
                  placeholder="Ex: Lucre 100% com nossos produtos | Atacado Preço de fábrica"
                />
              </div>

              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-xs font-bold text-zinc-800 mb-1.5 uppercase tracking-wide">
                  Texto da Barra de Anúncios no Topo do Site (Faixa Preta/Magenta)
                </label>
                <input
                  type="text"
                  value={formData.policies.announcementBarText}
                  onChange={(e) => handleChange("policies", "announcementBarText", e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-zinc-300 focus:border-am-magenta focus:ring-2 focus:ring-am-magenta/10 focus:outline-none text-sm text-zinc-900 bg-white"
                  placeholder="Ex: ✨ Lucre 100% com nossos produtos | 📦 Atacado Preço de fábrica"
                />
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* ABA: REGRAS COMERCIAIS & ATACADO FULL-WIDTH                  */}
        {/* ============================================================ */}
        {activeSubTab === "comercial" && (
          <div className="w-full bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-zinc-200/90 shadow-sm space-y-8">
            <div className="border-b border-zinc-100 pb-5">
              <h2 className="text-xl sm:text-2xl font-black text-zinc-950 flex items-center gap-2.5">
                <DollarSign size={24} className="text-emerald-600" />
                <span>Condições Comerciais, Mínimos & Descontos</span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-3xl leading-relaxed">
                Estes parâmetros controlam automaticamente os bloqueios de carrinho para atacado, cálculo de descontos para PIX e limites de parcelamento.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              
              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
                <label className="block text-xs font-black text-zinc-800 uppercase tracking-wide">
                  Pedido Mínimo Atacado
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-black text-zinc-400">
                    R$
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={formData.commercial.minWholesaleOrderAmount}
                    onChange={(e) => handleChange("commercial", "minWholesaleOrderAmount", Number(e.target.value))}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-zinc-300 focus:border-am-magenta focus:outline-none text-base font-black text-zinc-900 bg-white shadow-2xs"
                  />
                </div>
                <span className="text-[11px] text-zinc-500 block">
                  Valor financeiro mínimo para liberar o checkout no atacado.
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
                <label className="block text-xs font-black text-zinc-800 uppercase tracking-wide">
                  Qtd. Mínima de Peças
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.commercial.minWholesalePieces}
                  onChange={(e) => handleChange("commercial", "minWholesalePieces", Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-am-magenta focus:outline-none text-base font-black text-zinc-900 bg-white shadow-2xs"
                />
                <span className="text-[11px] text-zinc-500 block">
                  Número mínimo de peças somadas na sacola.
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
                <label className="block text-xs font-black text-zinc-800 uppercase tracking-wide">
                  Frete Grátis Varejo
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-black text-zinc-400">
                    R$
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="10"
                    value={formData.commercial.freeShippingRetailThreshold}
                    onChange={(e) => handleChange("commercial", "freeShippingRetailThreshold", Number(e.target.value))}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-zinc-300 focus:border-am-magenta focus:outline-none text-base font-black text-zinc-900 bg-white shadow-2xs"
                  />
                </div>
                <span className="text-[11px] text-zinc-500 block">
                  Apenas para pedidos na modalidade de varejo.
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
                <label className="block text-xs font-black text-zinc-800 uppercase tracking-wide">
                  Desconto no PIX
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={formData.commercial.pixDiscountPercentage}
                    onChange={(e) => handleChange("commercial", "pixDiscountPercentage", Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-am-magenta focus:outline-none text-base font-black text-zinc-900 bg-white shadow-2xs"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-black text-zinc-400">
                    %
                  </span>
                </div>
                <span className="text-[11px] text-zinc-500 block">
                  Desconto aplicado em pagamentos instantâneos.
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
                <label className="block text-xs font-black text-zinc-800 uppercase tracking-wide">
                  Parcelas sem Juros
                </label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={formData.commercial.maxInstallments}
                  onChange={(e) => handleChange("commercial", "maxInstallments", Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-am-magenta focus:outline-none text-base font-black text-zinc-900 bg-white shadow-2xs"
                />
                <span className="text-[11px] text-zinc-500 block">
                  Até quantas vezes no cartão sem acréscimo.
                </span>
              </div>

            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 4. BARRA DE SALVAMENTO INFERIOR FULL-WIDTH                     */}
        {/* ============================================================== */}
        <div className="w-full bg-white rounded-3xl p-6 border border-zinc-200/90 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-4 z-20">
          <div className="flex items-center gap-3 text-zinc-600 text-xs sm:text-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Configurações prontas para publicação imediata no catálogo e loja.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleResetToDefault}
              className="px-5 py-3 rounded-2xl border border-zinc-300 text-zinc-700 hover:bg-zinc-100 text-xs sm:text-sm font-bold transition-all cursor-pointer"
            >
              Restaurar Padrão
            </button>

            <button
              type="submit"
              className="flex-1 sm:flex-none px-8 py-3.5 rounded-2xl bg-gradient-to-r from-am-magenta to-pink-600 hover:from-pink-600 hover:to-am-magenta text-white text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-md shadow-am-magenta/20 active:scale-95 cursor-pointer"
            >
              {savedSuccess ? <Check size={18} /> : <Save size={18} />}
              <span>{savedSuccess ? "Salvo com Sucesso!" : "Salvar Alterações"}</span>
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};
