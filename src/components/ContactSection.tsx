"use client";

import React from "react";
import { 
  Phone, 
  Mail, 
  Clock, 
  MapPin, 
  Instagram, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  ExternalLink,
  MessageCircle,
  Package,
  Headphones,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { getWhatsAppLink } from "@/config/store";
import { useAdmin } from "@/context/AdminContext";

export const ContactSection: React.FC = () => {
  const { storeConfig } = useAdmin();
  return (
    <section id="contato" className="py-12 sm:py-16 bg-zinc-50/70 border-t border-am-gray-200">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-am-magenta-light border border-am-magenta-border text-am-magenta font-extrabold text-xs tracking-wider uppercase mb-2">
            <Headphones size={14} />
            Canais Oficiais & Suporte
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-am-black tracking-tight uppercase">
            ATENDIMENTO & INFORMAÇÕES DA LOJA
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-2 max-w-xl mx-auto">
            Fale diretamente com a equipe de fábrica ou acesse nossos canais de compra e redes oficiais.
          </p>
        </div>

        {/* 1. Canais Oficiais de Acesso (WhatsApp, Instagram, Shopee, Mercado Livre) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-12">
          
          {/* Card WhatsApp */}
          {(() => {
            const isActive = storeConfig.channelsStatus?.whatsappActive ?? true;
            return (
              <div className={`rounded-2xl p-5 sm:p-6 transition-all flex flex-col justify-between group relative overflow-hidden ${
                !isActive 
                  ? "bg-zinc-100/90 border-2 border-dashed border-zinc-300 opacity-50 grayscale select-none pointer-events-none cursor-not-allowed" 
                  : "bg-white border border-zinc-200 shadow-xs hover:shadow-md"
              }`}>
                {!isActive && (
                  <div className="absolute top-2 right-2 z-20">
                    <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-zinc-600 bg-zinc-200/90 px-2 py-0.5 rounded-md border border-zinc-300">
                      Pausado
                    </span>
                  </div>
                )}
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                      <MessageCircle size={24} />
                    </div>
                    {isActive ? (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Online
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-zinc-500 bg-zinc-200 px-2.5 py-0.5 rounded-full border border-zinc-300">
                        Indisponível
                      </span>
                    )}
                  </div>
                  <h3 className="font-black text-base text-zinc-900 mb-1">WhatsApp Oficial</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                    {isActive 
                      ? "Atendimento direto com vendedoras para pedidos de atacado, varejo e dúvidas rápidas."
                      : "Canal temporariamente indisponível para atendimento."}
                  </p>
                  <div className="text-xs font-bold text-zinc-800 bg-zinc-50 px-3 py-2 rounded-lg border border-zinc-200 mb-4 font-mono">
                    {storeConfig.contact.whatsappFormatted}
                  </div>
                </div>
                {isActive ? (
                  <a
                    href={getWhatsAppLink("Olá! Gostaria de falar com o atendimento da AM FIT.", storeConfig.contact.whatsappNumber)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98"
                  >
                    <span>Chamar no WhatsApp</span>
                    <ExternalLink size={14} />
                  </a>
                ) : (
                  <div className="w-full py-3 px-4 bg-zinc-200 text-zinc-500 rounded-xl font-bold text-xs uppercase tracking-wider text-center pointer-events-none cursor-not-allowed select-none border border-zinc-300">
                    Indisponível no Momento
                  </div>
                )}
              </div>
            );
          })()}

          {/* Card Instagram */}
          {(() => {
            const isActive = storeConfig.channelsStatus?.instagramActive ?? true;
            return (
              <div className={`rounded-2xl p-5 sm:p-6 transition-all flex flex-col justify-between group relative overflow-hidden ${
                !isActive 
                  ? "bg-zinc-100/90 border-2 border-dashed border-zinc-300 opacity-50 grayscale select-none pointer-events-none cursor-not-allowed" 
                  : "bg-white border border-zinc-200 shadow-xs hover:shadow-md"
              }`}>
                {!isActive && (
                  <div className="absolute top-2 right-2 z-20">
                    <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-zinc-600 bg-zinc-200/90 px-2 py-0.5 rounded-md border border-zinc-300">
                      Pausado
                    </span>
                  </div>
                )}
                <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/10 rounded-full blur-xl pointer-events-none" />
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
                      <Instagram size={24} />
                    </div>
                    {isActive ? (
                      <span className="inline-flex items-center text-[11px] font-bold text-pink-700 bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-200">
                        Bastidores & Moda
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-[11px] font-bold text-zinc-500 bg-zinc-200 px-2.5 py-0.5 rounded-full border border-zinc-300">
                        Indisponível
                      </span>
                    )}
                  </div>
                  <h3 className="font-black text-base text-zinc-900 mb-1">Instagram Oficial</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                    {isActive 
                      ? "Acompanhe provadores, lançamentos semanais, vídeos das peças e dicas de revenda."
                      : "Canal temporariamente indisponível."}
                  </p>
                  <div className="text-xs font-bold text-pink-700 bg-pink-50/60 px-3 py-2 rounded-lg border border-pink-200 mb-4 font-mono">
                    {storeConfig.social.instagram}
                  </div>
                </div>
                {isActive ? (
                  <a
                    href={storeConfig.social.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98"
                  >
                    <span>Acessar Instagram</span>
                    <ExternalLink size={14} />
                  </a>
                ) : (
                  <div className="w-full py-3 px-4 bg-zinc-200 text-zinc-500 rounded-xl font-bold text-xs uppercase tracking-wider text-center pointer-events-none cursor-not-allowed select-none border border-zinc-300">
                    Indisponível no Momento
                  </div>
                )}
              </div>
            );
          })()}

          {/* Card Shopee */}
          {(() => {
            const isActive = storeConfig.channelsStatus?.shopeeActive ?? true;
            return (
              <div className={`rounded-2xl p-5 sm:p-6 transition-all flex flex-col justify-between group relative overflow-hidden ${
                !isActive 
                  ? "bg-zinc-100/90 border-2 border-dashed border-zinc-300 opacity-50 grayscale select-none pointer-events-none cursor-not-allowed" 
                  : "bg-white border border-zinc-200 shadow-xs hover:shadow-md"
              }`}>
                {!isActive && (
                  <div className="absolute top-2 right-2 z-20">
                    <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-zinc-600 bg-zinc-200/90 px-2 py-0.5 rounded-md border border-zinc-300">
                      Pausado
                    </span>
                  </div>
                )}
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-xl pointer-events-none" />
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#ee4d2d] text-white flex items-center justify-center shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                      <ShoppingBag size={24} />
                    </div>
                    {isActive ? (
                      <span className="inline-flex items-center text-[11px] font-bold text-orange-700 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                        Frete & Ofertas
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-[11px] font-bold text-zinc-500 bg-zinc-200 px-2.5 py-0.5 rounded-full border border-zinc-300">
                        Indisponível
                      </span>
                    )}
                  </div>
                  <h3 className="font-black text-base text-zinc-900 mb-1">Shopee Oficial</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                    {isActive
                      ? "Compre no varejo com condições especiais da plataforma e milhares de avaliações 5 estrelas."
                      : "Canal temporariamente indisponível."}
                  </p>
                  <div className="text-xs font-bold text-orange-700 bg-orange-50/60 px-3 py-2 rounded-lg border border-orange-200 mb-4">
                    {isActive ? "Loja Oficial Verificada" : "Vendas Pausadas"}
                  </div>
                </div>
                {isActive ? (
                  <a
                    href={storeConfig.social.shopeeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 bg-[#ee4d2d] hover:bg-[#d73f20] text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98"
                  >
                    <span>Ver Loja na Shopee</span>
                    <ExternalLink size={14} />
                  </a>
                ) : (
                  <div className="w-full py-3 px-4 bg-zinc-200 text-zinc-500 rounded-xl font-bold text-xs uppercase tracking-wider text-center pointer-events-none cursor-not-allowed select-none border border-zinc-300">
                    Indisponível no Momento
                  </div>
                )}
              </div>
            );
          })()}

          {/* Card Mercado Livre */}
          {(() => {
            const isActive = storeConfig.channelsStatus?.mercadoLivreActive ?? true;
            return (
              <div className={`rounded-2xl p-5 sm:p-6 transition-all flex flex-col justify-between group relative overflow-hidden ${
                !isActive 
                  ? "bg-zinc-100/90 border-2 border-dashed border-zinc-300 opacity-50 grayscale select-none pointer-events-none cursor-not-allowed" 
                  : "bg-white border border-zinc-200 shadow-xs hover:shadow-md"
              }`}>
                {!isActive && (
                  <div className="absolute top-2 right-2 z-20">
                    <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-zinc-600 bg-zinc-200/90 px-2 py-0.5 rounded-md border border-zinc-300">
                      Pausado
                    </span>
                  </div>
                )}
                <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 rounded-full blur-xl pointer-events-none" />
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#ffe600] text-zinc-900 flex items-center justify-center shadow-md shadow-yellow-500/20 group-hover:scale-105 transition-transform">
                      <Package size={24} />
                    </div>
                    {isActive ? (
                      <span className="inline-flex items-center text-[11px] font-bold text-amber-800 bg-yellow-50 px-2.5 py-0.5 rounded-full border border-yellow-200">
                        Entrega Full
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-[11px] font-bold text-zinc-500 bg-zinc-200 px-2.5 py-0.5 rounded-full border border-zinc-300">
                        Indisponível
                      </span>
                    )}
                  </div>
                  <h3 className="font-black text-base text-zinc-900 mb-1">Mercado Livre</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                    {isActive
                      ? "Envio imediato, garantia total de entrega e compra garantida com Mercado Pago."
                      : "Canal temporariamente indisponível."}
                  </p>
                  <div className="text-xs font-bold text-zinc-800 bg-yellow-50/60 px-3 py-2 rounded-lg border border-yellow-200 mb-4">
                    {isActive ? "Mercado Líder Oficial" : "Vendas Pausadas"}
                  </div>
                </div>
                {isActive ? (
                  <a
                    href={storeConfig.social.mercadoLivreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 bg-zinc-900 hover:bg-black text-[#ffe600] rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98"
                  >
                    <span>Ver Loja no Mercado Livre</span>
                    <ExternalLink size={14} />
                  </a>
                ) : (
                  <div className="w-full py-3 px-4 bg-zinc-200 text-zinc-500 rounded-xl font-bold text-xs uppercase tracking-wider text-center pointer-events-none cursor-not-allowed select-none border border-zinc-300">
                    Indisponível no Momento
                  </div>
                )}
              </div>
            );
          })()}

        </div>

        {/* 2. Informações Gerais da Loja & Estrutura Expandida */}
        <div className="bg-white rounded-3xl p-5 sm:p-8 lg:p-10 border border-zinc-200/90 shadow-sm">
          
          {/* Header do Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 sm:pb-5 mb-5 sm:mb-6 border-b border-zinc-100 gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-pink-50 text-am-magenta flex items-center justify-center shrink-0">
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className="font-black text-base sm:text-xl text-zinc-900 uppercase tracking-tight leading-tight">
                  Informações Gerais & Políticas da Fábrica
                </h3>
                <p className="text-[11px] sm:text-xs text-zinc-500 font-medium">
                  Transparência, garantias e canais institucionais oficiais
                </p>
              </div>
            </div>
            
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold text-zinc-600 bg-zinc-100 px-3 py-1 rounded-full border border-zinc-200/60 self-start sm:self-auto">
              <ShieldCheck size={13} className="text-emerald-600" />
              <span>Direto da Confecção</span>
            </span>
          </div>

          {/* Cards de Políticas e Informações */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
            
            {/* 1. Horário de Atendimento */}
            <div className="p-4 rounded-2xl bg-zinc-50/80 border border-zinc-100/90 hover:border-am-magenta/30 transition-all flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white text-am-magenta shadow-2xs border border-zinc-200/80 flex items-center justify-center shrink-0">
                <Clock size={19} />
              </div>
              <div className="space-y-1 min-w-0">
                <h4 className="font-black text-xs sm:text-sm text-zinc-900 leading-tight">Horário de Atendimento</h4>
                <p className="text-[11px] sm:text-xs text-zinc-600 leading-relaxed">
                  {storeConfig.contact.hours}
                </p>
              </div>
            </div>

            {/* 2. Fábrica & Envio */}
            <div className="p-4 rounded-2xl bg-zinc-50/80 border border-zinc-100/90 hover:border-am-magenta/30 transition-all flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-am-magenta-light text-am-magenta shadow-2xs border border-am-magenta-border flex items-center justify-center shrink-0">
                <MapPin size={19} />
              </div>
              <div className="space-y-1 min-w-0">
                <h4 className="font-black text-xs sm:text-sm text-zinc-900 leading-tight">Origem & Polo Têxtil</h4>
                <p className="text-[11px] sm:text-xs text-zinc-600 leading-relaxed">
                  {storeConfig.policies.factoryOrigin}
                </p>
              </div>
            </div>

            {/* 3. Contato Institucional & E-mail */}
            <div className="p-4 rounded-2xl bg-zinc-50/80 border border-zinc-100/90 hover:border-am-magenta/30 transition-all flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white text-am-magenta shadow-2xs border border-zinc-200/80 flex items-center justify-center shrink-0">
                <Mail size={19} />
              </div>
              <div className="space-y-1 min-w-0">
                <h4 className="font-black text-xs sm:text-sm text-zinc-900 leading-tight">E-mail Comercial</h4>
                <div className="text-[11px] sm:text-xs text-zinc-600 leading-relaxed truncate">
                  <a 
                    href={`mailto:${storeConfig.contact.email}`} 
                    className="font-bold text-am-magenta hover:underline block truncate"
                  >
                    {storeConfig.contact.email}
                  </a>
                  {storeConfig.contact.salesEmail && (
                    <span className="text-zinc-500 block text-[10px] sm:text-[11px] truncate mt-0.5">
                      Vendas: {storeConfig.contact.salesEmail}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* 4. Garantia & 1ª Troca */}
            <div className="p-4 rounded-2xl bg-zinc-50/80 border border-zinc-100/90 hover:border-am-magenta/30 transition-all flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 shadow-2xs border border-emerald-200/80 flex items-center justify-center shrink-0">
                <ShieldCheck size={19} />
              </div>
              <div className="space-y-1 min-w-0">
                <h4 className="font-black text-xs sm:text-sm text-zinc-900 leading-tight">Garantia & 1ª Troca</h4>
                <p className="text-[11px] sm:text-xs text-zinc-600 leading-relaxed">
                  {storeConfig.policies.warrantyAndExchange}
                </p>
              </div>
            </div>

          </div>

          {/* Faixa inferior de confiança - Badges responsivos */}
          <div className="mt-5 sm:mt-7 pt-4 sm:pt-5 border-t border-zinc-100 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-50/60 border border-zinc-200/60">
              <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
              <span className="text-[11px] font-bold text-zinc-700 leading-tight">Fabricação 100% Própria</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-50/60 border border-zinc-200/60">
              <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
              <span className="text-[11px] font-bold text-zinc-700 leading-tight">Sem Intermediários</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-50/60 border border-zinc-200/60">
              <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
              <span className="text-[11px] font-bold text-zinc-700 leading-tight">Envio 100% Rastreado</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-50/60 border border-zinc-200/60">
              <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
              <span className="text-[11px] font-bold text-zinc-700 leading-tight">Qualidade Premium</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
