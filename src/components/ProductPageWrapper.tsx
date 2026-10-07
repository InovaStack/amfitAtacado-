"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductDetailClient } from "@/components/ProductDetailClient";
import { useAdmin } from "@/context/AdminContext";
import { PRODUCTS, getProductSlug, slugify, Product } from "@/data/products";

interface ProductPageWrapperProps {
  slug: string;
}

export const ProductPageWrapper: React.FC<ProductPageWrapperProps> = ({ slug }) => {
  const { products } = useAdmin();

  // Procurar o produto na lista viva do AdminContext e depois no PRODUCTS estático
  const decoded = decodeURIComponent(slug).toLowerCase();
  const allAvailable = products && products.length > 0 ? products : PRODUCTS;

  const foundProduct: any = allAvailable.find((p: any) => {
    const fullSlug = getProductSlug(p).toLowerCase();
    const nameSlug = slugify(p.name || "");
    const idMatches = (p.id || "").toLowerCase() === decoded;
    return idMatches || fullSlug === decoded || nameSlug === decoded || decoded.endsWith((p.id || "").toLowerCase());
  });

  if (!foundProduct) {
    return (
      <main className="min-h-screen bg-white flex flex-col justify-between">
        <Navbar />
        <div className="max-w-md mx-auto text-center py-24 px-4">
          <div className="w-16 h-16 bg-pink-100 text-am-magenta rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-2xl">
            ?
          </div>
          <h1 className="text-2xl font-black text-am-black mb-2">Produto não encontrado</h1>
          <p className="text-sm text-zinc-500 mb-6">
            O produto que você está procurando pode ter esgotado ou mudado de link.
          </p>
          <Link
            href="/catalogo"
            className="inline-block px-6 py-3 bg-am-black text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-zinc-800 transition-colors"
          >
            Ver catálogo completo
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  // Related products from same category or department
  const relatedProducts = allAvailable
    .filter((p: any) => p.id !== foundProduct.id && (p.category === foundProduct.category || p.department === foundProduct.department))
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-white flex flex-col justify-between">
      <Navbar />
      <ProductDetailClient product={foundProduct} relatedProducts={relatedProducts} />
      <Footer />
    </main>
  );
};
