"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Building2, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  DollarSign, 
  Package, 
  Sparkles,
  PhoneCall,
  Calculator
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getWhatsAppLink } from "@/config/store";

export const WholesaleCTA: React.FC = () => {
  const { setMode } = useCart();
  const [investment, setInvestment] = useState(600);

  // Profit calculation: average markup is ~115%
  const estimatedReturn = Math.round(investment * 2.15);
  const estimatedProfit = estimatedReturn - investment;

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
              <Building2 size={15} />
              Seja Revendedora AM FIT
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-am-black tracking-tight leading-tight uppercase">
              COMPRE NO ATACADO DIRETO DA <span className="text-am-magenta underline decoration-am-magenta/40">FÁBRICA</span>
            </h2>

            <p className="text-base text-zinc-600 leading-relaxed max-w-2xl">
              Monte seu próprio negócio ou aumente o mix da sua loja com a marca fitness que mais cresce. 
              Peças de alta durabilidade, modelagem que valoriza o corpo e tecidos tecnológicos com margem de lucro de <strong>até 120%</strong>.
            </p>

            {/* Checklist of Wholesale Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-am-magenta flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-am-black">Pedido Mínimo Baixo</h4>
                  <p className="text-xs text-zinc-500">Apenas R$ 300,00 ou a partir de 6 peças variadas</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-am-magenta flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-am-black">Grade Livre & Sem Restrições</h4>
                  <p className="text-xs text-zinc-500">Escolha os modelos, cores e tamanhos que desejar</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-am-magenta flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-am-black">Fotos & Material de Divulgação</h4>
                  <p className="text-xs text-zinc-500">Fotos profissionais liberadas para seus stories e catálogo</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-am-magenta flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-am-black">Consultora Dedicada no WhatsApp</h4>
                  <p className="text-xs text-zinc-500">Suporte humanizado para tirar dúvidas e fechar pedido</p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
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

              <a
                href={getWhatsAppLink("Olá, quero receber a tabela de atacado da AM FIT")}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 bg-am-black hover:bg-zinc-800 text-white rounded-full font-bold text-sm tracking-wider transition-all flex items-center gap-2"
              >
                <PhoneCall size={16} className="text-am-magenta" />
                <span>Falar com Consultor</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Profit Calculator */}
          <div className="lg:col-span-5">
            <div className="bg-zinc-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-zinc-800 relative">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-am-magenta/20 text-am-magenta flex items-center justify-center">
                    <Calculator size={18} />
                  </div>
                  <div>
                    <h3 className="font-black text-base uppercase tracking-wide">Simulador de Lucro</h3>
                    <p className="text-[11px] text-zinc-400">Previsão estimada para revenda</p>
                  </div>
                </div>
                <span className="text-xs font-bold bg-am-magenta/20 text-am-magenta px-2.5 py-1 rounded-full border border-am-magenta/30">
                  +115% Margem
                </span>
              </div>

              {/* Slider for investment */}
              <div className="py-6 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400">Seu investimento inicial:</span>
                  <span className="text-lg font-black text-white">
                    R$ {investment.toLocaleString("pt-BR")},00
                  </span>
                </div>

                <input
                  type="range"
                  min="300"
                  max="5000"
                  step="100"
                  value={investment}
                  onChange={(e) => setInvestment(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-am-magenta"
                />

                <div className="flex justify-between text-[11px] text-zinc-500">
                  <span>Mínimo: R$ 300</span>
                  <span>R$ 2.500</span>
                  <span>R$ 5.000+</span>
                </div>
              </div>

              {/* Calculation Output Cards */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-zinc-900/90 rounded-2xl p-4 border border-zinc-800">
                  <span className="text-xs text-zinc-400 block mb-1">Você revende por:</span>
                  <span className="text-xl sm:text-2xl font-black text-white">
                    R$ {estimatedReturn.toLocaleString("pt-BR")},00
                  </span>
                </div>

                <div className="bg-am-magenta/10 rounded-2xl p-4 border border-am-magenta/30">
                  <span className="text-xs text-am-magenta font-semibold block mb-1">Seu Lucro Líquido:</span>
                  <span className="text-xl sm:text-2xl font-black text-am-magenta">
                    R$ {estimatedProfit.toLocaleString("pt-BR")},00
                  </span>
                </div>
              </div>

              {/* Fast note */}
              <div className="mt-6 pt-4 border-t border-zinc-800/80 text-center">
                <p className="text-xs text-zinc-400">
                  Baseado no preço sugerido de revenda no varejo. 
                  Você tem autonomia total para precificar suas peças!
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
