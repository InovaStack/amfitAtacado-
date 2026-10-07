"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Instagram, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Truck, 
  ChevronRight,
  ExternalLink,
  Sparkles,
  ShoppingBag,
  Package,
  MessageCircle
} from "lucide-react";
import { getWhatsAppLink } from "@/config/store";
import { useAdmin } from "@/context/AdminContext";

export const Footer: React.FC = () => {
  const { storeConfig } = useAdmin();
  return (
    <footer className="bg-zinc-950 text-white pt-8 sm:pt-10 pb-6 border-t border-zinc-800">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 pb-8 border-b border-zinc-800/80">
          
          {/* 1. Brand Column (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-3.5">
            <Link href="/" className="inline-block">
              <div className="relative w-40 h-12 bg-black rounded-xl p-1.5 border border-zinc-800/80 flex items-center justify-center">
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
              Confecção própria especializada em moda fitness feminina premium com alta compressão e Zero Transparência. Atendimento direto de fábrica para atacado e varejo.
            </p>

            {/* Redes Sociais Compactas */}
            <div className="flex items-center gap-2 pt-1">
              {storeConfig.channelsStatus?.instagramActive !== false ? (
                <a
                  href={storeConfig.social.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-zinc-900 hover:bg-am-magenta text-zinc-300 hover:text-white flex items-center justify-center transition-colors border border-zinc-800 shadow-xs"
                  aria-label="Instagram AM FIT"
                  title={`Instagram ${storeConfig.social.instagram}`}
                >
                  <Instagram size={15} />
                </a>
              ) : (
                <div
                  className="w-8 h-8 rounded-lg bg-zinc-950 text-zinc-600 flex items-center justify-center border border-dashed border-zinc-800/60 opacity-30 grayscale select-none pointer-events-none cursor-not-allowed"
                  aria-label="Instagram pausado"
                  title="Instagram pausado no momento"
                >
                  <Instagram size={15} />
                </div>
              )}

              {storeConfig.channelsStatus?.whatsappActive !== false ? (
                <a
                  href={getWhatsAppLink("Olá! Gostaria de falar com o time da AM FIT.", storeConfig.contact.whatsappNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-zinc-900 hover:bg-emerald-600 text-zinc-300 hover:text-white flex items-center justify-center transition-colors border border-zinc-800 shadow-xs"
                  aria-label="WhatsApp AM FIT"
                  title="WhatsApp Oficial"
                >
                  <Phone size={15} />
                </a>
              ) : (
                <div
                  className="w-8 h-8 rounded-lg bg-zinc-950 text-zinc-600 flex items-center justify-center border border-dashed border-zinc-800/60 opacity-30 grayscale select-none pointer-events-none cursor-not-allowed"
                  aria-label="WhatsApp pausado"
                  title="WhatsApp pausado no momento"
                >
                  <Phone size={15} />
                </div>
              )}
              <a
                href={`mailto:${storeConfig.contact.email}`}
                className="w-8 h-8 rounded-lg bg-zinc-900 hover:bg-am-magenta text-zinc-300 hover:text-white flex items-center justify-center transition-colors border border-zinc-800 shadow-xs"
                aria-label="E-mail AM FIT"
                title="E-mail Comercial"
              >
                <Mail size={15} />
              </a>
            </div>
          </div>

          {/* 2. Navegação Rápida (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider text-am-magenta">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400 font-medium">
              <li>
                <Link href="/" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight size={13} className="text-am-magenta" />
                  <span>Página Inicial</span>
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="hover:text-white transition-colors flex items-center gap-1.5 font-bold text-zinc-200">
                  <ChevronRight size={13} className="text-am-magenta" />
                  <span>Catálogo Completo</span>
                </Link>
              </li>
              <li>
                <Link href="/lista-atacado" className="hover:text-white transition-colors flex items-center gap-1.5 text-am-magenta font-bold">
                  <ChevronRight size={13} className="text-am-magenta" />
                  <span>Grade Rápida Atacado (B2B)</span>
                </Link>
              </li>
              <li>
                <Link href="/#categorias" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight size={13} className="text-am-magenta" />
                  <span>Categorias & Linhas</span>
                </Link>
              </li>
              <li>
                <Link href="/#destaques" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight size={13} className="text-am-magenta" />
                  <span>Destaques da Coleção</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Canais & Lojas Oficiais (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider text-am-magenta">
              Canais Oficiais
            </h4>
            <ul className="space-y-1.5 text-xs text-zinc-400 font-medium">
              {/* WhatsApp */}
              <li>
                {storeConfig.channelsStatus?.whatsappActive !== false ? (
                  <a 
                    href={getWhatsAppLink("Olá! Gostaria de falar com o time da AM FIT.", storeConfig.contact.whatsappNumber)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-zinc-900 transition-colors text-zinc-300 hover:text-emerald-400 border border-transparent hover:border-zinc-800"
                  >
                    <div className="flex items-center gap-2">
                      <MessageCircle size={13} className="text-emerald-500 group-hover:scale-110 transition-transform" />
                      <span>WhatsApp de Vendas</span>
                    </div>
                    <ExternalLink size={11} className="text-zinc-600 group-hover:text-emerald-400 transition-colors" />
                  </a>
                ) : (
                  <div 
                    className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-zinc-900/40 border border-zinc-800/40 opacity-30 grayscale blur-[0.2px] select-none pointer-events-none cursor-not-allowed"
                    title="Canal WhatsApp pausado"
                  >
                    <div className="flex items-center gap-2 text-zinc-500 line-through">
                      <MessageCircle size={13} className="text-zinc-600" />
                      <span>WhatsApp (Pausado)</span>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-wider bg-zinc-800 text-zinc-500 px-1.5 py-0.2 rounded border border-zinc-700/50">
                      Pausado
                    </span>
                  </div>
                )}
              </li>

              {/* Instagram */}
              <li>
                {storeConfig.channelsStatus?.instagramActive !== false ? (
                  <a 
                    href={storeConfig.social.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-zinc-900 transition-colors text-zinc-300 hover:text-pink-400 border border-transparent hover:border-zinc-800"
                  >
                    <div className="flex items-center gap-2">
                      <Instagram size={13} className="text-pink-500 group-hover:scale-110 transition-transform" />
                      <span>Instagram Oficial</span>
                    </div>
                    <ExternalLink size={11} className="text-zinc-600 group-hover:text-pink-400 transition-colors" />
                  </a>
                ) : (
                  <div 
                    className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-zinc-900/40 border border-zinc-800/40 opacity-30 grayscale blur-[0.2px] select-none pointer-events-none cursor-not-allowed"
                    title="Canal Instagram pausado"
                  >
                    <div className="flex items-center gap-2 text-zinc-500 line-through">
                      <Instagram size={13} className="text-zinc-600" />
                      <span>Instagram (Pausado)</span>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-wider bg-zinc-800 text-zinc-500 px-1.5 py-0.2 rounded border border-zinc-700/50">
                      Pausado
                    </span>
                  </div>
                )}
              </li>

              {/* Shopee */}
              <li>
                {storeConfig.channelsStatus?.shopeeActive !== false ? (
                  <a 
                    href={storeConfig.social.shopeeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-zinc-900 transition-colors text-zinc-300 hover:text-orange-400 border border-transparent hover:border-zinc-800"
                  >
                    <div className="flex items-center gap-2">
                      <ShoppingBag size={13} className="text-orange-500 group-hover:scale-110 transition-transform" />
                      <span>Loja na Shopee</span>
                    </div>
                    <ExternalLink size={11} className="text-zinc-600 group-hover:text-orange-400 transition-colors" />
                  </a>
                ) : (
                  <div 
                    className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-zinc-900/40 border border-zinc-800/40 opacity-30 grayscale blur-[0.2px] select-none pointer-events-none cursor-not-allowed"
                    title="Canal Shopee pausado"
                  >
                    <div className="flex items-center gap-2 text-zinc-500 line-through">
                      <ShoppingBag size={13} className="text-zinc-600" />
                      <span>Shopee (Pausada)</span>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-wider bg-zinc-800 text-zinc-500 px-1.5 py-0.2 rounded border border-zinc-700/50">
                      Pausada
                    </span>
                  </div>
                )}
              </li>

              {/* Mercado Livre */}
              <li>
                {storeConfig.channelsStatus?.mercadoLivreActive !== false ? (
                  <a 
                    href={storeConfig.social.mercadoLivreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-zinc-900 transition-colors text-zinc-300 hover:text-yellow-400 border border-transparent hover:border-zinc-800"
                  >
                    <div className="flex items-center gap-2">
                      <Package size={13} className="text-[#ffe600] group-hover:scale-110 transition-transform" />
                      <span>Mercado Livre Oficial</span>
                    </div>
                    <ExternalLink size={11} className="text-zinc-600 group-hover:text-yellow-400 transition-colors" />
                  </a>
                ) : (
                  <div 
                    className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-zinc-900/40 border border-zinc-800/40 opacity-30 grayscale blur-[0.2px] select-none pointer-events-none cursor-not-allowed"
                    title="Canal Mercado Livre pausado"
                  >
                    <div className="flex items-center gap-2 text-zinc-500 line-through">
                      <Package size={13} className="text-zinc-600" />
                      <span>Mercado Livre (Pausado)</span>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-wider bg-zinc-800 text-zinc-500 px-1.5 py-0.2 rounded border border-zinc-700/50">
                      Pausado
                    </span>
                  </div>
                )}
              </li>
            </ul>
          </div>

          {/* 4. Pagamentos & Segurança (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider text-am-magenta">
              Pagamento & Segurança
            </h4>
            <div className="space-y-2.5">
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded font-bold text-emerald-400">
                  PIX (-{storeConfig.commercial.pixDiscountPercentage}%)
                </span>
                <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded font-bold text-zinc-300">
                  Cartão até {storeConfig.commercial.maxInstallments}x
                </span>
                <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded font-bold text-zinc-300">
                  Boleto
                </span>
              </div>

              <div className="space-y-1.5 text-[11px] text-zinc-400 pt-1">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
                  <span>Ambiente Criptografado SSL 256-bit</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck size={14} className="text-am-magenta shrink-0" />
                  <span>Despacho ágil com código de rastreio</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Discreto Link de Gestão */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 gap-3">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} AM FIT Atacado & Varejo. Confecção Própria • São Paulo - SP.
          </p>

          <div className="flex items-center gap-3">
            <span className="text-zinc-600">Alta Performance Têxtil</span>
            <span className="text-zinc-800">•</span>
            <Link
              href="/admin"
              title="Acesso Administrativo"
              className="text-zinc-600 hover:text-zinc-300 transition-colors flex items-center gap-1"
            >
              <Lock size={10} className="opacity-50 hover:opacity-100" />
              <span>Gestão</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
