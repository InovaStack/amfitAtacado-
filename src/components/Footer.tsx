"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Instagram, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Truck, 
  ChevronRight, 
  ExternalLink, 
  Sparkles, 
  ShoppingBag, 
  Package, 
  MessageCircle,
  QrCode
} from "lucide-react";
import { getWhatsAppLink } from "@/config/store";
import { useAdmin } from "@/context/AdminContext";

export const Footer: React.FC = () => {
  const { storeConfig } = useAdmin();

  return (
    <footer className="bg-zinc-950 text-white pt-8 sm:pt-12 pb-24 sm:pb-10 border-t border-zinc-800/90 relative overflow-hidden">
      
      {/* Brilho decorativo sutil de fundo */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-am-magenta/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10">
        
        {/* ========================================================= */}
        {/* MAIN FOOTER GRID                                          */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-8 sm:pb-10 border-b border-zinc-800/80">
          
          {/* 1. Brand Column (Logo, Descrição, Redes) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative w-36 h-11 sm:w-40 sm:h-12 bg-black rounded-xl p-1.5 border border-zinc-800 flex items-center justify-center hover:border-am-magenta/40 transition-colors shadow-xs">
                <Image
                  src="/logo.jpg"
                  alt="AM FIT Logo"
                  fill
                  sizes="160px"
                  className="object-contain"
                />
              </div>
            </Link>

            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              Confecção própria especializada em moda fitness feminina premium com alta compressão e Zero Transparência. Preço de fábrica para atacado e compra avulsa no varejo.
            </p>

            {/* Redes Sociais com botões táteis modernos */}
            <div className="flex items-center gap-2 pt-1">
              {storeConfig.channelsStatus?.whatsappActive !== false && (
                <a
                  href={getWhatsAppLink("Olá! Gostaria de falar com o time da AM FIT.", storeConfig.contact.whatsappNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 px-3 rounded-xl bg-zinc-900 hover:bg-emerald-600 text-zinc-300 hover:text-white flex items-center gap-1.5 text-xs font-bold transition-all border border-zinc-800 shadow-xs"
                  aria-label="WhatsApp AM FIT"
                >
                  <MessageCircle size={15} className="text-emerald-400" />
                  <span className="text-[11px]">WhatsApp</span>
                </a>
              )}

              {storeConfig.channelsStatus?.instagramActive !== false && (
                <a
                  href={storeConfig.social.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-zinc-900 hover:bg-am-magenta text-zinc-300 hover:text-white flex items-center justify-center transition-colors border border-zinc-800 shadow-xs"
                  aria-label="Instagram AM FIT"
                  title={`Instagram ${storeConfig.social.instagram}`}
                >
                  <Instagram size={16} />
                </a>
              )}

              <a
                href={`mailto:${storeConfig.contact.email}`}
                className="w-9 h-9 rounded-xl bg-zinc-900 hover:bg-am-magenta text-zinc-300 hover:text-white flex items-center justify-center transition-colors border border-zinc-800 shadow-xs"
                aria-label="E-mail AM FIT"
                title="E-mail Comercial"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* 2 e 3: Links no Mobile divididos em 2 Colunas simétricas (Navegação & Canais) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 sm:gap-6">
            
            {/* Navegação Rápida */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-white uppercase tracking-wider text-am-magenta flex items-center gap-1.5">
                <span>Navegação</span>
              </h4>
              <ul className="space-y-2 text-xs text-zinc-400 font-medium">
                <li>
                  <Link href="/" className="hover:text-white transition-colors flex items-center gap-1 py-0.5">
                    <ChevronRight size={12} className="text-am-magenta shrink-0" />
                    <span>Início</span>
                  </Link>
                </li>
                <li>
                  <Link href="/catalogo" className="hover:text-white transition-colors flex items-center gap-1 py-0.5 font-bold text-zinc-200">
                    <ChevronRight size={12} className="text-am-magenta shrink-0" />
                    <span>Catálogo</span>
                  </Link>
                </li>
                <li>
                  <Link href="/lista-atacado" className="hover:text-white transition-colors flex items-center gap-1 py-0.5 text-am-magenta font-bold">
                    <ChevronRight size={12} className="text-am-magenta shrink-0" />
                    <span>Grade Atacado</span>
                  </Link>
                </li>
                <li>
                  <Link href="/#categorias" className="hover:text-white transition-colors flex items-center gap-1 py-0.5">
                    <ChevronRight size={12} className="text-am-magenta shrink-0" />
                    <span>Categorias</span>
                  </Link>
                </li>
                <li>
                  <Link href="/#destaques" className="hover:text-white transition-colors flex items-center gap-1 py-0.5">
                    <ChevronRight size={12} className="text-am-magenta shrink-0" />
                    <span>Destaques</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Canais Oficiais */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-white uppercase tracking-wider text-am-magenta">
                Canais Oficiais
              </h4>
              <ul className="space-y-2 text-xs text-zinc-400 font-medium">
                {storeConfig.channelsStatus?.whatsappActive !== false && (
                  <li>
                    <a
                      href={getWhatsAppLink("Olá! Gostaria de falar com o time da AM FIT.", storeConfig.contact.whatsappNumber)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 py-0.5 text-zinc-300"
                    >
                      <MessageCircle size={13} className="text-emerald-500 shrink-0" />
                      <span>WhatsApp</span>
                    </a>
                  </li>
                )}
                {storeConfig.channelsStatus?.instagramActive !== false && (
                  <li>
                    <a
                      href={storeConfig.social.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-pink-400 transition-colors flex items-center gap-1.5 py-0.5 text-zinc-300"
                    >
                      <Instagram size={13} className="text-pink-500 shrink-0" />
                      <span>Instagram</span>
                    </a>
                  </li>
                )}
                {storeConfig.channelsStatus?.shopeeActive !== false && (
                  <li>
                    <a
                      href={storeConfig.social.shopeeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-orange-400 transition-colors flex items-center gap-1.5 py-0.5 text-zinc-300"
                    >
                      <ShoppingBag size={13} className="text-orange-500 shrink-0" />
                      <span>Shopee</span>
                    </a>
                  </li>
                )}
                {storeConfig.channelsStatus?.mercadoLivreActive !== false && (
                  <li>
                    <a
                      href={storeConfig.social.mercadoLivreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-yellow-400 transition-colors flex items-center gap-1.5 py-0.5 text-zinc-300"
                    >
                      <Package size={13} className="text-[#ffe600] shrink-0" />
                      <span>Mercado Livre</span>
                    </a>
                  </li>
                )}
              </ul>
            </div>

          </div>

          {/* 4. Pagamentos & Segurança (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-black text-white uppercase tracking-wider text-am-magenta">
              Pagamento & Segurança
            </h4>
            
            {/* Badges de Formas de Pagamento em Card Estruturado */}
            <div className="p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800/80 space-y-2.5">
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                <span className="px-2.5 py-1 bg-zinc-800 border border-zinc-700/60 rounded-lg font-bold text-emerald-400 flex items-center gap-1">
                  <QrCode size={12} />
                  <span>PIX (-{storeConfig.commercial.pixDiscountPercentage}%)</span>
                </span>
                <span className="px-2.5 py-1 bg-zinc-800 border border-zinc-700/60 rounded-lg font-bold text-zinc-200 flex items-center gap-1">
                  <CreditCard size={12} />
                  <span>Cartão até {storeConfig.commercial.maxInstallments}x</span>
                </span>
                <span className="px-2 py-1 bg-zinc-800 border border-zinc-700/60 rounded-lg font-bold text-zinc-300">
                  Boleto
                </span>
              </div>

              <div className="space-y-1.5 text-[11px] text-zinc-400 pt-1 border-t border-zinc-800/80">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
                  <span>Ambiente Seguro SSL 256-bit</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck size={14} className="text-am-magenta shrink-0" />
                  <span>Envio com rastreamento oficial</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* BOTTOM BAR: COPYRIGHT & ACESSO RESTRITO                  */}
        {/* ========================================================= */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 gap-2.5 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} AM FIT Atacado & Varejo &bull; Confecção Própria &bull; São Paulo - SP
          </p>

          <div className="flex items-center justify-center gap-3">
            <span className="text-zinc-500">Zero Transparência</span>
            <span className="text-zinc-700">&bull;</span>
            <Link
              href="/admin"
              title="Acesso Administrativo"
              className="text-zinc-600 hover:text-zinc-300 transition-colors flex items-center gap-1"
            >
              <Lock size={11} className="opacity-60 hover:opacity-100" />
              <span>Gestão</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
