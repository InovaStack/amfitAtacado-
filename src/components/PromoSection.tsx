"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Timer, Tag, ArrowRight, Flame, Sparkles } from "lucide-react";
import { Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

interface PromoSectionProps {
  products: Product[];
}

export const PromoSection: React.FC<PromoSectionProps> = ({ products }) => {
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

  if (promoProducts.length === 0) return null;

  return (
    <section id="ofertas" className="py-12 sm:py-16 bg-white border-t border-b border-zinc-200/80 relative">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Banner / Cabeçalho de Ofertas */}
        <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-black rounded-3xl p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12 text-white border border-zinc-800 shadow-xl relative overflow-hidden">
          {/* Brilho de fundo sutil */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-am-magenta/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Informações da Oferta */}
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-am-magenta/20 border border-am-magenta/40 text-am-magenta text-xs font-black tracking-wider uppercase">
                <Flame size={14} className="animate-pulse" />
                <span>Descontos Especiais</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
                OFERTAS DA <span className="text-am-magenta underline decoration-am-magenta/40">LOJA</span>
              </h2>

              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                Aproveite preços promocionais de fábrica em peças selecionadas de alta performance. 
                Compre no varejo com desconto especial ou aumente suas margens no atacado!
              </p>
            </div>

            {/* Contador Regressivo */}
            <div className="flex flex-col items-start lg:items-end gap-2 bg-zinc-900/80 lg:bg-transparent p-4 lg:p-0 rounded-2xl border border-zinc-800 lg:border-none">
              <span className="text-[11px] sm:text-xs uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-1.5">
                <Timer size={15} className="text-am-magenta" />
                As ofertas encerram em:
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

        {/* Grade de Produtos em Oferta */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
          {promoProducts.slice(0, 10).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Botão Ver Todas as Ofertas */}
        <div className="mt-10 sm:mt-12 text-center">
          <Link
            href="/catalogo?categoria=promocoes"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 bg-am-magenta hover:bg-am-magenta-dark text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-magenta transition-all transform hover:scale-[1.02]"
          >
            <Sparkles size={16} />
            <span>Ver Todas as Ofertas da Loja</span>
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
};
