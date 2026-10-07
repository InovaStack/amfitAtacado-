"use client";

import React, { useState, useRef } from "react";
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  X, 
  AlertTriangle, 
  FileDown, 
  Sparkles, 
  TrendingUp, 
  Image as ImageIcon,
  Upload,
  Check,
  Star,
  Layers,
  Tag,
  Info
} from "lucide-react";
import { useAdmin, AdminProduct } from "@/context/AdminContext";

const PRESET_SIZES = ["P", "M", "G", "GG", "XG", "Único"];
const PRESET_COLORS = [
  { name: "Preto", hex: "#000000" },
  { name: "Branco", hex: "#FFFFFF" },
  { name: "Marinho", hex: "#0B1D3A" },
  { name: "Grafite", hex: "#3A3A3A" },
  { name: "Rosa Neon", hex: "#FF1493" },
  { name: "Rosa Pink", hex: "#E91E63" },
  { name: "Vinho", hex: "#5E1224" },
  { name: "Azul Royal", hex: "#1A56DB" },
  { name: "Verde Militar", hex: "#4B5320" },
  { name: "Terracota", hex: "#CC4E2F" },
  { name: "Lavanda", hex: "#9F7AEA" },
  { name: "Nude", hex: "#D2B48C" },
];

const PRESET_CATEGORIES = [
  "Leggings",
  "Tops",
  "Conjuntos",
  "Shorts",
  "Macacões",
  "Sem Costura",
  "Camisetas",
  "Vestidos",
  "Acessórios"
];

