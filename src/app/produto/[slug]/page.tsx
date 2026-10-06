import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS, getProductBySlug, getProductSlug, Product } from "@/data/products";
import { ProductDetailClient } from "@/components/ProductDetailClient";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { STORE_CONFIG } from "@/config/store";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: getProductSlug(product),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return {
      title: "Produto não encontrado | AM FIT",
      description: "O produto solicitado não foi localizado em nossa loja online.",
    };
  }

  const title = `${product.name} | AM FIT - Moda Fitness Atacado & Varejo`;
  const description = `${product.description.slice(0, 155)}... Compre no atacado direto da fábrica ou no varejo com entrega rápida.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: product.images[0] || "/logo.jpg",
          width: 800,
          height: 1000,
          alt: product.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.images[0] || "/logo.jpg"],
    },
  };
}

export default function ProductPage({ params }: PageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
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
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.department === product.department)
  ).slice(0, 4);

  // Structured Data (JSON-LD) for Google Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: STORE_CONFIG.name,
    },
    offers: [
      {
        "@type": "Offer",
        name: "Varejo",
        priceCurrency: "BRL",
        price: product.retailPrice,
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
      },
      {
        "@type": "Offer",
        name: "Atacado",
        priceCurrency: "BRL",
        price: product.wholesalePrice,
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewsCount,
    },
  };

  return (
    <main className="min-h-screen bg-white flex flex-col justify-between">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
      <Footer />
    </main>
  );
}
