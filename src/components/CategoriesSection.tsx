"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES } from "@/data/products";
import { useAdmin } from "@/context/AdminContext";

interface CategoriesSectionProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const { products } = useAdmin();
  return (
    <section id="categorias" className="py-10 sm:py-12 bg-white border-b border-am-gray-200">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-am-magenta font-extrabold text-xs tracking-widest uppercase mb-1">
              <span className="w-6 h-0.5 bg-am-magenta"></span>
              Coleções & Departamentos
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-am-black tracking-tight">
              CATEGORIAS EM DESTAQUE
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectCategory(null)}
              className={`text-xs px-4 py-2 rounded-full font-bold transition-all ${
                selectedCategory === null
                  ? "bg-am-black text-white shadow-sm"
                  : "bg-am-gray-100 text-zinc-600 hover:bg-am-gray-200"
              }`}
            >
              Ver Todas as Peças
            </button>
          </div>
        </div>

        {/* Categories Grid / Mobile Touch Scroll */}
        <div className="flex overflow-x-auto pb-4 pt-1 gap-3 snap-x snap-mandatory sm:grid sm:grid-cols-3 lg:grid-cols-6 sm:gap-6 sm:overflow-visible sm:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const liveCount = (products && products.length > 0)
              ? products.filter((p: any) => {
                  const arr = Array.isArray(p.categories) ? p.categories : [];
                  const c = (p.category || "").toLowerCase();
                  return arr.includes(cat.id) || c === cat.id;
                }).length
              : cat.itemCount;

            return (
              <div
                key={cat.id}
                onClick={() => {
                  onSelectCategory(isSelected ? null : cat.id);
                  const el = document.getElementById("destaques");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-am-gray-50 border-2 transition-all duration-300 hover:shadow-lg shrink-0 w-[140px] xs:w-[160px] sm:w-auto snap-start ${
                  isSelected
                    ? "border-am-magenta ring-2 ring-am-magenta/30 scale-[1.02]"
                    : "border-am-gray-200 hover:border-am-magenta"
                }`}
              >
                {/* Image */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-200">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Floating count badge */}
                  <span className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-sm text-am-black text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm">
                    {liveCount} {liveCount === 1 ? "peça" : "peças"}
                  </span>
                </div>

                {/* Content at Bottom */}
                <div className="absolute inset-x-0 bottom-0 p-3 text-white">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-sm sm:text-base leading-tight drop-shadow-sm group-hover:text-am-magenta transition-colors">
                      {cat.name}
                    </h3>
                    <div className="w-6 h-6 rounded-full bg-white/20 group-hover:bg-am-magenta text-white flex items-center justify-center transition-colors">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
