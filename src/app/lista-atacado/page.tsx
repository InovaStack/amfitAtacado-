"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PRODUCTS, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useAdmin } from "@/context/AdminContext";
import {
  Layers,
  Sparkles,
  CheckCircle2,
  ShoppingCart,
  Plus,
  Minus,
  AlertCircle,
  TrendingUp,
  ShieldCheck,
  Building2,
  Trash2,
  PackageCheck,
  ChevronDown,
  Filter,
  Search,
} from "lucide-react";

// Predefined Wholesale Collections
const WHOLESALE_COLLECTIONS = [
  {
    id: "verao-2026",
    name: "Coleção Verão 2026",
    tagline: "Cores vibrantes, tecidos ultra respiráveis e zero transparência para o pico do calor.",
    bannerImage: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1600&q=80",
    badge: "Coleção Principal",
    categoryFilter: "all",
  },
  {
    id: "alto-giro-basicos",
    name: "Linha Básica de Alto Giro",
    tagline: "Camisetas, tops e leggings pretas e chumbo com margens de 100% de lucro na revenda.",
    bannerImage: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=1600&q=80",
    badge: "Mais Vendidos",
    categoryFilter: "camisetas",
  },
  {
    id: "seamless-compressao",
    name: "Linha Sem Costura & Compressão Pro",
    tagline: "Tecnologia Seamless italiana que modela sem marcar para clientes exigentes.",
    bannerImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1600&q=80",
    badge: "Alta Tecnologia",
    categoryFilter: "seamless",
  },
];

