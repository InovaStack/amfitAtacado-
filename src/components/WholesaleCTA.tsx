"use client";

import React from "react";
import Link from "next/link";
import { 
  Building2, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  DollarSign, 
  Package, 
  Sparkles, 
  PhoneCall 
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useAdmin } from "@/context/AdminContext";
import { getWhatsAppLink } from "@/config/store";

export const WholesaleCTA: React.FC = () => {
  const { setMode } = useCart();
  const { openAuthModal, isAuthenticated, user } = useAuth();
  const { storeConfig } = useAdmin();

  return (
    <section id="atacado" className="py-20 bg-white border-y border-am-gray-200 relative overflow-hidden">
      {/* Decorative background accents */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-am-magenta/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-zinc-100 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Benefits & Pitch */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-am-magenta-light border border-am-magenta-border text-am-magenta font-extrabold text-xs tracking-wider uppercase">
              <Sparkles size={15} />
              Lucre 100% com nossos produtos
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-am-black tracking-tight leading-tight uppercase">
              ATACADO | PREÇO DE <span className="text-am-magenta underline decoration-am-magenta/40">FÁBRICA</span>
            </h2>

            <p className="text-base text-zinc-600 leading-relaxed max-w-2xl">
              Exclusivo para revendedores e lojistas. Seu negócio começa aqui com produtos de alto giro, 
              qualidade impecável e margem para <strong>dobrar seu investimento com 100% de lucro</strong>.
            </p>

            {/* Checklist com os 4 Pilares da Loja */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                <span className="text-xl">✨</span>
                <div>
                  <h4 className="font-bold text-sm text-am-black">Lucre 100% com Nossos Produtos</h4>
                  <p className="text-xs text-zinc-500">Dobre seu capital de giro com preços imbatíveis</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                <span className="text-xl">📦</span>
                <div>
                  <h4 className="font-bold text-sm text-am-black">Atacado | Preço de Fábrica</h4>
                  <p className="text-xs text-zinc-500">Direto de quem fabrica com pedido mínimo facilitado</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                <span className="text-xl">💼</span>
                <div>
                  <h4 className="font-bold text-sm text-am-black">Exclusivo para Revendedores</h4>
                  <p className="text-xs text-zinc-500">Condições especiais para quem quer crescer</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                <span className="text-xl">🚀</span>
                <div>
                  <h4 className="font-bold text-sm text-am-black">Seu Negócio Começa Aqui</h4>
                  <p className="text-xs text-zinc-500">Apoio completo, fotos profissionais e suporte</p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              {(!isAuthenticated || user?.accountType !== "atacado") && (
                <button
                  type="button"
                  onClick={() => openAuthModal("atacado", "register")}
                  className="px-7 py-4 bg-gradient-to-r from-am-magenta to-pink-600 hover:from-pink-600 hover:to-am-magenta text-white rounded-full font-black text-sm uppercase tracking-wider transition-all transform hover:scale-105 shadow-magenta flex items-center gap-2"
                >
                  <Building2 size={16} />
                  <span>Cadastrar Conta Atacado</span>
                </button>
              )}
              <Link
                href="/lista-atacado"
                className="px-7 py-4 bg-am-magenta hover:bg-am-magenta-dark text-white rounded-full font-black text-sm uppercase tracking-wider transition-all transform hover:scale-105 shadow-magenta flex items-center gap-2"
              >
                <span>Abrir Lista de Compra (Grade)</span>
                <ArrowRight size={16} />
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMode("atacado");
                  const el = document.getElementById("destaques");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-4 bg-zinc-900 hover:bg-black text-white rounded-full font-bold text-sm uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <span>Ver Catálogo Tradicional</span>
              </button>

              {storeConfig.channelsStatus?.whatsappActive !== false ? (
                <a
                  href={getWhatsAppLink("Olá, quero receber a tabela de atacado da AM FIT", storeConfig.contact.whatsappNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 bg-am-black hover:bg-zinc-800 text-white rounded-full font-bold text-sm tracking-wider transition-all flex items-center gap-2"
                >
                  <PhoneCall size={16} className="text-am-magenta" />
                  <span>Falar com Consultor</span>
                </a>
              ) : (
                <div className="px-6 py-4 bg-zinc-200 text-zinc-500 rounded-full font-bold text-sm tracking-wider opacity-60 flex items-center gap-2 cursor-not-allowed">
                  <PhoneCall size={16} />
                  <span>WhatsApp Pausado</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Wholesale Conditions & Benefits Card */}
          <div className="lg:col-span-5">
            <div className="bg-zinc-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-zinc-800 relative space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-am-magenta/20 text-am-magenta flex items-center justify-center">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <h3 className="font-black text-base uppercase tracking-wide">Condições do Atacado</h3>
                    <p className="text-[11px] text-zinc-400">Vantagens exclusivas para revendedores</p>
                  </div>
                </div>
                <span className="text-xs font-bold bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
                  Pronta Entrega
                </span>
              </div>

              {/* Conditions List */}
              <div className="space-y-3.5">
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">💰</span>
                    <div>
                      <div className="text-xs font-bold text-white">Pedido Mínimo Acessível</div>
                      <div className="text-[11px] text-zinc-400">Comece com pouco capital inicial</div>
                    </div>
                  </div>
                  <span className="text-sm font-black text-am-magenta">R$ {storeConfig.commercial.minWholesaleOrderAmount},00</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📦</span>
                    <div>
                      <div className="text-xs font-bold text-white">Grade Livre & Sortida</div>
                      <div className="text-[11px] text-zinc-400">Escolha modelos, tamanhos e cores à vontade</div>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-400">Sem grade presa</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">⚡</span>
                    <div>
                      <div className="text-xs font-bold text-white">Despacho Rápido</div>
                      <div className="text-[11px] text-zinc-400">Envio para transportadoras e Correios</div>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-zinc-300">Todo o Brasil</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📸</span>
                    <div>
                      <div className="text-xs font-bold text-white">Material de Apoio Grátis</div>
                      <div className="text-[11px] text-zinc-400">Fotos e vídeos em alta resolução para divulgação</div>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-am-magenta">Incluso</span>
                </div>
              </div>

              {/* Fast note */}
              <div className="pt-2 text-center">
                <p className="text-xs text-zinc-400">
                  Cadastre-se como revendedor ou compre direto pela grade de atacado com CNPJ ou CPF.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
