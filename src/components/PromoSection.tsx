"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Timer, Tag, ArrowRight, Flame, Sparkles, ChevronDown, ChevronUp, Eye } from "lucide-react";
import { Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

interface PromoSectionProps {
  products: Product[];
}

export const PromoSection: React.FC<PromoSectionProps> = ({ products }) => {
  // Estado para controlar a expansão das peças em oferta (começa fechado para só abrir ao clicar)
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Filtra produtos que estão em promoção ou com percentual de desconto
  const promoProducts = products.filter(
    (p) => p.isPromo || (p.discountPercentage && p.discountPercentage > 0) || (Array.isArray(p.categories) && p.categories.includes("promocoes"))
  );

  // Contador regressivo simulado para gerar urgência (reseta a cada 24h)
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 38,
    seconds: 45,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleOffers = () => {
    const nextState = !isExpanded;
    setIsExpanded(nextState);

    // Se estiver abrindo, rolar suavemente para a visualização das ofertas após a renderização
    if (nextState) {
      setTimeout(() => {
        const gridElement = document.getElementById("grade-ofertas-do-dia");
        if (gridElement) {
          gridElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  if (promoProducts.length === 0) return null;

  return (
    <section id="ofertas" ref={sectionRef} className="py-8 sm:py-12 bg-white border-t border-b border-zinc-200/80 relative">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Banner Interativo / Campo Clicável de Oferta do Dia */}
        <div
          role="button"
          tabIndex={0}
          onClick={handleToggleOffers}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleToggleOffers();
            }
          }}
          className={`bg-gradient-to-r from-zinc-950 via-zinc-900 to-black rounded-3xl p-6 sm:p-8 lg:p-10 text-white border transition-all duration-300 relative overflow-hidden cursor-pointer select-none group shadow-xl ${
            isExpanded
              ? "border-am-magenta/70 ring-2 ring-am-magenta/30"
              : "border-zinc-800 hover:border-am-magenta/50 hover:shadow-2xl"
          }`}
          aria-expanded={isExpanded}
          aria-label="Clique para visualizar as peças em oferta do dia"
        >
          {/* Brilhos de fundo decorativos */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-am-magenta/15 rounded-full blur-3xl pointer-events-none group-hover:bg-am-magenta/25 transition-all" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Informações da Oferta */}
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-am-magenta/20 border border-am-magenta/40 text-am-magenta text-xs font-black tracking-wider uppercase">
                <Flame size={14} className="animate-pulse" />
                <span>Ofertas do Dia &bull; {promoProducts.length} Peças em Destaque</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase group-hover:text-pink-100 transition-colors">
                OFERTA DO <span className="text-am-magenta underline decoration-am-magenta/40">DIA</span>
              </h2>

              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                Preços especiais de fábrica por tempo limitado. Toque ou clique neste campo para revelar todas as peças em promoção hoje!
              </p>

              {/* Botão de Ação / Indicador Visual de Expansão */}
              <div className="pt-2 flex items-center gap-3">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-am-magenta hover:bg-pink-600 text-white rounded-full font-bold text-xs uppercase tracking-wider shadow-magenta-sm transition-all group-hover:scale-105">
                  {isExpanded ? (
                    <>
                      <span>Ocultar Peças em Oferta</span>
                      <ChevronUp size={16} />
                    </>
                  ) : (
                    <>
                      <Eye size={15} />
                      <span>Clique para Visualizar as Peças</span>
                      <ChevronDown size={16} className="animate-bounce" />
                    </>
                  )}
                </span>
                
                <span className="text-[11px] text-zinc-400 font-semibold hidden sm:inline">
                  {isExpanded ? "Clique para recolher o bloco" : "Toque para abrir a grade completa"}
                </span>
              </div>
            </div>

            {/* Contador Regressivo */}
            <div className="flex flex-col items-start lg:items-end gap-2 bg-zinc-900/80 lg:bg-transparent p-4 lg:p-0 rounded-2xl border border-zinc-800 lg:border-none shrink-0">
              <span className="text-[11px] sm:text-xs uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-1.5">
                <Timer size={15} className="text-am-magenta" />
                Tempo restante da oferta:
              </span>
              
              <div className="flex items-center gap-2">
                <div className="bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-center min-w-14 sm:min-w-16">
                  <span className="text-xl sm:text-2xl font-black text-white font-mono">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className="block text-[9px] sm:text-[10px] text-zinc-400 uppercase font-bold">Horas</span>
                </div>
                
                <span className="text-xl sm:text-2xl font-black text-am-magenta">:</span>
                
                <div className="bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-center min-w-14 sm:min-w-16">
                  <span className="text-xl sm:text-2xl font-black text-white font-mono">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className="block text-[9px] sm:text-[10px] text-zinc-400 uppercase font-bold">Min</span>
                </div>
                
                <span className="text-xl sm:text-2xl font-black text-am-magenta">:</span>
                
                <div className="bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-center min-w-14 sm:min-w-16">
                  <span className="text-xl sm:text-2xl font-black text-am-magenta font-mono">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className="block text-[9px] sm:text-[10px] text-zinc-400 uppercase font-bold">Seg</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================= */}
        {/* GRADE DE PEÇAS EM OFERTA (VISÍVEL APENAS QUANDO EXPANDIDO) */}
        {/* ========================================================= */}
        {isExpanded && (
          <div id="grade-ofertas-do-dia" className="mt-8 pt-6 border-t border-zinc-200/90 animate-fadeIn">
            
            {/* Cabeçalho da grade expandida */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
              <div>
                <span className="text-xs font-bold text-am-magenta uppercase tracking-wider">
                  🔥 Seleção Exclusiva de Hoje
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">
                  Peças Disponíveis em Oferta ({promoProducts.length})
                </h3>
              </div>

              <button
                type="button"
                onClick={handleToggleOffers}
                className="self-start sm:self-auto text-xs font-bold text-zinc-600 hover:text-am-magenta flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-colors"
              >
                <ChevronUp size={15} />
                <span>Recolher Peças</span>
              </button>
            </div>

            {/* Grid dos Produtos */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
              {promoProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Rodapé com botão para ver catálogo de promoções */}
            <div className="mt-8 sm:mt-12 text-center pt-4">
              <Link
                href="/catalogo?categoria=promocoes"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 bg-am-magenta hover:bg-am-magenta-dark text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-magenta transition-all transform hover:scale-[1.02]"
              >
                <Sparkles size={16} />
                <span>Ver Todas as Ofertas no Catálogo</span>
                <ArrowRight size={16} />
              </Link>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