export const ProductsTab: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useAdmin();

  // Filter & Search
  const [productSearch, setProductSearch] = useState("");
  const [productCategoryFilter, setProductCategoryFilter] = useState("all");
  const [lowStockOnly, setLowStockOnly] = useState(false);

  // Modal State
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);

  // Form State
  const [productForm, setProductForm] = useState({
    name: "",
    sku: "REF-AM8401",
    department: "Feminino",
    category: "Leggings",
    badge: "Novo",
    priceRetail: 129.9,
    priceWholesale: 64.9,
    originalPrice: 159.9,
    minWholesaleQty: 6,
    stock: 50,
    fabric: "88% Poliamida, 12% Elastano - Gramatura 320g (Zero Transparência)",
    description: "Modelagem anatômica que valoriza a silhueta, cós alto duplo anatômico e tecido de alta compressão.",
    images: [] as string[],
    sizes: ["P", "M", "G"],
    colors: ["Preto", "Marinho"],
    isFeatured: true,
    isBestSeller: false,
  });

  const [urlInput, setUrlInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openNewProductModal = () => {
    setEditingProduct(null);
    setProductForm({
      name: "",
      sku: `REF-AM${Math.floor(1000 + Math.random() * 9000)}`,
      department: "Feminino",
      category: "Leggings",
      badge: "Novo",
      priceRetail: 129.9,
      priceWholesale: 64.9,
      originalPrice: 159.9,
      minWholesaleQty: 6,
      stock: 50,
      fabric: "88% Poliamida, 12% Elastano - Gramatura 320g (Zero Transparência)",
      description: "Modelagem anatômica que valoriza a silhueta, cós alto duplo anatômico e tecido de alta compressão.",
      images: ["https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80"],
      sizes: ["P", "M", "G", "GG"],
      colors: ["Preto", "Vinho"],
      isFeatured: true,
      isBestSeller: false,
    });
    setUrlInput("");
    setProductModalOpen(true);
  };

  const openEditProductModal = (prod: AdminProduct) => {
    setEditingProduct(prod);
    const existingImages = Array.isArray(prod.images) && prod.images.length > 0 
      ? prod.images 
      : ["https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80"];

    const existingSizes = Array.isArray(prod.sizes) && prod.sizes.length > 0
      ? prod.sizes
      : ["P", "M", "G"];

    const existingColors = Array.isArray(prod.colors) && prod.colors.length > 0
      ? prod.colors.map((c: any) => (typeof c === "string" ? c : c.name))
      : ["Preto"];

    setProductForm({
      name: prod.name || "",
      sku: prod.sku || `REF-AM${Math.floor(1000 + Math.random() * 9000)}`,
      department: prod.department || "Feminino",
      category: prod.category || "Leggings",
      badge: prod.badge || "",
      priceRetail: prod.retailPrice ?? (prod.priceRetail || 129.9),
      priceWholesale: prod.wholesalePrice ?? (prod.priceWholesale || 64.9),
      originalPrice: prod.originalPrice || 0,
      minWholesaleQty: prod.minWholesaleQty || 6,
      stock: prod.stock || 50,
      fabric: prod.fabric || "88% Poliamida, 12% Elastano - Gramatura 320g",
      description: prod.description || "",
      images: existingImages,
      sizes: existingSizes,
      colors: existingColors,
      isFeatured: Boolean(prod.isFeatured),
      isBestSeller: Boolean(prod.isBestSeller),
    });
    setUrlInput("");
    setProductModalOpen(true);
  };

  // Image Upload Handlers
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const base64Url = event.target.result as string;
          setProductForm((prev) => ({
            ...prev,
            images: [...prev.images, base64Url],
          }));
        }
      };
      reader.readAsDataURL(file);
    });

    if (e.target) e.target.value = "";
  };

  const handleAddUrlImage = () => {
    if (!urlInput.trim()) return;
    setProductForm((prev) => ({
      ...prev,
      images: [...prev.images, urlInput.trim()],
    }));
    setUrlInput("");
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setProductForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const handleSetCoverImage = (indexToMove: number) => {
    setProductForm((prev) => {
      const img = prev.images[indexToMove];
      const rest = prev.images.filter((_, idx) => idx !== indexToMove);
      return {
        ...prev,
        images: [img, ...rest],
      };
    });
  };

  // Sizes & Colors Toggles
  const toggleSize = (size: string) => {
    setProductForm((prev) => {
      const exists = prev.sizes.includes(size);
      return {
        ...prev,
        sizes: exists ? prev.sizes.filter((s) => s !== size) : [...prev.sizes, size],
      };
    });
  };

  const toggleColor = (colorName: string) => {
    setProductForm((prev) => {
      const exists = prev.colors.includes(colorName);
      return {
        ...prev,
        colors: exists ? prev.colors.filter((c) => c !== colorName) : [...prev.colors, colorName],
      };
    });
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const priceRetailNum = Number(productForm.priceRetail) || 0;
    const priceWholesaleNum = Number(productForm.priceWholesale) || 0;
    const originalPriceNum = Number(productForm.originalPrice) || 0;

    const finalImages = productForm.images.length > 0 
      ? productForm.images 
      : ["https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80"];

    const formattedColors = productForm.colors.map((colorName) => {
      const preset = PRESET_COLORS.find((p) => p.name === colorName);
      return {
        name: colorName,
        hex: preset ? preset.hex : "#000000",
      };
    });

    const activeSizes = productForm.sizes.length > 0 ? productForm.sizes : ["P", "M", "G"];
    const totalCombos = Math.max(1, (formattedColors.length || 1) * (activeSizes.length || 1));
    const stockPerVariation = Math.max(1, Math.floor((Number(productForm.stock) || 50) / totalCombos));

    const generatedVariations = formattedColors.flatMap((colorObj) =>
      activeSizes.map((sz) => {
        const cleanSku = `${productForm.sku.trim()}-${colorObj.name.slice(0, 3).toUpperCase()}-${sz}`;
        const existingVar = (editingProduct?.variations || []).find(
          (v: any) => v.color === colorObj.name && v.size === sz
        );

        return {
          id: existingVar?.id || `var-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          sku: existingVar?.sku || cleanSku,
          color: colorObj.name,
          colorHex: colorObj.hex,
          size: sz,
          stock: existingVar ? existingVar.stock : stockPerVariation,
        };
      })
    );

    const payload = {
      name: productForm.name.trim(),
      sku: productForm.sku.trim(),
      department: productForm.department as any,
      category: productForm.category as any,
      categories: [
        productForm.department.toLowerCase(),
        productForm.category.toLowerCase(),
        "moda-fitness",
        ...(productForm.isBestSeller ? ["mais-vendidos"] : []),
        ...(productForm.isFeatured ? ["destaques"] : []),
      ],
      badge: productForm.badge.trim() || undefined,
      priceRetail: priceRetailNum,
      priceWholesale: priceWholesaleNum,
      retailPrice: priceRetailNum,
      wholesalePrice: priceWholesaleNum,
      originalPrice: originalPriceNum > 0 ? originalPriceNum : undefined,
      minWholesaleQty: Number(productForm.minWholesaleQty) || 6,
      stock: Number(productForm.stock) || 0,
      variations: generatedVariations,
      fabric: productForm.fabric.trim(),
      description: productForm.description.trim(),
      images: finalImages,
      sizes: activeSizes,
      colors: formattedColors,
      isFeatured: productForm.isFeatured,
      isBestSeller: productForm.isBestSeller,
      rating: 5.0,
      reviewsCount: 14,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, payload);
    } else {
      addProduct(payload as any);
    }

    setProductModalOpen(false);
  };

  // Live calculations
  const wholesale = Number(productForm.priceWholesale) || 0;
  const retail = Number(productForm.priceRetail) || 0;
  const calculatedMarkup = wholesale > 0 ? (((retail - wholesale) / wholesale) * 100).toFixed(0) : "0";
  const unitProfitWholesale = (retail - wholesale).toFixed(2);

  // Filter products
  const filteredProducts = products.filter((p) => {
    if (productCategoryFilter !== "all" && p.category !== productCategoryFilter) {
      return false;
    }
    if (lowStockOnly && p.stock >= 15) {
      return false;
    }
    if (productSearch.trim()) {
      const q = productSearch.toLowerCase();
      const matchName = p.name?.toLowerCase().includes(q);
      const matchSku = p.sku?.toLowerCase().includes(q);
      const matchCategory = p.category?.toLowerCase()?.includes(q);
      return matchName || matchSku || matchCategory;
    }
    return true;
  });

  const exportProductsCsv = () => {
    const headers = ["ID", "SKU", "Produto", "Departamento", "Categoria", "Preço Varejo", "Preço Atacado", "Estoque", "Margem"];
    const rows = products.map((p) => {
      const r = p.retailPrice ?? p.priceRetail ?? 0;
      const w = p.wholesalePrice ?? p.priceWholesale ?? 0;
      const m = w > 0 ? (((r - w) / w) * 100).toFixed(0) : "0";
      return [
        p.id,
        `"${p.sku || ""}"`,
        `"${p.name}"`,
        `"${p.department || "Feminino"}"`,
        `"${p.category}"`,
        r,
        w,
        p.stock || 0,
        `"+${m}%"`,
      ];
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `catalogo_amfit_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const categories = Array.from(new Set(products.map((p) => p.category).filter(Boolean)));

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fadeIn text-zinc-900">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight font-[family-name:var(--font-heading)]">
            Catálogo & Gestão de Peças ({products.length})
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Cadastre novas peças, anexe fotos reais, controle margens de atacado/varejo e grade de cores e tamanhos.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportProductsCsv}
            className="px-4 py-2.5 bg-white hover:bg-zinc-50 text-zinc-700 hover:text-zinc-900 rounded-xl text-xs font-bold flex items-center gap-2 border border-zinc-200 transition-all shadow-2xs shrink-0"
          >
            <FileDown size={15} className="text-am-magenta" />
            <span>CSV</span>
          </button>

          <button
            onClick={openNewProductModal}
            className="px-5 py-2.5 bg-am-magenta hover:bg-pink-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-magenta-sm transition-all"
          >
            <Plus size={16} />
            <span>Novo Produto</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              setProductCategoryFilter("all");
              setLowStockOnly(false);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              productCategoryFilter === "all" && !lowStockOnly
                ? "bg-am-magenta text-white shadow-magenta-sm"
                : "bg-white text-zinc-600 hover:text-zinc-950 border border-zinc-200"
            }`}
          >
            Todos ({products.length})
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setProductCategoryFilter(cat);
                setLowStockOnly(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                productCategoryFilter === cat && !lowStockOnly
                  ? "bg-zinc-900 text-white font-black"
                  : "bg-white text-zinc-600 hover:text-zinc-950 border border-zinc-200"
              }`}
            >
              {cat}
            </button>
          ))}

          <button
            onClick={() => setLowStockOnly(!lowStockOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
              lowStockOnly
                ? "bg-amber-500 text-white font-black border-amber-500 shadow-xs"
                : "bg-white text-amber-700 hover:bg-amber-50 border-amber-200"
            }`}
          >
            <AlertTriangle size={12} />
            <span>Estoque Baixo (&lt; 15)</span>
          </button>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={productSearch}
            onChange={(e) => setProductSearch(e.target.value)}
            placeholder="Buscar por nome, SKU, categoria..."
            className="w-full py-2 pl-9 pr-3 text-xs bg-white border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-am-magenta transition-all shadow-2xs"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filteredProducts.map((prod) => {
          const retail = prod.retailPrice ?? prod.priceRetail ?? 0;
          const wholesale = prod.wholesalePrice ?? prod.priceWholesale ?? 0;
          const markup = wholesale > 0 ? (((retail - wholesale) / wholesale) * 100).toFixed(0) : "0";

          return (
            <div
              key={prod.id}
              className="bg-white border border-zinc-200/90 rounded-3xl overflow-hidden hover:border-zinc-300 transition-all flex flex-col justify-between group shadow-xs"
            >
              <div>
                {/* Image */}
                <div className="relative h-60 bg-zinc-100 overflow-hidden">
                  <img
                    src={prod.images?.[0] || "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80"}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {prod.badge && (
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-am-magenta text-white shadow-sm">
                      {prod.badge}
                    </span>
                  )}
                  {prod.sku && (
                    <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-white/90 text-zinc-800 shadow-2xs backdrop-blur-xs">
                      {prod.sku}
                    </span>
                  )}
                  <span className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-black backdrop-blur-xs border shadow-2xs ${
                    (prod.stock || 0) < 15 ? "bg-red-50 text-red-700 border-red-200" : "bg-white/90 text-zinc-800 border-zinc-200"
                  }`}>
                    Estoque: {prod.stock || 0} un
                  </span>
                </div>

                {/* Details */}
                <div className="p-4 space-y-2.5">
                  <div>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                      {prod.category} &bull; {prod.department || "Feminino"}
                    </span>
                    <h3 className="text-xs font-bold text-zinc-900 line-clamp-2 mt-0.5">
                      {prod.name}
                    </h3>
                  </div>

                  {/* Dual Pricing */}
                  <div className="p-2.5 bg-zinc-50 rounded-2xl border border-zinc-200/80 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-zinc-500 block">Varejo</span>
                      <strong className="text-xs font-black text-zinc-950">
                        R$ {retail.toFixed(2)}
                      </strong>
                    </div>

                    <div className="h-6 w-px bg-zinc-200" />

                    <div>
                      <span className="text-[10px] text-purple-600 block font-bold">Atacado</span>
                      <strong className="text-xs font-black text-purple-700">
                        R$ {wholesale.toFixed(2)}
                      </strong>
                    </div>

                    <div className="h-6 w-px bg-zinc-200" />

                    <div>
                      <span className="text-[10px] text-emerald-600 block font-bold">Margem</span>
                      <strong className="text-xs font-black text-emerald-600">
                        +{markup}%
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 pt-0 flex gap-2">
                <button
                  onClick={() => openEditProductModal(prod)}
                  className="flex-1 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Edit2 size={13} />
                  <span>Editar Produto</span>
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Deseja realmente excluir "${prod.name}"?`)) {
                      deleteProduct(prod.id);
                    }
                  }}
                  className="p-2 bg-zinc-100 hover:bg-red-50 text-zinc-400 hover:text-red-600 rounded-xl transition-colors border border-zinc-200"
                  title="Excluir produto"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* MODAL COMPLETO: ADICIONAR / EDITAR PRODUTO (LIGHT THEME) */}
      {/* ======================================================== */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white border border-zinc-200 rounded-3xl max-w-3xl w-full p-5 sm:p-8 shadow-2xl relative my-6 space-y-5 max-h-[92vh] flex flex-col text-zinc-900">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 shrink-0">
              <div>
                <h3 className="text-lg font-black text-zinc-950 flex items-center gap-2">
                  <Edit2 size={18} className="text-am-magenta" />
                  <span>{editingProduct ? `Editar: ${editingProduct.name}` : "Cadastrar Novo Produto"}</span>
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Configure fotos, tabela de atacado/varejo, grade e detalhes técnicos da confecção.
                </p>
              </div>
              <button
                onClick={() => setProductModalOpen(false)}
                className="p-2 text-zinc-400 hover:text-zinc-800 rounded-xl hover:bg-zinc-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form Scrollable */}
            <form onSubmit={handleSaveProduct} className="overflow-y-auto pr-1 space-y-5 flex-1">
              
              {/* 1. SEÇÃO DE FOTOS DO PRODUTO (COM UPLOAD DE ARQUIVOS) */}
              <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <ImageIcon size={16} className="text-am-magenta" />
                    <span className="text-xs font-black uppercase tracking-wider text-zinc-800">
                      Fotos do Produto ({productForm.images.length})
                    </span>
                  </div>

                  {/* Botões de Ação para Adicionar Fotos */}
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      accept="image/*"
                      multiple
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3.5 py-1.5 bg-am-magenta hover:bg-pink-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-magenta-sm transition-all"
                    >
                      <Upload size={14} />
                      <span>Anexar Foto do Computador</span>
                    </button>
                  </div>
                </div>

                {/* Input de URL externa como alternativa */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="Ou cole o link direto da imagem (URL) aqui..."
                    className="flex-1 py-2 px-3 text-xs bg-white border border-zinc-300 rounded-xl text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-am-magenta"
                  />
                  <button
                    type="button"
                    onClick={handleAddUrlImage}
                    className="px-3 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-zinc-900 text-xs font-bold rounded-xl border border-zinc-300 transition-colors shrink-0"
                  >
                    + Adicionar Link
                  </button>
                </div>

                {/* Galeria de Miniaturas das Fotos */}
                {productForm.images.length > 0 ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5 pt-2">
                    {productForm.images.map((imgUrl, idx) => (
                      <div
                        key={idx}
                        className={`relative aspect-square rounded-xl overflow-hidden border-2 group bg-white shadow-2xs ${
                          idx === 0 ? "border-am-magenta shadow-sm" : "border-zinc-200 hover:border-zinc-300"
                        }`}
                      >
                        <img
                          src={imgUrl}
                          alt={`Foto ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />

                        {/* Badge de Capa */}
                        {idx === 0 && (
                          <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-am-magenta text-white font-black text-[9px] uppercase tracking-wider shadow-sm">
                            Capa
                          </span>
                        )}

                        {/* Botões de Ação na Miniatura */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 p-1">
                          {idx !== 0 && (
                            <button
                              type="button"
                              onClick={() => handleSetCoverImage(idx)}
                              title="Definir como foto principal (capa)"
                              className="p-1 rounded bg-white hover:bg-am-magenta hover:text-white text-zinc-800 text-[10px]"
                            >
                              <Star size={12} />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            title="Remover foto"
                            className="p-1 rounded bg-red-600 hover:bg-red-700 text-white text-[10px]"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 border-2 border-dashed border-zinc-200 rounded-xl text-center space-y-2 bg-white">
                    <ImageIcon size={28} className="mx-auto text-zinc-400" />
                    <p className="text-xs text-zinc-500">Nenhuma foto adicionada ainda.</p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs font-bold text-am-magenta hover:underline"
                    >
                      Clique para anexar foto do seu dispositivo
                    </button>
                  </div>
                )}
              </div>

              {/* 2. IDENTIFICAÇÃO DO PRODUTO */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Nome Comercial do Produto *
                  </label>
                  <input
                    type="text"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    required
                    placeholder="Ex: Legging Power Compressão Empina Bumbum"
                    className="w-full py-2.5 px-3.5 text-xs bg-zinc-50 border border-zinc-300 rounded-xl text-zinc-900 focus:outline-none focus:border-am-magenta focus:ring-1 focus:ring-am-magenta"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Código / SKU de Fábrica *
                  </label>
                  <input
                    type="text"
                    value={productForm.sku}
                    onChange={(e) => setProductForm({ ...productForm, sku: e.target.value.toUpperCase() })}
                    required
                    placeholder="REF-AM8401"
                    className="w-full py-2.5 px-3.5 text-xs bg-zinc-50 border border-zinc-300 rounded-xl text-zinc-900 font-mono focus:outline-none focus:border-am-magenta focus:ring-1 focus:ring-am-magenta"
                  />
                </div>
              </div>

              {/* 3. CATEGORIA, DEPARTAMENTO E BADGE */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Categoria Principal *</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full py-2.5 px-3 text-xs bg-zinc-50 border border-zinc-300 rounded-xl text-zinc-900 focus:outline-none focus:border-am-magenta"
                  >
                    {PRESET_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Departamento</label>
                  <select
                    value={productForm.department}
                    onChange={(e) => setProductForm({ ...productForm, department: e.target.value })}
                    className="w-full py-2.5 px-3 text-xs bg-zinc-50 border border-zinc-300 rounded-xl text-zinc-900 focus:outline-none focus:border-am-magenta"
                  >
                    <option value="Feminino">Feminino</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Infantil">Infantil</option>
                    <option value="Unissex">Unissex</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Selo / Badge Destaque</label>
                  <select
                    value={productForm.badge}
                    onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                    className="w-full py-2.5 px-3 text-xs bg-zinc-50 border border-zinc-300 rounded-xl text-zinc-900 focus:outline-none focus:border-am-magenta"
                  >
                    <option value="">Sem Selo</option>
                    <option value="Novo">Novo</option>
                    <option value="Mais Vendido">Mais Vendido</option>
                    <option value="Lançamento">Lançamento</option>
                    <option value="Destaque">Destaque</option>
                    <option value="Promoção">Promoção</option>
                    <option value="Sem Costura">Sem Costura</option>
                    <option value="Compressão">Compressão</option>
                  </select>
                </div>
              </div>

              {/* 4. PREÇOS, MARGEM E CONDIÇÕES DE ATACADO */}
              <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-am-magenta flex items-center gap-1.5">
                    <TrendingUp size={15} />
                    <span>Precificação Estratégica (Atacado x Varejo)</span>
                  </span>
                  <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Margem Revenda: +{calculatedMarkup}%
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-700 mb-1">Preço Varejo (R$) *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={productForm.priceRetail}
                      onChange={(e) => setProductForm({ ...productForm, priceRetail: Number(e.target.value) })}
                      required
                      className="w-full py-2 px-3 text-xs bg-white border border-zinc-300 rounded-xl text-zinc-900 font-bold focus:border-am-magenta"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-purple-700 mb-1">Preço Atacado (R$) *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={productForm.priceWholesale}
                      onChange={(e) => setProductForm({ ...productForm, priceWholesale: Number(e.target.value) })}
                      required
                      className="w-full py-2 px-3 text-xs bg-white border border-zinc-300 rounded-xl text-purple-700 font-bold focus:border-purple-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-zinc-600 mb-1">Preço "De" (R$)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={productForm.originalPrice}
                      onChange={(e) => setProductForm({ ...productForm, originalPrice: Number(e.target.value) })}
                      placeholder="De R$ 159,90"
                      className="w-full py-2 px-3 text-xs bg-white border border-zinc-300 rounded-xl text-zinc-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-zinc-700 mb-1">Mín. Atacado (peças)</label>
                    <input
                      type="number"
                      min={1}
                      value={productForm.minWholesaleQty}
                      onChange={(e) => setProductForm({ ...productForm, minWholesaleQty: Number(e.target.value) })}
                      required
                      className="w-full py-2 px-3 text-xs bg-white border border-zinc-300 rounded-xl text-zinc-900 font-bold"
                    />
                  </div>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-zinc-200 text-[11px] text-zinc-600 flex items-center justify-between">
                  <span>💡 O lojista compra por <strong>R$ {wholesale.toFixed(2)}</strong> e lucra <strong>R$ {unitProfitWholesale}</strong> ao revender pelo varejo sugerido.</span>
                </div>
              </div>

              {/* 5. ESTOQUE E DETALHES DE TECIDO */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Estoque Total (peças) *</label>
                  <input
                    type="number"
                    min={0}
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: Number(e.target.value) })}
                    required
                    className="w-full py-2.5 px-3.5 text-xs bg-zinc-50 border border-zinc-300 rounded-xl text-zinc-900 focus:outline-none focus:border-am-magenta font-bold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Composição & Tecido *</label>
                  <input
                    type="text"
                    value={productForm.fabric}
                    onChange={(e) => setProductForm({ ...productForm, fabric: e.target.value })}
                    placeholder="88% Poliamida, 12% Elastano - Gramatura 320g"
                    className="w-full py-2.5 px-3.5 text-xs bg-zinc-50 border border-zinc-300 rounded-xl text-zinc-900 focus:outline-none focus:border-am-magenta"
                  />
                </div>
              </div>

              {/* 6. GRADE DE TAMANHOS */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-zinc-700">
                  Grade de Tamanhos Disponíveis:
                </label>
                <div className="flex flex-wrap gap-2">
                  {PRESET_SIZES.map((sz) => {
                    const isSelected = productForm.sizes.includes(sz);
                    return (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => toggleSize(sz)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                          isSelected
                            ? "bg-am-magenta text-white border-am-magenta shadow-magenta-sm"
                            : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 7. GRADE DE CORES */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-zinc-700">
                  Cores do Catálogo:
                </label>
                <div className="flex flex-wrap gap-2">
                  {PRESET_COLORS.map((col) => {
                    const isSelected = productForm.colors.includes(col.name);
                    return (
                      <button
                        key={col.name}
                        type="button"
                        onClick={() => toggleColor(col.name)}
                        className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${
                          isSelected
                            ? "bg-zinc-900 text-white border-zinc-900 shadow-2xs"
                            : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: col.hex }}
                        />
                        <span>{col.name}</span>
                        {isSelected && <Check size={11} className="text-am-magenta" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 8. DESCRIÇÃO DETALHADA */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Descrição Completa do Produto
                </label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Descreva o caimento, nível de compressão, benefícios e instruções..."
                  className="w-full py-2.5 px-3 text-xs bg-zinc-50 border border-zinc-300 rounded-xl text-zinc-900 focus:outline-none focus:border-am-magenta"
                />
              </div>

              {/* 9. DESTAQUES DE VISIBILIDADE */}
              <div className="flex flex-wrap items-center gap-4 p-3 bg-zinc-50 rounded-2xl border border-zinc-200 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-zinc-700 font-semibold">
                  <input
                    type="checkbox"
                    checked={productForm.isFeatured}
                    onChange={(e) => setProductForm({ ...productForm, isFeatured: e.target.checked })}
                    className="rounded text-am-magenta focus:ring-am-magenta"
                  />
                  <span>Destaque na Home</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-zinc-700 font-semibold">
                  <input
                    type="checkbox"
                    checked={productForm.isBestSeller}
                    onChange={(e) => setProductForm({ ...productForm, isBestSeller: e.target.checked })}
                    className="rounded text-am-magenta focus:ring-am-magenta"
                  />
                  <span>Marcar como Mais Vendido (Best Seller)</span>
                </label>
              </div>

              {/* Modal Footer Actions */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-zinc-100 shrink-0">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="px-5 py-2.5 text-xs font-bold text-zinc-600 hover:text-zinc-900 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-7 py-2.5 text-xs font-black bg-am-magenta hover:bg-pink-600 text-white rounded-xl shadow-magenta-sm uppercase tracking-wider transition-all"
                >
                  {editingProduct ? "Salvar Alterações" : "Cadastrar Produto"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};
