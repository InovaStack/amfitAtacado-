"use client";

import React from "react";
import Link from "next/link";
import { 
  Building2, 
  ArrowRight, 
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
    <section id="atacado" className="py-12 sm:py-16 bg-white border-y border-zinc-200/90 relative overflow-hidden">
      {/* Decorative background accents */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-am-magenta/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-zinc-100 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10">
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Header & Pitch */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-am-magenta-light border border-am-magenta-border text-am-magenta font-extrabold text-xs tracking-wider uppercase">
              <Sparkles size={15} />
              Lucre 100% com nossos produtos
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-am-black tracking-tight leading-tight uppercase">
              ATACADO | PREÇO DE <span className="text-am-magenta underline decoration-am-magenta/40">FÁBRICA</span>
            </h2>

            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-3xl">
              Exclusivo para revendedores e lojistas. Seu negócio começa aqui com produtos de alto giro, 
              qualidade impecável e margem para <strong>dobrar seu investimento com 100% de lucro</strong>.
            </p>
          </div>

          {/* Checklist com os 4 Pilares da Loja */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:border-am-magenta/40 transition-colors shadow-2xs">
              <span className="text-xl">✨</span>
              <div>
                <h4 className="font-bold text-sm text-am-black leading-tight">Lucre 100% com Nossos Produtos</h4>
                <p className="text-xs text-zinc-500 mt-1">Dobre seu capital de giro com preços imbatíveis</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:border-am-magenta/40 transition-colors shadow-2xs">
              <span className="text-xl">📦</span>
              <div>
                <h4 className="font-bold text-sm text-am-black leading-tight">Atacado | Preço de Fábrica</h4>
                <p className="text-xs text-zinc-500 mt-1">Direto de quem fabrica com pedido mínimo facilitado</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:border-am-magenta/40 transition-colors shadow-2xs">
              <span className="text-xl">💼</span>
              <div>
                <h4 className="font-bold text-sm text-am-black leading-tight">Exclusivo para Revendedores</h4>
                <p className="text-xs text-zinc-500 mt-1">Condições especiais para quem quer crescer</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:border-am-magenta/40 transition-colors shadow-2xs">
              <span className="text-xl">🚀</span>
              <div>
                <h4 className="font-bold text-sm text-am-black leading-tight">Seu Negócio Começa Aqui</h4>
                <p className="text-xs text-zinc-500 mt-1">Apoio completo, fotos profissionais e suporte</p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            {(!isAuthenticated || user?.accountType !== "atacado") && (
              <button
                type="button"
                onClick={() => openAuthModal("atacado", "register")}
                className="px-6 sm:px-7 py-3.5 sm:py-4 bg-gradient-to-r from-am-magenta to-pink-600 hover:from-pink-600 hover:to-am-magenta text-white rounded-full font-black text-xs sm:text-sm uppercase tracking-wider transition-all transform hover:scale-[1.02] shadow-magenta flex items-center gap-2"
              >
                <Building2 size={16} />
                <span>Cadastrar Conta Atacado</span>
              </button>
            )}

            <Link
              href="/lista-atacado"
              className="px-6 sm:px-7 py-3.5 sm:py-4 bg-am-magenta hover:bg-am-magenta-dark text-white rounded-full font-black text-xs sm:text-sm uppercase tracking-wider transition-all transform hover:scale-[1.02] shadow-magenta flex items-center gap-2"
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
              className="px-5 sm:px-6 py-3.5 sm:py-4 bg-zinc-900 hover:bg-black text-white rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <span>Ver Catálogo Tradicional</span>
            </button>

            {storeConfig.channelsStatus?.whatsappActive !== false ? (
              <a
                href={getWhatsAppLink("Olá, quero receber a tabela de atacado da AM FIT", storeConfig.contact.whatsappNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 sm:px-6 py-3.5 sm:py-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-300 rounded-full font-bold text-xs sm:text-sm tracking-wider transition-all flex items-center gap-2"
              >
                <PhoneCall size={16} className="text-emerald-600" />
                <span>Falar com Consultor</span>
              </a>
            ) : (
              <div className="px-5 sm:px-6 py-3.5 sm:py-4 bg-zinc-200 text-zinc-500 rounded-full font-bold text-xs sm:text-sm tracking-wider opacity-60 flex items-center gap-2 cursor-not-allowed">
                <PhoneCall size={16} />
                <span>WhatsApp Pausado</span>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
