"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroBanner } from "@/components/HeroBanner";
import { CategoriesSection } from "@/components/CategoriesSection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { NewArrivals } from "@/components/NewArrivals";
import { BestSellers } from "@/components/BestSellers";
import { PromoSection } from "@/components/PromoSection";
import { WholesaleCTA } from "@/components/WholesaleCTA";
import { RetailCTA } from "@/components/RetailCTA";
import { InstagramFeed } from "@/components/InstagramFeed";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { PRODUCTS } from "@/data/products";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState<string>("");

  // Filter products by search if query exists
  const displayedProducts = PRODUCTS.filter((p) => {
    if (!searchFilter) return true;
    const q = searchFilter.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.fabric.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  });

  return (
    <main className="min-h-screen bg-white">
      {/* 1. Header / Navbar */}
      <Navbar onSearch={(query) => setSearchFilter(query)} />

      {/* 2. Banner principal com campanhas e coleções */}
      <HeroBanner />

      {/* 3. Categorias */}
      <CategoriesSection
        selectedCategory={selectedCategory}
        onSelectCategory={(catId) => setSelectedCategory(catId)}
      />

      {/* 4. Destaques da loja */}
      <FeaturedProducts
        products={displayedProducts}
        selectedCategory={selectedCategory}
        onClearCategory={() => setSelectedCategory(null)}
        searchQuery={searchFilter}
        onClearSearch={() => setSearchFilter("")}
      />

      {/* 5. Novidades */}
      <NewArrivals products={displayedProducts} />

      {/* 6. Mais vendidos */}
      <BestSellers products={displayedProducts} />

      {/* 7. Produtos em promoção */}
      <PromoSection products={displayedProducts} />

      {/* 8. Chamada para compra no atacado */}
      <WholesaleCTA />

      {/* 9. Chamada para compra no varejo */}
      <RetailCTA />

      {/* 10. Instagram / redes sociais */}
      <InstagramFeed />

      {/* 11. Informações de contato */}
      <ContactSection />

      {/* 12. Rodapé completo */}
      <Footer />
    </main>
  );
}
