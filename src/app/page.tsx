"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroBanner } from "@/components/HeroBanner";
import { CategoriesSection } from "@/components/CategoriesSection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { useAdmin } from "@/context/AdminContext";

export default function Home() {
  const { products } = useAdmin();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState<string>("");

  // Filter products by search if query exists
  const displayedProducts = products.filter((p: any) => {
    if (!searchFilter) return true;
    const q = searchFilter.toLowerCase();
    return (
      (p.name || "").toLowerCase().includes(q) ||
      (p.categoryLabel || "").toLowerCase().includes(q) ||
      (p.fabric || "").toLowerCase().includes(q) ||
      (p.description || "").toLowerCase().includes(q)
    );
  });

  return (
    <main className="min-h-screen bg-white">
      {/* 1. Header / Navbar */}
      <Navbar onSearch={(query) => setSearchFilter(query)} />

      {/* 2. Banner principal */}
      <HeroBanner />

      {/* 3. Categorias */}
      <CategoriesSection
        selectedCategory={selectedCategory}
        onSelectCategory={(catId) => setSelectedCategory(catId)}
      />

      {/* 4. Vitrine Principal / Busca */}
      <FeaturedProducts
        products={displayedProducts}
        selectedCategory={selectedCategory}
        onClearCategory={() => setSelectedCategory(null)}
        searchQuery={searchFilter}
        onClearSearch={() => setSearchFilter("")}
      />

      {/* 5. FAQ e Atendimento */}
      <ContactSection />

      {/* 7. Rodapé */}
      <Footer />
    </main>
  );
}
