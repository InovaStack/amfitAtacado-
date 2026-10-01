"use client";

import React from "react";
import { Trophy, Star, TrendingUp } from "lucide-react";
import { Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

interface BestSellersProps {
  products: Product[];
}

export const BestSellers: React.FC<BestSellersProps> = ({ products }) => {
  const bestSellers = products.filter((p) => p.isBestSeller);

  return (
    <section id="mais-vendidos" className="py-16 bg-am-gray-50/70">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-am-magenta font-extrabold text-xs tracking-widest uppercase mb-1">
              <Trophy size={14} />
              Favoritos das Clientes
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-am-black tracking-tight">
              OS MAIS VENDIDOS
            </h2>
            <p className="text-sm text-zinc-500 mt-1">
              Peças campeãs de recompra no varejo e com giro rápido garantido para revendedoras de atacado.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-600 bg-white px-3.5 py-2 rounded-full border border-zinc-200">
            <TrendingUp size={14} className="text-am-magenta" />
            <span>Mais de 10.000 pedidos entregues</span>
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
