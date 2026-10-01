"use client";

import React, { useState, useEffect } from "react";
import { Timer, Percent, Sparkles, Tag } from "lucide-react";
import { Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

interface PromoSectionProps {
  products: Product[];
}

export const PromoSection: React.FC<PromoSectionProps> = ({ products }) => {
  const promoProducts = products.filter((p) => p.isPromo || p.discountPercentage);

  // Countdown timer simulation (resets every 24h)
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

  return (
    <section id="promocoes" className="py-16 bg-white relative">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Promo Header with Countdown */}
        <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-black rounded-3xl p-6 sm:p-10 mb-12 text-white border border-zinc-800 shadow-xl relative overflow-hidden">
          {/* Subtle magenta glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-am-magenta/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-am-magenta/20 border border-am-magenta/40 text-am-magenta text-xs font-black tracking-wider uppercase">
                <Tag size={12} />
                Ofertas Relâmpago
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
                PRODUTOS EM <span className="text-am-magenta">PROMOÇÃO</span>
              </h2>
              <p className="text-zinc-300 text-sm">
                Descontos especiais de confecção para renovar seu guarda-roupa fitness ou lucrar o dobro no atacado. Peças selecionadas com até 40% OFF.
              </p>
            </div>

            {/* Countdown Box */}
            <div className="flex flex-col items-start lg:items-end gap-2">
              <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold flex items-center gap-1.5">
                <Timer size={15} className="text-am-magenta" />
                A oferta encerra em:
              </span>
              <div className="flex items-center gap-2">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-2 rounded-xl text-center min-w-16">
                  <span className="text-2xl font-black text-white font-mono">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className="block text-[10px] text-zinc-400 uppercase font-bold">Horas</span>
                </div>
                <span className="text-2xl font-black text-am-magenta">:</span>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-2 rounded-xl text-center min-w-16">
                  <span className="text-2xl font-black text-white font-mono">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className="block text-[10px] text-zinc-400 uppercase font-bold">Min</span>
                </div>
                <span className="text-2xl font-black text-am-magenta">:</span>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-2 rounded-xl text-center min-w-16">
                  <span className="text-2xl font-black text-am-magenta font-mono">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className="block text-[10px] text-zinc-400 uppercase font-bold">Seg</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {promoProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
