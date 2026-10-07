"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

interface FeaturedProductsProps {
  products: Product[];
  selectedCategory: string | null;
  onClearCategory: () => void;
  searchQuery?: string;
  onClearSearch?: () => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  selectedCategory,
  onClearCategory,
  searchQuery,
  onClearSearch,
}) => {
  const isSearching = Boolean(searchQuery && searchQuery.trim() !== "");

  const filteredProducts = isSearching
    ? products
    : selectedCategory
    ? products.filter((p) => {
        const catArray = Array.isArray(p.categories) ? p.categories : [];
        const singleCat = (p.category || "").toLowerCase();
        return catArray.includes(selectedCategory) || singleCat === selectedCategory;
      })
    : products.filter((p) => p.isFeatured || p.isNew || products.indexOf(p) < 12);

  return (
    <section id="destaques" className="py-10 sm:py-14 bg-am-gray-50/50">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-am-magenta font-extrabold text-xs tracking-widest uppercase mb-1">
              <Sparkles size={14} />
              {isSearching ? "Busca no Catálogo" : "Seleção Premium"}
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-am-black tracking-tight uppercase">
              {isSearching
                ? `Resultados para "${searchQuery}" (${filteredProducts.length})`
                : selectedCategory
                ? `Peças Filtradas (${filteredProducts.length})`
                : "Destaques da Loja"}
            </h2>
            <p className="text-sm text-zinc-500 mt-1 max-w-xl">
              Modelos de alta tecnologia têxtil com zero transparência, caimento perfeito e costura reforçada para treino e dia a dia.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isSearching && onClearSearch && (
              <button
                type="button"
                onClick={onClearSearch}
                className="text-xs font-bold text-am-magenta underline hover:text-am-magenta-dark self-start sm:self-auto"
              >
                Limpar busca
              </button>
            )}
            {selectedCategory && (
              <button
                type="button"
                onClick={onClearCategory}
                className="text-xs font-bold text-am-magenta underline hover:text-am-magenta-dark self-start sm:self-auto"
              >
                Limpar filtro de categoria
              </button>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Botão Ver Catálogo Completo */}
        {filteredProducts.length > 0 && !isSearching && !selectedCategory && (
          <div className="mt-8 sm:mt-10 text-center">
            <a
              href="/catalogo"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-am-black text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl hover:bg-am-magenta transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Ver Catálogo Completo
            </a>
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-zinc-300">
            <p className="text-zinc-500 font-medium mb-3">Nenhum produto encontrado nesta categoria no momento.</p>
            <button
              type="button"
              onClick={onClearCategory}
              className="px-5 py-2.5 bg-am-black text-white text-xs font-bold rounded-full hover:bg-am-magenta transition-colors"
            >
              Ver Todos os Produtos
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
