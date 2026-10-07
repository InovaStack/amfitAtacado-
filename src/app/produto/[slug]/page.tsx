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

import { ProductPageWrapper } from "@/components/ProductPageWrapper";

export default function ProductPage({ params }: PageProps) {
  return <ProductPageWrapper slug={params.slug} />;
}
