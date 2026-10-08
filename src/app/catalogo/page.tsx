"use client";

import React, { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  Filter, 
  Search, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Grid3X3, 
  LayoutList, 
  X, 
  ChevronRight, 
  Building2, 
  UserCheck, 
  Package, 
  Sparkles,
  Layers,
  Check
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { CATALOG_CATEGORIES, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useAdmin } from "@/context/AdminContext";

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("categoria") || "todos";

  const { mode, setMode, setQuickViewProduct } = useCart();
  const { products } = useAdmin();

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("todos");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"destaque" | "menor-preco" | "maior-preco" | "nome">("destaque");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Filter products based on search, category, department, size
  const filteredProducts = useMemo(() => {
    const normalizeText = (text: string) =>
      (text || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();

    return products.filter((product: any) => {
      // 1. Search filter (name, sku, description, fabric, tags, colors)
      if (searchQuery.trim()) {
        const q = normalizeText(searchQuery);
        const matchesName = normalizeText(product.name).includes(q);
        const matchesSku = normalizeText(product.sku).includes(q);
        const matchesDesc = normalizeText(product.description).includes(q);
        const matchesFabric = normalizeText(product.fabric).includes(q);
        const matchesTags = Array.isArray(product.tags) && product.tags.some((t: string) => normalizeText(t).includes(q));
        const matchesColors = Array.isArray(product.colors) && product.colors.some((c: any) => normalizeText(typeof c === "string" ? c : c.name).includes(q));
        if (!matchesName && !matchesSku && !matchesDesc && !matchesFabric && !matchesTags && !matchesColors) return false;
      }

      // 2. Category filter
      if (selectedCategory !== "todos") {
        const targetCat = normalizeText(selectedCategory);
        const catArray = Array.isArray(product.categories) ? product.categories.map((c: string) => normalizeText(c)) : [];
        const singleCat = normalizeText(product.category);
        if (!catArray.includes(targetCat) && singleCat !== targetCat) return false;
      }

      // 3. Department filter
      if (selectedDepartment !== "todos") {
        if (normalizeText(product.department) !== normalizeText(selectedDepartment)) return false;
      }

      // 4. Size filter
      if (selectedSize) {
        if (!Array.isArray(product.sizes) || !product.sizes.includes(selectedSize)) return false;
      }

      return true;
    }).sort((a: any, b: any) => {
      const priceA = mode === "atacado" ? (a.wholesalePrice ?? a.priceWholesale ?? 0) : (a.retailPrice ?? a.priceRetail ?? 0);
      const priceB = mode === "atacado" ? (b.wholesalePrice ?? b.priceWholesale ?? 0) : (b.retailPrice ?? b.priceRetail ?? 0);

      if (sortBy === "menor-preco") return priceA - priceB;
      if (sortBy === "maior-preco") return priceB - priceA;
      if (sortBy === "nome") return (a.name || "").localeCompare(b.name || "");
      return (b.rating || 5) - (a.rating || 5); // default: best rated / destaque
    });
  }, [products, selectedCategory, selectedDepartment, selectedSize, searchQuery, sortBy, mode]);

  const clearAllFilters = () => {
    setSelectedCategory("todos");
    setSelectedDepartment("todos");
    setSelectedSize("");
    setSearchQuery("");
    setSortBy("destaque");
  };

  const hasActiveFilters =
    selectedCategory !== "todos" ||
    selectedDepartment !== "todos" ||
    selectedSize !== "" ||
    searchQuery.trim() !== "";

  return (
    <div className="min-h-screen bg-am-gray-50/40">
      <Navbar onSearch={(q) => setSearchQuery(q)} />

      {/* Breadcrumb & Top Bar */}
      <div className="bg-white border-b border-am-gray-200">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-zinc-500 font-medium">
              <Link href="/" className="hover:text-am-magenta transition-colors">Início</Link>
              <ChevronRight size={14} className="text-zinc-300" />
              <span className="text-am-black font-bold">Catálogo de Produtos</span>
              {selectedCategory !== "todos" && (
                <>
                  <ChevronRight size={14} className="text-zinc-300" />
                  <span className="text-am-magenta font-bold capitalize">
                    {CATALOG_CATEGORIES.find((c) => c.id === selectedCategory)?.name || selectedCategory}
                  </span>
                </>
              )}
            </div>

            {/* Wholesale switch inside header */}
            <div className="flex items-center gap-3">
              <span className="text-zinc-500 hidden sm:inline">Exibir preços em:</span>
              <div className="bg-am-gray-100 p-0.5 rounded-full border border-am-gray-300 flex items-center">
                <button
                  type="button"
                  onClick={() => setMode("varejo")}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
                    mode === "varejo" ? "bg-white text-am-black shadow-xs" : "text-zinc-500"
                  }`}
                >
                  <UserCheck size={12} />
                  Varejo
                </button>
                <button
                  type="button"
                  onClick={() => setMode("atacado")}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
                    mode === "atacado" ? "bg-am-magenta text-white shadow-magenta-sm" : "text-zinc-500"
                  }`}
                >
                  <Building2 size={12} />
                  Atacado
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Catalog Header */}
      <div className="bg-white border-b border-am-gray-200 py-8">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="max-w-3xl">
            <span className="text-xs font-extrabold text-am-magenta uppercase tracking-widest flex items-center gap-1.5 mb-1">
              <Sparkles size={14} />
              Linha Completa AM FIT
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-am-black tracking-tight uppercase">
              Catálogo de Produtos
            </h1>
            <p className="text-sm text-zinc-500 mt-2 leading-relaxed">
              Explore nossa confecção completa com códigos de referência, detalhes de estoque pronta-entrega, 
              tabela de atacado para revenda e grade de variações em poliamida de alta gramatura.
            </p>
          </div>

          {/* Category Horizontal Pills */}
          <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {CATALOG_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                    active
                      ? "bg-am-black text-white border-am-black shadow-sm"
                      : "bg-am-gray-50 text-zinc-700 border-am-gray-200 hover:border-am-magenta hover:bg-white"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      active ? "bg-am-magenta text-white" : "bg-zinc-200 text-zinc-600"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Catalog Body: Filters + Product Grid */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-10">
        
        {/* Search, Sort and Layout Controls Bar */}
        <div className="bg-white p-4 rounded-2xl border border-am-gray-200 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search by name or SKU */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nome, SKU (ex: REF-AM8401) ou tecido..."
              className="w-full py-2.5 pl-10 pr-8 text-xs bg-am-gray-50 border border-am-gray-300 rounded-xl focus:outline-none focus:border-am-magenta focus:ring-2 focus:ring-am-magenta/20 transition-all text-zinc-900"
            />
            <Search size={16} className="absolute left-3.5 top-3 text-zinc-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-3 text-zinc-400 hover:text-zinc-700"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Right Controls: Sort & Layout */}
          <div className="flex items-center justify-between w-full md:w-auto gap-3">
            
            {/* Mobile Filter Trigger */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className={`lg:hidden px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 ${
                hasActiveFilters
                  ? "bg-am-magenta text-white border-am-magenta shadow-magenta-sm"
                  : "bg-am-gray-50 text-zinc-700 border-am-gray-300 hover:bg-am-gray-100"
              }`}
            >
              <Filter size={14} className={hasActiveFilters ? "text-white" : "text-am-magenta"} />
              <span>Filtros</span>
              {hasActiveFilters && (
                <span className="w-4 h-4 rounded-full bg-white text-am-magenta text-[10px] font-black flex items-center justify-center">
                  {(selectedCategory !== "todos" ? 1 : 0) + (selectedDepartment !== "todos" ? 1 : 0) + (selectedSize ? 1 : 0) + (searchQuery ? 1 : 0)}
                </span>
              )}
            </button>

            {/* Sort Select */}
            <div className="flex items-center gap-2 text-xs">
              <ArrowUpDown size={14} className="text-zinc-400 hidden sm:inline" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="py-2 px-3 rounded-xl border border-am-gray-300 bg-white text-xs font-semibold text-zinc-700 focus:outline-none focus:border-am-magenta"
              >
                <option value="destaque">Mais Relevantes</option>
                <option value="menor-preco">Menor Preço</option>
                <option value="maior-preco">Maior Preço</option>
                <option value="nome">Ordem Alfabética</option>
              </select>
            </div>

            {/* View Switch: Grid or List */}
            <div className="flex items-center border border-am-gray-200 rounded-xl p-1 bg-am-gray-50">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "grid" ? "bg-white text-am-black shadow-xs" : "text-zinc-400 hover:text-am-black"
                }`}
                title="Visualização em Grade"
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "list" ? "bg-white text-am-black shadow-xs" : "text-zinc-400 hover:text-am-black"
                }`}
                title="Visualização em Tabela/Lista"
              >
                <LayoutList size={16} />
              </button>
            </div>

          </div>

        </div>

        {/* Active Filters Badges */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs text-zinc-400 font-medium">Filtros ativos:</span>
            {selectedCategory !== "todos" && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-am-magenta-light text-am-magenta text-xs font-bold border border-am-magenta-border">
                Categoria: {CATALOG_CATEGORIES.find((c) => c.id === selectedCategory)?.name}
                <button onClick={() => setSelectedCategory("todos")}><X size={12} /></button>
              </span>
            )}
            {selectedDepartment !== "todos" && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 text-xs font-bold border border-zinc-200">
                Depto: {selectedDepartment}
                <button onClick={() => setSelectedDepartment("todos")}><X size={12} /></button>
              </span>
            )}
            {selectedSize && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 text-xs font-bold border border-zinc-200">
                Tamanho: {selectedSize}
                <button onClick={() => setSelectedSize("")}><X size={12} /></button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 text-xs font-bold border border-zinc-200">
                Busca: &ldquo;{searchQuery}&rdquo;
                <button onClick={() => setSearchQuery("")}><X size={12} /></button>
              </span>
            )}
            <button
              onClick={clearAllFilters}
              className="text-xs font-bold text-am-magenta hover:underline ml-2"
            >
              Limpar todos
            </button>
          </div>
        )}

        {/* Main Grid & Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Filter Sidebar (Desktop) */}
          <aside className="hidden lg:block space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-am-gray-200 shadow-xs space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-am-gray-200">
                <h3 className="font-black text-sm uppercase tracking-wider text-am-black flex items-center gap-2">
                  <SlidersHorizontal size={16} className="text-am-magenta" />
                  Filtrar Catálogo
                </h3>
                {hasActiveFilters && (
                  <button onClick={clearAllFilters} className="text-[11px] text-zinc-400 hover:text-am-magenta">
                    Redefinir
                  </button>
                )}
              </div>

              {/* Department */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wide mb-2.5">
                  Departamento
                </label>
                <div className="space-y-1.5">
                  {["todos", "Feminino", "Masculino", "Infantil"].map((dep) => (
                    <button
                      key={dep}
                      onClick={() => setSelectedDepartment(dep === "todos" ? "todos" : dep)}
                      className={`w-full px-3 py-2 rounded-xl text-xs font-semibold text-left transition-colors flex items-center justify-between ${
                        (dep === "todos" && selectedDepartment === "todos") ||
                        selectedDepartment.toLowerCase() === dep.toLowerCase()
                          ? "bg-am-magenta-light text-am-magenta font-bold border border-am-magenta-border"
                          : "text-zinc-600 hover:bg-am-gray-50"
                      }`}
                    >
                      <span className="capitalize">{dep === "todos" ? "Todos os Departamentos" : dep}</span>
                      {((dep === "todos" && selectedDepartment === "todos") ||
                        selectedDepartment.toLowerCase() === dep.toLowerCase()) && (
                        <Check size={14} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes Filter */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wide mb-2.5">
                  Tamanho
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {["P", "M", "G", "GG", "XG", "06", "08", "10", "12", "14"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(selectedSize === size ? "" : size)}
                      className={`py-1.5 text-xs font-bold rounded-xl border transition-all ${
                        selectedSize === size
                          ? "bg-am-black text-white border-am-black shadow-xs"
                          : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Wholesale Highlight Box */}
              <div className="p-4 rounded-2xl bg-am-black text-white space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-am-magenta">
                  Atacado Direto de Fábrica
                </span>
                <h4 className="text-xs font-extrabold leading-snug">
                  Revenda com lucros de até 120%
                </h4>
                <p className="text-[11px] text-zinc-300">
                  Pedido mínimo de R$ 300 ou 6 peças. Despacho no mesmo dia útil!
                </p>
                <button
                  type="button"
                  onClick={() => setMode("atacado")}
                  className="w-full mt-2 py-2 bg-am-magenta hover:bg-am-magenta-dark text-white font-bold text-[11px] uppercase tracking-wider rounded-xl transition-colors"
                >
                  Ver Tabela Atacado
                </button>
              </div>

            </div>
          </aside>

          {/* Product Listing Area */}
          <main className="lg:col-span-3 space-y-6">
            
            {/* Products Count */}
            <div className="flex items-center justify-between text-xs text-zinc-500 px-1">
              <span>
                Mostrando <strong>{filteredProducts.length}</strong> de <strong>{products.length}</strong> produtos
              </span>
              <span className="font-semibold text-am-magenta">
                {mode === "atacado" ? "Exibindo Preços de Atacado" : "Exibindo Preços de Varejo"}
              </span>
            </div>

            {/* View Mode 1: GRID */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              /* View Mode 2: DETAILED LIST / WHOLESALE TABLE VIEW */
              <div className="bg-white rounded-3xl border border-am-gray-200 shadow-xs overflow-hidden divide-y divide-am-gray-200">
                {filteredProducts.map((product) => {
                  const currentPrice = mode === "atacado" ? product.wholesalePrice : product.retailPrice;

                  return (
                    <div key={product.id} className="p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-am-gray-50/50 transition-colors">
                      
                      {/* Product Thumbnail & Basic Info */}
                      <div className="flex items-start gap-4 flex-1">
                        <div 
                          onClick={() => setQuickViewProduct(product)}
                          className="relative w-20 h-24 sm:w-24 sm:h-28 bg-zinc-100 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer shadow-xs"
                        >
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            sizes="100px"
                            className="object-cover"
                          />
                          <span className="absolute bottom-1 left-1 bg-black/80 text-white font-mono text-[9px] px-1.5 py-0.2 rounded">
                            {product.sku}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase bg-am-gray-100 text-zinc-700 px-2 py-0.5 rounded">
                              {product.department}
                            </span>
                            <span className="text-[11px] font-bold text-am-magenta uppercase">
                              {product.categoryLabel}
                            </span>
                            <span className="text-[11px] text-zinc-400">•</span>
                            <span className="text-[11px] text-emerald-700 font-bold">
                              {product.stock} peças em estoque
                            </span>
                          </div>

                          <h3 
                            onClick={() => setQuickViewProduct(product)}
                            className="font-black text-sm sm:text-base text-am-black hover:text-am-magenta cursor-pointer transition-colors"
                          >
                            {product.name}
                          </h3>

                          <p className="text-xs text-zinc-500 line-clamp-1 max-w-lg">
                            {product.description}
                          </p>

                          {/* Color swatches & sizes */}
                          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                            <div className="flex items-center gap-1">
                              <span className="text-[11px] text-zinc-400">Cores:</span>
                              {(product.colors || []).map((c: any) => (
                                <span
                                  key={typeof c === "string" ? c : c.name}
                                  className="w-3.5 h-3.5 rounded-full border border-zinc-300 inline-block"
                                  style={{ backgroundColor: typeof c === "string" ? "#000000" : (c.hex || "#000000") }}
                                  title={typeof c === "string" ? c : c.name}
                                />
                              ))}
                            </div>
                            <span className="text-zinc-300">|</span>
                            <div className="flex items-center gap-1">
                              <span className="text-[11px] text-zinc-400">Tamanhos:</span>
                              <span className="font-bold text-zinc-800">{product.sizes.join(", ")}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Pricing & Variations Action */}
                      <div className="flex items-center justify-between w-full md:w-auto md:flex-col md:items-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-am-gray-100">
                        <div className="text-left md:text-right">
                          <div className="flex items-baseline gap-1">
                            <span className="text-xs text-zinc-500 font-bold">R$</span>
                            <span className="text-2xl font-black text-am-black">
                              {currentPrice.toFixed(2).replace(".", ",")}
                            </span>
                          </div>
                          <span className="text-[11px] text-zinc-400 block">
                            {mode === "atacado" ? `Mínimo: ${product.minWholesaleQty} pçs` : `No atacado: R$ ${product.wholesalePrice.toFixed(2).replace(".", ",")}`}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setQuickViewProduct(product)}
                            className="px-4 py-2 bg-am-black hover:bg-am-magenta text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
                          >
                            <Layers size={13} />
                            <span>Variações & Compra</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

            {/* Zero results placeholder */}
            {filteredProducts.length === 0 && (
              <div className="bg-white p-12 rounded-3xl border border-dashed border-zinc-300 text-center space-y-4">
                <Package size={40} className="text-zinc-300 mx-auto" />
                <h3 className="font-black text-lg text-am-black">
                  Nenhum produto encontrado
                </h3>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                  Não encontramos produtos com os filtros selecionados. Tente buscar por outro termo ou limpe os filtros.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 bg-am-black hover:bg-am-magenta text-white font-bold text-xs uppercase tracking-wider rounded-full transition-colors"
                >
                  Limpar Todos os Filtros
                </button>
              </div>
            )}

          </main>
        </div>
      </div>

      {/* Mobile Filter Bottom Sheet Drawer (lg:hidden) */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          {/* Backdrop */}
          <div
            onClick={() => setMobileFilterOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          {/* Bottom Sheet Modal */}
          <div className="relative z-10 w-full max-h-[85vh] bg-white rounded-t-3xl shadow-2xl flex flex-col overflow-hidden">
            {/* Grab Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <span className="w-12 h-1.5 rounded-full bg-zinc-300" />
            </div>

            {/* Header */}
            <div className="px-5 py-3 border-b border-am-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-am-magenta" />
                <h3 className="font-black text-base uppercase tracking-tight text-am-black">
                  Filtrar Catálogo
                </h3>
              </div>
              <div className="flex items-center gap-2">
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs font-bold text-am-magenta px-2 py-1 rounded hover:bg-am-magenta-light transition-colors"
                  >
                    Redefinir
                  </button>
                )}
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100 transition-colors"
                  aria-label="Fechar filtros"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Scrollable Filters Content */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
              
              {/* Department */}
              <div>
                <label className="block text-xs font-black text-zinc-800 uppercase tracking-wider mb-2.5">
                  Departamento
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["todos", "Feminino", "Masculino", "Infantil"].map((dep) => {
                    const isSelected =
                      (dep === "todos" && selectedDepartment === "todos") ||
                      selectedDepartment.toLowerCase() === dep.toLowerCase();

                    return (
                      <button
                        key={dep}
                        onClick={() => setSelectedDepartment(dep === "todos" ? "todos" : dep)}
                        className={`px-3 py-2.5 rounded-xl text-xs font-bold text-left flex items-center justify-between border transition-all active:scale-95 ${
                          isSelected
                            ? "bg-am-magenta-light text-am-magenta border-am-magenta-border ring-1 ring-am-magenta"
                            : "bg-am-gray-50 text-zinc-700 border-am-gray-200 hover:bg-white"
                        }`}
                      >
                        <span className="capitalize">{dep === "todos" ? "Todos os Departamentos" : dep}</span>
                        {isSelected && <Check size={14} className="text-am-magenta" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Categories */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs font-black text-zinc-800 uppercase tracking-wider">
                    Categorias
                  </label>
                  <span className="text-[11px] text-zinc-400">{CATALOG_CATEGORIES.length} coleções</span>
                </div>
                <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                  {CATALOG_CATEGORIES.map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-3 py-2 rounded-xl text-xs text-left flex items-center justify-between border transition-all active:scale-95 ${
                          isSelected
                            ? "bg-am-black text-white font-bold border-am-black shadow-xs"
                            : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300"
                        }`}
                      >
                        <span className="truncate pr-1">{cat.name}</span>
                        <span className={`text-[10px] shrink-0 font-bold ${isSelected ? "text-am-magenta" : "text-zinc-400"}`}>
                          {cat.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sizes Filter */}
              <div>
                <label className="block text-xs font-black text-zinc-800 uppercase tracking-wider mb-2.5">
                  Grade de Tamanhos
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {["P", "M", "G", "GG", "XG", "06", "08", "10", "12", "14"].map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(isSelected ? "" : size)}
                        className={`h-10 text-xs font-bold rounded-xl border flex items-center justify-center transition-all active:scale-95 ${
                          isSelected
                            ? "bg-am-black text-white border-am-black shadow-xs ring-2 ring-am-black/20"
                            : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Wholesale banner reminder in sheet */}
              <div className="p-3.5 rounded-2xl bg-zinc-900 text-white flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[10px] font-black uppercase text-am-magenta">Modo B2B Fábrica</div>
                  <div className="text-xs font-bold truncate">Compre no Atacado (Mín. R$ 300)</div>
                </div>
                <button
                  type="button"
                  onClick={() => setMode(mode === "atacado" ? "varejo" : "atacado")}
                  className={`text-[11px] font-black uppercase px-3 py-1.5 rounded-lg shrink-0 transition-colors ${
                    mode === "atacado"
                      ? "bg-emerald-600 text-white"
                      : "bg-am-magenta text-white"
                  }`}
                >
                  {mode === "atacado" ? "Ativado" : "Ativar"}
                </button>
              </div>

            </div>

            {/* Bottom Actions Bar (Sticky in Sheet) */}
            <div className="p-4 border-t border-am-gray-200 bg-white shadow-lg space-y-2 pb-[calc(1rem+env(safe-area-inset-bottom))]">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full h-12 bg-am-magenta hover:bg-am-magenta-dark active:scale-95 text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-magenta flex items-center justify-center gap-2 transition-all"
              >
                <span>Ver {filteredProducts.length} Peças Encontradas</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default function CatalogoPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center font-bold">Carregando catálogo AM FIT...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
