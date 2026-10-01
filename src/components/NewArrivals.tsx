"use client";

import React from "react";
import { Flame, ArrowRight } from "lucide-react";
import { Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

interface NewArrivalsProps {
  products: Product[];
}

export const NewArrivals: React.FC<NewArrivalsProps> = ({ products }) => {
  const newProducts = products.filter((p) => p.isNew);

  return (
    <section id="novidades" className="py-16 bg-white border-y border-am-gray-200">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-am-magenta font-extrabold text-xs tracking-widest uppercase mb-1">
              <Flame size={14} className="animate-bounce" />
              Recém-chegados
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-am-black tracking-tight">
              NOVIDADES DA SEMANA
            </h2>
            <p className="text-sm text-zinc-500 mt-1">
              As últimas tendências da moda fitness acabaram de aterrissar em nossa confecção.
            </p>
          </div>

          <a
            href="#destaques"
            className="inline-flex items-center gap-2 text-xs font-bold text-am-black hover:text-am-magenta transition-colors"
          >
            <span>Ver todo o catálogo</span>
            <ArrowRight size={14} />
          </a>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
