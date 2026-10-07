"use client";

import React, { useState } from "react";
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
  Power,
  Package,
  ExternalLink,
  MessageCircle
} from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { STORE_CONFIG, StoreConfig } from "@/config/store";

export const SettingsTab: React.FC = () => {
  const { storeConfig, updateStoreConfig } = useAdmin();

  // Local state initialized with current context config
  const [formData, setFormData] = useState<StoreConfig>(storeConfig);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<"geral" | "politicas" | "comercial" | "contato">("contato");

  // Keep form in sync when context updates
  React.useEffect(() => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreConfig(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4500);
  };

  const handleResetToDefault = () => {
    if (confirm("Deseja restaurar as configurações e políticas padrão de fábrica?")) {
      setFormData(STORE_CONFIG);
      updateStoreConfig(STORE_CONFIG);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4500);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl pb-20">
      
      {/* Top Header com Botões e Fontes Ampliadas */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-am-magenta-light border border-am-magenta-border text-am-magenta font-black text-xs tracking-wider uppercase mb-3">
            <Building2 size={15} />
            Painel de Gestão da Loja
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-zinc-950 tracking-tight">
            Configurações da Loja & Políticas
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 mt-2 max-w-2xl leading-relaxed">
            Personalize informações institucionais, políticas de fábrica e controle individualmente quais canais de atendimento estão ativos para os clientes.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="px-5 py-3.5 rounded-2xl border border-zinc-300 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 text-sm font-bold flex items-center gap-2.5 transition-all shadow-2xs active:scale-98"
            title="Restaurar valores de fábrica"
          >
            <RotateCcw size={17} />
            <span>Padrão de Fábrica</span>
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-am-magenta to-pink-600 hover:from-pink-600 hover:to-am-magenta text-white text-sm font-black uppercase tracking-wider flex items-center gap-2.5 transition-all shadow-magenta active:scale-98"
          >
            {savedSuccess ? <Check size={19} /> : <Save size={19} />}
            <span>{savedSuccess ? "Alterações Salvas!" : "Salvar Configurações"}</span>
          </button>
        </div>
      </div>

      {/* Alert de Sucesso Ampliado */}
      {savedSuccess && (
        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm font-semibold flex items-center gap-4 animate-fade-in shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Check size={22} />
          </div>
          <div>
            <p className="font-black text-base text-emerald-950">Alterações salvas com sucesso!</p>
            <p className="text-emerald-700 text-xs sm:text-sm mt-0.5">
              As novas configurações, políticas e status dos canais já estão sincronizadas com o site, rodapé e atendimento.
            </p>
          </div>
        </div>
      )}

      {/* Navigation Sub-Tabs com Botões Maiores e Destaques Visuais */}
      <div className="flex items-center gap-3 border-b border-zinc-200 overflow-x-auto pb-3 scrollbar-none">
        
        <button
          type="button"
          onClick={() => setActiveSubTab("contato")}
          className={`px-5 py-3 rounded-2xl text-sm font-black transition-all whitespace-nowrap flex items-center gap-2.5 shadow-2xs ${
            activeSubTab === "contato"
              ? "bg-am-magenta text-white shadow-magenta-sm"
              : "bg-white text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 border border-zinc-200"
          }`}
        >
          <Phone size={17} />
          <span>Canais de Atendimento & Redes</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("politicas")}
          className={`px-5 py-3 rounded-2xl text-sm font-black transition-all whitespace-nowrap flex items-center gap-2.5 shadow-2xs ${
            activeSubTab === "politicas"
              ? "bg-am-magenta text-white shadow-magenta-sm"
              : "bg-white text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 border border-zinc-200"
          }`}
        >
          <Sparkles size={17} />
          <span>Políticas da Fábrica</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("geral")}
          className={`px-5 py-3 rounded-2xl text-sm font-black transition-all whitespace-nowrap flex items-center gap-2.5 shadow-2xs ${
            activeSubTab === "geral"
              ? "bg-am-magenta text-white shadow-magenta-sm"
              : "bg-white text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 border border-zinc-200"
          }`}
        >
          <Building2 size={17} />
          <span>Informações Gerais</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("comercial")}
          className={`px-5 py-3 rounded-2xl text-sm font-black transition-all whitespace-nowrap flex items-center gap-2.5 shadow-2xs ${
            activeSubTab === "comercial"
              ? "bg-am-magenta text-white shadow-magenta-sm"
              : "bg-white text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 border border-zinc-200"
          }`}
        >
          <DollarSign size={17} />
          <span>Regras Comerciais & Atacado</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* ============================================================== */}
        {/* SUBTAB: CANAIS DE ATENDIMENTO ORGANIZADOS UM ABAIXO DO OUTRO    */}
        {/* ============================================================== */}
        {activeSubTab === "contato" && (
          <div className="space-y-6">
            
            {/* Header explicativo do bloco */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-2xs space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-am-magenta/10 text-am-magenta flex items-center justify-center">
                  <Phone size={20} />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-zinc-950">
                    Canais de Atendimento Oficiais (Clientes)
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-500">
                    Gerencie o WhatsApp, Instagram, Shopee e Mercado Livre. Desative qualquer canal ao lado para que ele fique <strong>ofuscado e indisponível</strong> na visualização do cliente.
                  </p>
                </div>
              </div>
            </div>

            {/* LISTA ORGANIZADA UM ABAIXO DO OUTRO */}
            <div className="space-y-4">
              
              {/* 1. WHATSAPP */}
              {(() => {
                const isActive = formData.channelsStatus?.whatsappActive ?? true;
                return (
                  <div className={`bg-white rounded-3xl p-6 sm:p-7 border transition-all ${
                    isActive 
                      ? "border-emerald-200 shadow-sm" 
                      : "border-zinc-300 bg-zinc-50/70 opacity-80"
                  }`}>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                      
                      {/* Lado Esquerdo: Identificação do Canal */}
                      <div className="flex items-start sm:items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform ${
                          isActive 
                            ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20" 
                            : "bg-zinc-300 text-zinc-600 grayscale"
                        }`}>
                          <MessageCircle size={28} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2.5">
                            <h3 className="font-black text-base sm:text-lg text-zinc-950">
                              WhatsApp de Vendas & Atendimento
                            </h3>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider ${
                              isActive 
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-300" 
                                : "bg-zinc-200 text-zinc-600 border border-zinc-300"
                            }`}>
                              {isActive ? "● Ativo no Site" : "○ Ofuscado / Inativo"}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                            Canal direto onde os clientes enviam dúvidas e finalizam pedidos da sacola.
                          </p>
                        </div>
                      </div>

                      {/* Botão de Toggle Ativar/Desativar */}
                      <button
                        type="button"
                        onClick={() => toggleChannelActive("whatsappActive")}
                        className={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-sm active:scale-95 shrink-0 ${
                          isActive
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                            : "bg-zinc-800 hover:bg-zinc-900 text-white"
                        }`}
                      >
                        {isActive ? <Eye size={18} /> : <EyeOff size={18} />}
                        <span>{isActive ? "Canal Ativo (Clique p/ Ofuscar)" : "Canal Ofuscado (Clique p/ Ativar)"}</span>
                      </button>
                    </div>

                    {/* Inputs de Configuração */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-5 border-t border-zinc-100">
                      <div>
                        <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                          Número Oficial (DDI + DDD + Telefone)
                        </label>
                        <input
                          type="text"
                          value={formData.contact.whatsappNumber}
                          onChange={(e) => handleChange("contact", "whatsappNumber", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-am-magenta focus:outline-none text-sm font-mono text-zinc-900 bg-white"
                          placeholder="5511999999999"
                        />
                        <span className="text-[11px] text-zinc-400 mt-1 block">
                          Número que recebe as mensagens diretas de pedidos.
                        </span>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                          Formato Visual Exibido no Site
                        </label>
                        <input
                          type="text"
                          value={formData.contact.whatsappFormatted}
                          onChange={(e) => handleChange("contact", "whatsappFormatted", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-am-magenta focus:outline-none text-sm font-mono text-zinc-900 bg-white"
                          placeholder="(11) 99999-9999"
                        />
                        <span className="text-[11px] text-zinc-400 mt-1 block">
                          Como o cliente verá o número no card e no rodapé.
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
                  <div className={`bg-white rounded-3xl p-6 sm:p-7 border transition-all ${
                    isActive 
                      ? "border-pink-200 shadow-sm" 
                      : "border-zinc-300 bg-zinc-50/70 opacity-80"
                  }`}>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                      
                      {/* Lado Esquerdo */}
                      <div className="flex items-start sm:items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform ${
                          isActive 
                            ? "bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white shadow-md shadow-rose-500/20" 
                            : "bg-zinc-300 text-zinc-600 grayscale"
                        }`}>
                          <Instagram size={28} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2.5">
                            <h3 className="font-black text-base sm:text-lg text-zinc-950">
                              Instagram Oficial da Marca
                            </h3>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider ${
                              isActive 
                                ? "bg-pink-100 text-pink-800 border border-pink-300" 
                                : "bg-zinc-200 text-zinc-600 border border-zinc-300"
                            }`}>
                              {isActive ? "● Ativo no Site" : "○ Ofuscado / Inativo"}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                            Perfil com provadores, stories, novidades e engajamento das revendedoras.
                          </p>
                        </div>
                      </div>

                      {/* Botão de Toggle */}
                      <button
                        type="button"
                        onClick={() => toggleChannelActive("instagramActive")}
                        className={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-sm active:scale-95 shrink-0 ${
                          isActive
                            ? "bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white"
                            : "bg-zinc-800 hover:bg-zinc-900 text-white"
                        }`}
                      >
                        {isActive ? <Eye size={18} /> : <EyeOff size={18} />}
                        <span>{isActive ? "Canal Ativo (Clique p/ Ofuscar)" : "Canal Ofuscado (Clique p/ Ativar)"}</span>
                      </button>
                    </div>

                    {/* Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-5 border-t border-zinc-100">
                      <div>
                        <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                          @ Nome de Usuário (Instagram)
                        </label>
                        <input
                          type="text"
                          value={formData.social.instagram}
                          onChange={(e) => handleChange("social", "instagram", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-am-magenta focus:outline-none text-sm text-zinc-900 bg-white"
                          placeholder="@amfit.oficial"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                          Link Direto do Perfil (URL)
                        </label>
                        <input
                          type="url"
                          value={formData.social.instagramUrl}
                          onChange={(e) => handleChange("social", "instagramUrl", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-am-magenta focus:outline-none text-sm text-zinc-900 bg-white"
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
                  <div className={`bg-white rounded-3xl p-6 sm:p-7 border transition-all ${
                    isActive 
                      ? "border-orange-200 shadow-sm" 
                      : "border-zinc-300 bg-zinc-50/70 opacity-80"
                  }`}>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                      
                      {/* Lado Esquerdo */}
                      <div className="flex items-start sm:items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform ${
                          isActive 
                            ? "bg-[#ee4d2d] text-white shadow-md shadow-orange-500/20" 
                            : "bg-zinc-300 text-zinc-600 grayscale"
                        }`}>
                          <ShoppingBag size={28} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2.5">
                            <h3 className="font-black text-base sm:text-lg text-zinc-950">
                              Loja Oficial na Shopee
                            </h3>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider ${
                              isActive 
                                ? "bg-orange-100 text-orange-800 border border-orange-300" 
                                : "bg-zinc-200 text-zinc-600 border border-zinc-300"
                            }`}>
                              {isActive ? "● Ativo no Site" : "○ Ofuscado / Inativo"}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                            Canal para clientes que preferem comprar via Shopee aproveitando cupons de frete.
                          </p>
                        </div>
                      </div>

                      {/* Botão de Toggle */}
                      <button
                        type="button"
                        onClick={() => toggleChannelActive("shopeeActive")}
                        className={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-sm active:scale-95 shrink-0 ${
                          isActive
                            ? "bg-[#ee4d2d] hover:bg-[#d73f20] text-white"
                            : "bg-zinc-800 hover:bg-zinc-900 text-white"
                        }`}
                      >
                        {isActive ? <Eye size={18} /> : <EyeOff size={18} />}
                        <span>{isActive ? "Canal Ativo (Clique p/ Ofuscar)" : "Canal Ofuscado (Clique p/ Ativar)"}</span>
                      </button>
                    </div>

                    {/* Inputs */}
                    <div className="mt-6 pt-5 border-t border-zinc-100">
                      <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                        Link Direto da Loja na Shopee (URL)
                      </label>
                      <input
                        type="url"
                        value={formData.social.shopeeUrl}
                        onChange={(e) => handleChange("social", "shopeeUrl", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-am-magenta focus:outline-none text-sm text-zinc-900 bg-white"
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
                  <div className={`bg-white rounded-3xl p-6 sm:p-7 border transition-all ${
                    isActive 
                      ? "border-yellow-300 shadow-sm" 
                      : "border-zinc-300 bg-zinc-50/70 opacity-80"
                  }`}>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                      
                      {/* Lado Esquerdo */}
                      <div className="flex items-start sm:items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform ${
                          isActive 
                            ? "bg-[#ffe600] text-zinc-950 shadow-md shadow-yellow-500/20" 
                            : "bg-zinc-300 text-zinc-600 grayscale"
                        }`}>
                          <Package size={28} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2.5">
                            <h3 className="font-black text-base sm:text-lg text-zinc-950">
                              Loja Oficial no Mercado Livre
                            </h3>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider ${
                              isActive 
                                ? "bg-yellow-100 text-amber-900 border border-yellow-300" 
                                : "bg-zinc-200 text-zinc-600 border border-zinc-300"
                            }`}>
                              {isActive ? "● Ativo no Site" : "○ Ofuscado / Inativo"}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                            Canal com estoque Full, envio imediato e compra garantida.
                          </p>
                        </div>
                      </div>

                      {/* Botão de Toggle */}
                      <button
                        type="button"
                        onClick={() => toggleChannelActive("mercadoLivreActive")}
                        className={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-sm active:scale-95 shrink-0 ${
                          isActive
                            ? "bg-zinc-900 hover:bg-black text-[#ffe600]"
                            : "bg-zinc-800 hover:bg-zinc-900 text-white"
                        }`}
                      >
                        {isActive ? <Eye size={18} /> : <EyeOff size={18} />}
                        <span>{isActive ? "Canal Ativo (Clique p/ Ofuscar)" : "Canal Ofuscado (Clique p/ Ativar)"}</span>
                      </button>
                    </div>

                    {/* Inputs */}
                    <div className="mt-6 pt-5 border-t border-zinc-100">
                      <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                        Link Direto da Loja no Mercado Livre (URL)
                      </label>
                      <input
                        type="url"
                        value={formData.social.mercadoLivreUrl}
                        onChange={(e) => handleChange("social", "mercadoLivreUrl", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-am-magenta focus:outline-none text-sm text-zinc-900 bg-white"
                        placeholder="https://www.mercadolivre.com.br/pagina/amfit"
                      />
                    </div>
                  </div>
                );
              })()}

            </div>

            {/* Bloco Adicional: E-mails e Endereço Físico */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-2xs space-y-6">
              <h3 className="text-base font-black text-zinc-950 uppercase tracking-wide border-b border-zinc-100 pb-3">
                E-mails Corporativos & Polo Fabril
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                    E-mail Institucional Geral
                  </label>
                  <input
                    type="email"
                    value={formData.contact.email}
                    onChange={(e) => handleChange("contact", "email", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-am-magenta focus:outline-none text-sm text-zinc-900 bg-white"
                    placeholder="contato@amfitatacado.com.br"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                    E-mail Comercial / Vendas
                  </label>
                  <input
                    type="email"
                    value={formData.contact.salesEmail}
                    onChange={(e) => handleChange("contact", "salesEmail", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-am-magenta focus:outline-none text-sm text-zinc-900 bg-white"
                    placeholder="vendas@amfitatacado.com.br"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                    Endereço Completo da Fábrica / Showroom
                  </label>
                  <input
                    type="text"
                    value={formData.address.fullAddress}
                    onChange={(e) => handleChange("address", "fullAddress", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-am-magenta focus:outline-none text-sm text-zinc-900 bg-white"
                    placeholder="Polo de Confecção - Brás / Bom Retiro - São Paulo, SP"
                  />
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* SUBTAB: POLÍTICAS DA FÁBRICA                                   */}
        {/* ============================================================== */}
        {activeSubTab === "politicas" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-2xs space-y-6">
            <div className="border-b border-zinc-100 pb-4">
              <h2 className="text-lg sm:text-xl font-black text-zinc-950 uppercase tracking-wide flex items-center gap-2">
                <Sparkles size={20} className="text-am-magenta" />
                <span>Políticas Oficiais da Fábrica & Garantias</span>
              </h2>
              <p className="text-sm text-zinc-500 mt-1">
                Textos apresentados na seção de atendimento, rodapé e nos detalhes dos produtos sobre confecção própria e segurança.
              </p>
            </div>

            <div className="space-y-6">
              {/* Fábrica & Origem */}
              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2.5">
                <div className="flex items-center gap-2 text-sm font-black text-zinc-900 uppercase">
                  <MapPin size={18} className="text-am-magenta" />
                  <span>1. Origem & Polo Têxtil (Confecção Própria)</span>
                </div>
                <textarea
                  rows={3}
                  value={formData.policies.factoryOrigin}
                  onChange={(e) => handleChange("policies", "factoryOrigin", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-am-magenta focus:outline-none text-sm text-zinc-900 bg-white resize-none"
                  placeholder="Descreva a confecção própria, polo fabril e capacidade de envio..."
                />
                <span className="text-xs text-zinc-500">
                  Exibido no card "Origem & Polo Têxtil" na página principal e no rodapé.
                </span>
              </div>

              {/* Regra de Atacado & Grade */}
              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2.5">
                <div className="flex items-center gap-2 text-sm font-black text-zinc-900 uppercase">
                  <ShoppingBag size={18} className="text-am-magenta" />
                  <span>2. Regras de Atacado & Montagem de Grade</span>
                </div>
                <textarea
                  rows={3}
                  value={formData.policies.wholesaleRule}
                  onChange={(e) => handleChange("policies", "wholesaleRule", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-am-magenta focus:outline-none text-sm text-zinc-900 bg-white resize-none"
                  placeholder="Descreva as condições de atacado, pedido mínimo e liberdade de grade..."
                />
                <span className="text-xs text-zinc-500">
                  Exibido nos informativos da página de detalhes do produto e sacola de compras.
                </span>
              </div>

              {/* Garantia & 1ª Troca */}
              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2.5">
                <div className="flex items-center gap-2 text-sm font-black text-zinc-900 uppercase">
                  <ShieldCheck size={18} className="text-emerald-600" />
                  <span>3. Política de Garantia Zero Transparência & 1ª Troca</span>
                </div>
                <textarea
                  rows={3}
                  value={formData.policies.warrantyAndExchange}
                  onChange={(e) => handleChange("policies", "warrantyAndExchange", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-am-magenta focus:outline-none text-sm text-zinc-900 bg-white resize-none"
                  placeholder="Garantia de zero transparência, política de devolução e troca por defeito..."
                />
                <span className="text-xs text-zinc-500">
                  Transmite segurança ao revendedor e ao cliente final.
                </span>
              </div>

              {/* Política de Envio & Rastreio */}
              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2.5">
                <div className="flex items-center gap-2 text-sm font-black text-zinc-900 uppercase">
                  <Truck size={18} className="text-am-magenta" />
                  <span>4. Política de Despacho & Prazos de Envio</span>
                </div>
                <textarea
                  rows={3}
                  value={formData.policies.shippingPolicy}
                  onChange={(e) => handleChange("policies", "shippingPolicy", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-am-magenta focus:outline-none text-sm text-zinc-900 bg-white resize-none"
                  placeholder="Prazo para despacho após pagamento, envio via Correios / transportadoras..."
                />
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* SUBTAB: INFORMAÇÕES GERAIS                                     */}
        {/* ============================================================== */}
        {activeSubTab === "geral" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-2xs space-y-6">
            <div className="border-b border-zinc-100 pb-4">
              <h2 className="text-lg sm:text-xl font-black text-zinc-950 uppercase tracking-wide">
                Identidade Institucional da Loja
              </h2>
              <p className="text-sm text-zinc-500 mt-1">
                Nome da marca, slogans e chamadas de topo exibidas para os clientes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                  Nome da Marca (Fantasia)
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleSimpleChange("name", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-am-magenta focus:outline-none text-sm text-zinc-900 bg-white"
                  placeholder="Ex: AM FIT"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                  Razão Social / Nome Comercial
                </label>
                <input
                  type="text"
                  value={formData.tradeName}
                  onChange={(e) => handleSimpleChange("tradeName", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-am-magenta focus:outline-none text-sm text-zinc-900 bg-white"
                  placeholder="Ex: AM FIT Atacado & Varejo"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                  Slogan Oficial (Tagline Principal)
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => handleSimpleChange("tagline", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-am-magenta focus:outline-none text-sm text-zinc-900 bg-white font-medium"
                  placeholder="Ex: Lucre 100% com nossos produtos | Atacado Preço de fábrica"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                  Texto da Barra Superior de Anúncios (Topo do Site)
                </label>
                <input
                  type="text"
                  value={formData.policies.announcementBarText}
                  onChange={(e) => handleChange("policies", "announcementBarText", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-am-magenta focus:outline-none text-sm text-zinc-900 bg-white"
                  placeholder="Ex: ✨ Lucre 100% com nossos produtos | 📦 Atacado Preço de fábrica"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                  Domínio Oficial do Site
                </label>
                <input
                  type="text"
                  value={formData.domain}
                  onChange={(e) => handleSimpleChange("domain", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-am-magenta focus:outline-none text-sm text-zinc-900 bg-white"
                  placeholder="Ex: amfitatacado.com.br"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                  Horário de Atendimento da Loja
                </label>
                <input
                  type="text"
                  value={formData.contact.hours}
                  onChange={(e) => handleChange("contact", "hours", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-am-magenta focus:outline-none text-sm text-zinc-900 bg-white"
                  placeholder="Segunda a Sexta: 08:00 às 18:00 | Sábados: 09:00 às 13:00"
                />
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* SUBTAB: REGRAS COMERCIAIS & ATACADO                            */}
        {/* ============================================================== */}
        {activeSubTab === "comercial" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-2xs space-y-6">
            <div className="border-b border-zinc-100 pb-4">
              <h2 className="text-lg sm:text-xl font-black text-zinc-950 uppercase tracking-wide flex items-center gap-2">
                <DollarSign size={20} className="text-emerald-600" />
                <span>Condições Comerciais, Mínimos & Descontos</span>
              </h2>
              <p className="text-sm text-zinc-500 mt-1">
                Defina valores numéricos de pedido mínimo, parcelamento e regras automáticas de validação.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                  Pedido Mínimo no Atacado (R$)
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
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-zinc-300 focus:border-am-magenta focus:outline-none text-sm font-black text-zinc-900 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                  Quantidade Mínima de Peças (Atacado)
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.commercial.minWholesalePieces}
                  onChange={(e) => handleChange("commercial", "minWholesalePieces", Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-am-magenta focus:outline-none text-sm font-black text-zinc-900 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                  Frete Grátis Varejo a partir de (R$)
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
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-zinc-300 focus:border-am-magenta focus:outline-none text-sm font-black text-zinc-900 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                  Desconto no PIX (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={formData.commercial.pixDiscountPercentage}
                    onChange={(e) => handleChange("commercial", "pixDiscountPercentage", Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-am-magenta focus:outline-none text-sm font-black text-zinc-900 bg-white"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-zinc-400">
                    %
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-800 mb-1.5">
                  Máximo de Parcelas sem Juros
                </label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={formData.commercial.maxInstallments}
                  onChange={(e) => handleChange("commercial", "maxInstallments", Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-am-magenta focus:outline-none text-sm font-black text-zinc-900 bg-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* Botão de Salvar no Rodapé com Tamanho Ampliado */}
        <div className="pt-6 border-t border-zinc-200 flex items-center justify-end gap-4">
          <button
            type="submit"
            className="w-full sm:w-auto px-10 py-4.5 rounded-2xl bg-gradient-to-r from-am-magenta to-pink-600 hover:from-pink-600 hover:to-am-magenta text-white text-sm sm:text-base font-black uppercase tracking-wider flex items-center justify-center gap-3 transition-all shadow-magenta transform active:scale-98"
          >
            {savedSuccess ? <Check size={22} /> : <Save size={22} />}
            <span>{savedSuccess ? "Configurações Salvas com Sucesso!" : "Salvar Configurações da Loja"}</span>
          </button>
        </div>

      </form>
    </div>
  );
};