export default function GradeAtacadoPage() {
  const { mode, setMode, addMultipleToCart, setIsCartOpen } = useCart();
  const { products, storeConfig } = useAdmin();

  const [activeCollectionId, setActiveCollectionId] = useState("verao-2026");
  const [selectedColorPerProduct, setSelectedColorPerProduct] = useState<Record<string, string>>({});
  // Quantities state: key is `${productId}-${colorName}-${size}` -> number
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const activeCollection = useMemo(() => {
    return (
      WHOLESALE_COLLECTIONS.find((c) => c.id === activeCollectionId) ||
      WHOLESALE_COLLECTIONS[0]
    );
  }, [activeCollectionId]);

  // Filter products for this collection
  const collectionProducts = useMemo(() => {
    const list = products && products.length > 0 ? products : PRODUCTS;
    if (activeCollection.categoryFilter === "camisetas") {
      return list.filter((p: any) => p.category === "camisetas" || p.type === "Camisetas" || p.category === "tops");
    }
    if (activeCollection.categoryFilter === "seamless") {
      return list.filter((p: any) => p.category === "seamless" || (p.fabric || "").toLowerCase().includes("seamless"));
    }
    return list;
  }, [products, activeCollection]);

  // Helper to get selected color for a product (defaults to first color)
  const getSelectedColor = (prod: Product) => {
    return selectedColorPerProduct[prod.id] || prod.colors[0]?.name || "Padrão";
  };

  // Helper to set selected color
  const handleSelectColor = (productId: string, colorName: string) => {
    setSelectedColorPerProduct((prev) => ({
      ...prev,
      [productId]: colorName,
    }));
  };

  // Helper to get quantity for a specific size of the current selected color
  const getQty = (productId: string, colorName: string, size: string) => {
    const key = `${productId}-${colorName}-${size}`;
    return quantities[key] || 0;
  };

  // Update quantity with validation
  const updateQty = (productId: string, colorName: string, size: string, delta: number) => {
    const key = `${productId}-${colorName}-${size}`;
    const current = quantities[key] || 0;
    const next = Math.max(0, current + delta);
    setQuantities((prev) => ({
      ...prev,
      [key]: next,
    }));
  };

  const setDirectQty = (productId: string, colorName: string, size: string, val: number) => {
    const key = `${productId}-${colorName}-${size}`;
    const next = Math.max(0, isNaN(val) ? 0 : val);
    setQuantities((prev) => ({
      ...prev,
      [key]: next,
    }));
  };

  // Quick fill preset (e.g. 2 de cada tamanho da cor atual)
  const quickFillGrade = (prod: Product, colorName: string, qtyEach: number) => {
    setQuantities((prev) => {
      const copy = { ...prev };
      prod.sizes.forEach((sz) => {
        const key = `${prod.id}-${colorName}-${sz}`;
        copy[key] = (copy[key] || 0) + qtyEach;
      });
      return copy;
    });
  };

  // Calculate totals for a specific product across all sizes and colors
  const getProductGridSummary = (prod: Product) => {
    let totalPieces = 0;
    Object.keys(quantities).forEach((k) => {
      if (k.startsWith(`${prod.id}-`)) {
        totalPieces += quantities[k] || 0;
      }
    });
    const subtotal = totalPieces * prod.wholesalePrice;
    return { totalPieces, subtotal };
  };

  // Add all selected items of a specific product to cart
  const handleAddProductGradeToCart = (prod: Product) => {
    const itemsToAdd: { product: Product; size: string; color: string; quantity: number }[] = [];

    Object.keys(quantities).forEach((k) => {
      if (k.startsWith(`${prod.id}-`) && quantities[k] > 0) {
        // format: `${productId}-${colorName}-${size}`
        const parts = k.split("-");
        const size = parts[parts.length - 1];
        const colorName = parts.slice(1, parts.length - 1).join("-");
        itemsToAdd.push({
          product: prod,
          size,
          color: colorName,
          quantity: quantities[k],
        });
      }
    });

    if (itemsToAdd.length === 0) {
      alert("Por favor, selecione as quantidades desejadas nos tamanhos (ex: P=2, M=3, G=3, GG=2) antes de adicionar.");
      return;
    }

    addMultipleToCart(itemsToAdd);

    // Reset quantities for this product
    setQuantities((prev) => {
      const copy = { ...prev };
      Object.keys(copy).forEach((k) => {
        if (k.startsWith(`${prod.id}-`)) {
          delete copy[k];
        }
      });
      return copy;
    });

    const totalQty = itemsToAdd.reduce((acc, it) => acc + it.quantity, 0);
    setAddedNotice(`✓ ${totalQty} peças de "${prod.name}" adicionadas com sucesso ao carrinho!`);
    setTimeout(() => setAddedNotice(null), 4000);
  };

  // Global totals for entire page selection
  const grandTotalSummary = useMemo(() => {
    let pieces = 0;
    let value = 0;

    Object.entries(quantities).forEach(([key, qty]) => {
      if (qty > 0) {
        const prodId = key.split("-")[0];
        const prod = PRODUCTS.find((p) => p.id === prodId);
        if (prod) {
          pieces += qty;
          value += qty * prod.wholesalePrice;
        }
      }
    });

    return { pieces, value };
  }, [quantities]);

  const handleAddAllToCart = () => {
    const itemsToAdd: { product: Product; size: string; color: string; quantity: number }[] = [];

    const allList: Product[] = (products && products.length > 0 ? products : PRODUCTS) as Product[];

    Object.entries(quantities).forEach(([key, qty]) => {
      if (qty > 0) {
        const parts = key.split("-");
        const prodId = parts[0];
        const size = parts[parts.length - 1];
        const colorName = parts.slice(1, parts.length - 1).join("-");
        const prod = allList.find((p) => p.id === prodId);
        if (prod) {
          itemsToAdd.push({
            product: prod,
            size,
            color: colorName,
            quantity: qty,
          });
        }
      }
    });

    if (itemsToAdd.length === 0) {
      alert("Nenhuma quantidade selecionada na grade.");
      return;
    }

    addMultipleToCart(itemsToAdd);
    setQuantities({});
    setAddedNotice(`✓ ${itemsToAdd.reduce((acc, it) => acc + it.quantity, 0)} peças adicionadas ao seu pedido no atacado!`);
    setTimeout(() => setAddedNotice(null), 4000);
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col font-sans">
      <Navbar />

      {/* Floating Alert for Added Items */}
      {addedNotice && (
        <div className="fixed top-24 right-4 z-50 bg-emerald-600 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="text-xl shrink-0" />
          <span className="text-sm font-bold">{addedNotice}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 px-3 py-1 bg-white text-emerald-800 text-xs font-black uppercase rounded-lg shadow-sm"
          >
            Ver Carrinho
          </button>
        </div>
      )}

      {/* Hero Header */}
      <section className="relative bg-zinc-950 text-white overflow-hidden py-12 sm:py-16 border-b border-zinc-800">
        <div className="absolute inset-0 opacity-25">
          <Image
            src={activeCollection.bannerImage}
            alt={activeCollection.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-am-magenta/20 border border-am-magenta/30 text-am-magenta text-xs font-bold uppercase tracking-wider mb-4">
                <Layers size={14} /> Grade Rápida Atacado (B2B)
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight font-[family-name:var(--font-heading)]">
                Lista de Compra & Grade de Pedidos
              </h1>
              <p className="mt-3 text-sm sm:text-base text-zinc-300 leading-relaxed">
                Desenvolvido especialmente para lojistas e revendedoras: selecione rapidamente grade de tamanhos (P, M, G, GG) e cores em massa com preço direto de fábrica.
              </p>
            </div>

            {/* Wholesale Status Box */}
            <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-2xl p-5 shrink-0 max-w-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-am-magenta/10 text-am-magenta flex items-center justify-center font-bold">
                  <Building2 size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase text-white">Preço de Atacado Liberado</h4>
                  <p className="text-[11px] text-zinc-400">Descontos de 40% a 55% sobre o varejo</p>
                </div>
              </div>
              <div className="text-[11px] text-zinc-400 pt-2 border-t border-zinc-800/80 flex justify-between">
                <span>Pedido mínimo atacado:</span>
                <strong className="text-white">
                  R$ {storeConfig?.commercial?.minWholesaleOrderAmount || 300} ou {storeConfig?.commercial?.minWholesalePieces || 6} peças
                </strong>
              </div>
            </div>
          </div>

          {/* Collection Switcher Tabs */}
          <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {WHOLESALE_COLLECTIONS.map((col) => (
              <button
                key={col.id}
                onClick={() => setActiveCollectionId(col.id)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-2 ${
                  activeCollectionId === col.id
                    ? "bg-am-magenta text-white shadow-lg shadow-am-magenta/30 scale-[1.02]"
                    : "bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 border border-zinc-800"
                }`}
              >
                <Sparkles size={13} />
                <span>{col.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white">
                  {col.badge}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content: Grade List View */}
      <main className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-8 flex-1">
        {/* Collection Subtitle */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 uppercase">
              {activeCollection.name}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
              {activeCollection.tagline}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-zinc-600">
              {collectionProducts.length} modelos disponíveis
            </span>
          </div>
        </div>

        {/* Product Fast-Grid Cards */}
        <div className="space-y-6">
          {collectionProducts.map((product) => {
            const selectedColor = getSelectedColor(product);
            const { totalPieces, subtotal } = getProductGridSummary(product);
            const profitMargin = Math.round(
              ((product.retailPrice - product.wholesalePrice) / product.wholesalePrice) * 100
            );

            return (
              <div
                key={product.id}
                className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Column 1: Image & Basic Info (4 cols) */}
                  <div className="lg:col-span-4 flex gap-4">
                    <div className="relative w-28 h-36 sm:w-32 sm:h-40 rounded-2xl overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 120px, 140px"
                      />
                      {product.isBestSeller && (
                        <span className="absolute top-2 left-2 bg-am-black text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                          Top Giro
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col justify-between flex-1 min-w-0">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                          REF: {product.sku}
                        </span>
                        <h3 className="text-base sm:text-lg font-black text-zinc-900 leading-snug">
                          {product.name}
                        </h3>
                        <p className="text-xs text-zinc-500 line-clamp-2 mt-1">
                          {product.fabric}
                        </p>
                      </div>

                      {/* Prices & Profit Badge */}
                      <div className="mt-3 pt-3 border-t border-zinc-100">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xs text-zinc-500">Atacado:</span>
                          <span className="text-xl sm:text-2xl font-black text-am-magenta">
                            {product.wholesalePrice.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-xs text-zinc-500">
                          <span>Sugerido Varejo: <strong>R$ {product.retailPrice.toFixed(2)}</strong></span>
                          <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-black text-[10px] border border-emerald-200">
                            +{profitMargin}% Lucro
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Color Palette Selector (3 cols) */}
                  <div className="lg:col-span-3 lg:border-l lg:border-zinc-100 lg:pl-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-black uppercase tracking-wider text-zinc-800">
                        1. Escolha a Cor:
                      </span>
                      <span className="text-xs font-bold text-am-magenta">
                        {selectedColor}
                      </span>
                    </div>

                    {/* Color Pills & Swatches */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(product.colors || []).map((c: any) => {
                        const cName = typeof c === "string" ? c : c.name;
                        const cHex = typeof c === "string" ? "#000000" : (c.hex || "#000000");
                        const isSelected = selectedColor === cName;
                        return (
                          <button
                            key={cName}
                            type="button"
                            onClick={() => handleSelectColor(product.id, cName)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                              isSelected
                                ? "bg-zinc-900 text-white border-zinc-900 shadow-sm ring-2 ring-am-magenta/40"
                                : "bg-zinc-50 hover:bg-zinc-100 text-zinc-700 border-zinc-200"
                            }`}
                          >
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0"
                              style={{ backgroundColor: cHex }}
                            />
                            <span>{cName}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Quick grade preset button */}
                    <div className="pt-2">
                      <span className="text-[11px] text-zinc-400 font-semibold block mb-1.5">
                        Preenchimento Rápido na cor {selectedColor}:
                      </span>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => quickFillGrade(product, selectedColor, 1)}
                          className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200"
                        >
                          +1 de cada
                        </button>
                        <button
                          type="button"
                          onClick={() => quickFillGrade(product, selectedColor, 2)}
                          className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200"
                        >
                          +2 de cada (Grade P/M/G/GG)
                        </button>
                        <button
                          type="button"
                          onClick={() => quickFillGrade(product, selectedColor, 3)}
                          className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200"
                        >
                          +3 de cada
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Column 3: Fast Size Grade Matrix (5 cols) */}
                  <div className="lg:col-span-5 lg:border-l lg:border-zinc-100 lg:pl-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-black uppercase tracking-wider text-zinc-800">
                          2. Defina as Quantidades por Tamanho:
                        </span>
                        <span className="text-[11px] text-zinc-500">
                          Cor: <strong>{selectedColor}</strong>
                        </span>
                      </div>

                      {/* Size Counter Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
                        {(product.sizes || []).map((size: string) => {
                          const qty = getQty(product.id, selectedColor, size);
                          return (
                            <div
                              key={size}
                              className={`p-2.5 rounded-2xl border text-center transition-all ${
                                qty > 0
                                  ? "bg-am-magenta/5 border-am-magenta shadow-xs"
                                  : "bg-zinc-50 border-zinc-200"
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1.5 px-1">
                                <span className="font-black text-xs text-zinc-800">{size}</span>
                                {qty > 0 && (
                                  <span className="text-[10px] font-extrabold text-am-magenta">
                                    {qty} un
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center justify-between bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-2xs">
                                <button
                                  type="button"
                                  onClick={() => updateQty(product.id, selectedColor, size, -1)}
                                  disabled={qty <= 0}
                                  className="w-7 h-7 flex items-center justify-center text-zinc-600 hover:bg-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                  <Minus size={12} />
                                </button>
                                <input
                                  type="number"
                                  min="0"
                                  value={qty}
                                  onChange={(e) =>
                                    setDirectQty(
                                      product.id,
                                      selectedColor,
                                      size,
                                      parseInt(e.target.value) || 0
                                    )
                                  }
                                  className="w-8 text-center text-xs font-black text-zinc-900 focus:outline-none"
                                />
                                <button
                                  type="button"
                                  onClick={() => updateQty(product.id, selectedColor, size, 1)}
                                  className="w-7 h-7 flex items-center justify-center text-zinc-600 hover:bg-zinc-100"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Action Bar for this Product */}
                    <div className="pt-3 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="text-left w-full sm:w-auto">
                        <span className="text-xs text-zinc-500">Selecionado neste modelo:</span>
                        <div className="flex items-baseline gap-2">
                          <strong className="text-sm font-black text-zinc-900">
                            {totalPieces} peças
                          </strong>
                          <span className="text-xs text-zinc-400">•</span>
                          <span className="text-base font-black text-am-magenta">
                            {subtotal.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAddProductGradeToCart(product)}
                        disabled={totalPieces === 0}
                        className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                          totalPieces > 0
                            ? "bg-zinc-950 hover:bg-am-magenta text-white shadow-md active:scale-95"
                            : "bg-zinc-100 text-zinc-400 cursor-not-allowed"
                        }`}
                      >
                        <ShoppingCart size={15} />
                        <span>Adicionar Grade ({totalPieces})</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Floating Bottom Bar: Order Consolidation */}
      {grandTotalSummary.pieces > 0 && (
        <div className="sticky bottom-0 z-40 bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800 text-white py-4 px-4 sm:px-6 lg:px-8 shadow-2xl animate-slideUp">
          <div className="w-full max-w-[1720px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-am-magenta/20 border border-am-magenta/40 flex items-center justify-center text-am-magenta font-black text-lg">
                <PackageCheck size={26} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Grade Total Selecionada
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black border border-emerald-500/30">
                    Preço de Atacado
                  </span>
                </div>
                <div className="flex items-baseline gap-3 mt-0.5">
                  <span className="text-xl sm:text-2xl font-black text-white">
                    {grandTotalSummary.pieces} peças
                  </span>
                  <span className="text-xs text-zinc-400">•</span>
                  <span className="text-xl sm:text-2xl font-black text-am-magenta">
                    {grandTotalSummary.value.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setQuantities({})}
                className="px-4 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                title="Limpar seleção atual"
              >
                <Trash2 size={14} /> Limpar Grade
              </button>
              <button
                type="button"
                onClick={handleAddAllToCart}
                className="flex-1 sm:flex-initial px-8 py-3.5 rounded-xl bg-gradient-to-r from-am-magenta to-pink-600 hover:from-pink-600 hover:to-am-magenta text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-am-magenta/30 hover:shadow-am-magenta/50 transition-all transform active:scale-95 flex items-center justify-center gap-2"
              >
                <ShoppingCart size={16} />
                <span>Adicionar Tudo ao Carrinho ({grandTotalSummary.pieces} un)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
