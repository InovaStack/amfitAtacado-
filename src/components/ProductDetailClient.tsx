"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  Star,
  Check,
  Truck,
  ShieldCheck,
  RefreshCw,
  PhoneCall,
  Share2,
  ChevronRight,
  Ruler,
  TrendingUp,
  Percent,
  PackageCheck,
  Sparkles,
  Info,
  MapPin,
  CheckCircle2,
  X
} from "lucide-react";
import { Product, getProductSlug } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { STORE_CONFIG, getWhatsAppLink } from "@/config/store";
import { ProductCard } from "@/components/ProductCard";
import { useAdmin } from "@/context/AdminContext";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export const ProductDetailClient: React.FC<ProductDetailClientProps> = ({
  product: initialProduct,
  relatedProducts: initialRelatedProducts,
}) => {
  const { mode, setMode, addToCart, favorites, toggleFavorite } = useCart();
  const { products, storeConfig } = useAdmin();

  // Find updated product from AdminContext if it exists (for live updates of price, photos, name, etc.)
  const liveProduct = products.find((p: any) => p.id === initialProduct.id);
  const product: Product = (liveProduct as any) || initialProduct;

  const relatedProducts = (products && products.length > 0)
    ? products
        .filter((p: any) => p.id !== product.id && (p.category === product.category || p.department === product.department))
        .slice(0, 4)
    : initialRelatedProducts;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "");
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [cep, setCep] = useState("");
  const [shippingCalculated, setShippingCalculated] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [mainImgError, setMainImgError] = useState(false);
  const fallbackImg = "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80";

  const isFavorite = favorites.includes(product.id);

  // Selected variation stock
  const currentVariation = (product.variations || []).find(
    (v: any) => v.color === selectedColor && v.size === selectedSize
  );
  const variationStock = currentVariation ? currentVariation.stock : product.stock;

  const currentPrice = mode === "atacado" ? (product.wholesalePrice ?? (product as any).priceWholesale ?? 0) : (product.retailPrice ?? (product as any).priceRetail ?? 0);
  const alternatePrice = mode === "atacado" ? (product.retailPrice ?? (product as any).priceRetail ?? 0) : (product.wholesalePrice ?? (product as any).priceWholesale ?? 0);

  // Wholesale margin calculations
  const retailPriceNum = Number(product.retailPrice ?? (product as any).priceRetail ?? 0);
  const wholesalePriceNum = Number(product.wholesalePrice ?? (product as any).priceWholesale ?? 0);
  const profitMarginPercent = wholesalePriceNum > 0
    ? Math.round(((retailPriceNum - wholesalePriceNum) / wholesalePriceNum) * 100)
    : 0;
  const profitPerPiece = (retailPriceNum - wholesalePriceNum).toFixed(2).replace(".", ",");

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleShare = () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
    } catch {
      // fallback
    }
  };

  const handleSimulateShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (cep.replace(/\D/g, "").length >= 8) {
      setShippingCalculated(true);
    }
  };

  const directWhatsAppMessage = `Olá! Tenho interesse na peça *${product.name}* (${product.sku}).\nCor: ${selectedColor} | Tamanho: ${selectedSize} | Qtd: ${quantity} un.\nModalidade: ${mode === "atacado" ? "Atacado" : "Varejo"}\nLink: ${typeof window !== "undefined" ? window.location.href : ""}`;

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="bg-am-gray-50 border-b border-am-gray-200">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-3">
          <ol className="flex items-center flex-wrap gap-1.5 text-xs text-zinc-500 font-medium">
            <li>
              <Link href="/" className="hover:text-am-magenta transition-colors">
                Início
              </Link>
            </li>
            <li>
              <ChevronRight size={13} className="text-zinc-400" />
            </li>
            <li>
              <Link href="/catalogo" className="hover:text-am-magenta transition-colors">
                Catálogo
              </Link>
            </li>
            <li>
              <ChevronRight size={13} className="text-zinc-400" />
            </li>
            <li className="uppercase tracking-wider text-[11px] font-bold text-zinc-700">
              {product.department}
            </li>
            <li>
              <ChevronRight size={13} className="text-zinc-400" />
            </li>
            <li className="text-am-magenta font-semibold truncate max-w-[200px] sm:max-w-xs">
              {product.name}
            </li>
          </ol>
        </div>
      </nav>

      {/* Main Product Container */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Coluna 1: Galeria de Fotos (Desktop 7 cols, Mobile 12 cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            
            {/* Thumbnails verticais */}
            {product.images.length > 1 && (
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 flex-shrink-0">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImageIndex === idx
                        ? "border-am-magenta ring-2 ring-am-magenta/20 shadow-md scale-105"
                        : "border-am-gray-200 hover:border-zinc-400 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} foto ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Imagem Principal */}
            <div className="relative flex-1 aspect-[4/5] bg-zinc-100 rounded-3xl overflow-hidden border border-am-gray-200 shadow-sm group">
              <Image
                src={!mainImgError ? (product.images?.[activeImageIndex] || product.images?.[0] || fallbackImg) : fallbackImg}
                alt={product.name}
                fill
                priority
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 60vw"
                onError={() => setMainImgError(true)}
              />

              {/* Badges superiores na imagem */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {product.isNew && (
                  <span className="bg-am-black text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    Lançamento
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="bg-am-magenta text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    Mais Vendido
                  </span>
                )}
                {product.discountPercentage && (
                  <span className="bg-emerald-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    -{product.discountPercentage}% OFF
                  </span>
                )}
              </div>

              {/* Botões de Ação na Imagem */}
              <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => toggleFavorite(product.id)}
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-md ${
                    isFavorite
                      ? "bg-am-magenta text-white scale-110"
                      : "bg-white/90 backdrop-blur-sm text-zinc-700 hover:text-am-magenta hover:bg-white"
                  }`}
                  aria-label="Adicionar aos Favoritos"
                >
                  <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm text-zinc-700 hover:text-am-magenta hover:bg-white flex items-center justify-center transition-all shadow-md"
                  aria-label="Compartilhar Link"
                  title="Compartilhar"
                >
                  <Share2 size={18} />
                </button>
              </div>

              {/* Feedback de link copiado */}
              {copiedLink && (
                <div className="absolute top-16 right-4 z-20 bg-am-black text-white text-xs px-3 py-1.5 rounded-lg shadow-lg">
                  Link copiado!
                </div>
              )}

              {/* Referência e Estoque flutuante */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs pointer-events-none">
                <span className="bg-black/75 backdrop-blur-md text-zinc-200 px-3 py-1 rounded-lg font-mono font-bold">
                  REF: {product.sku}
                </span>
                <span className="bg-white/95 backdrop-blur-md text-emerald-800 px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 shadow-xs">
                  <PackageCheck size={14} /> Estoque pronta entrega: {variationStock} un.
                </span>
              </div>
            </div>

          </div>

          {/* Coluna 2: Detalhes da Compra (Desktop 5 cols, Mobile 12 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Título & Avaliação */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wide bg-zinc-100 text-zinc-800">
                    {product.department}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wide bg-am-magenta-light text-am-magenta">
                    {product.type}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-full text-amber-600 font-bold text-xs">
                  <Star size={14} fill="currentColor" />
                  <span>{product.rating.toFixed(1)}</span>
                  <span className="text-zinc-400 font-normal">({product.reviewsCount} avaliações)</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-am-black tracking-tight leading-tight">
                {product.name}
              </h1>

              <p className="text-xs text-zinc-500 font-mono">
                Código: <strong className="text-zinc-800">{product.sku}</strong>
              </p>
            </div>

            {/* Alternador de Tabela Atacado / Varejo */}
            <div className="bg-am-gray-50 p-4 rounded-2xl border border-am-gray-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-600">Selecione o seu perfil de compra:</span>
                <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-am-gray-300 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setMode("varejo")}
                    className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${
                      mode === "varejo"
                        ? "bg-am-black text-white shadow-xs"
                        : "text-zinc-500 hover:text-zinc-800"
                    }`}
                  >
                    Varejo
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("atacado")}
                    className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${
                      mode === "atacado"
                        ? "bg-am-magenta text-white shadow-xs"
                        : "text-zinc-500 hover:text-zinc-800"
                    }`}
                  >
                    Atacado
                  </button>
                </div>
              </div>

              {/* Bloco de Preços */}
              <div className="pt-2 border-t border-am-gray-200">
                {mode === "atacado" ? (
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-am-magenta">
                        Preço Atacado:
                      </span>
                      <span className="text-3xl font-black text-am-black">
                        R$ {product.wholesalePrice.toFixed(2).replace(".", ",")}
                      </span>
                      <span className="text-xs text-zinc-500 font-semibold">à vista / un.</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 border border-emerald-200">
                        <TrendingUp size={13} />
                        Lucro estimado: +{profitMarginPercent}% (R$ {profitPerPiece} / peça)
                      </span>
                      <span className="text-zinc-500">
                        Venda sugerida: <strong>R$ {product.retailPrice.toFixed(2).replace(".", ",")}</strong>
                      </span>
                    </div>

                    <div className="text-[11px] text-zinc-500 bg-white p-2.5 rounded-xl border border-am-gray-200">
                      📦 <strong>Regra do Atacado:</strong> Pedido mínimo a partir de {storeConfig.commercial.minWholesalePieces} peças sortidas na loja ou R$ {storeConfig.commercial.minWholesaleOrderAmount},00 no total.
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {product.originalPrice && (
                      <span className="text-xs text-zinc-400 line-through">
                        De: R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                      </span>
                    )}
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-am-black">
                        R$ {product.retailPrice.toFixed(2).replace(".", ",")}
                      </span>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                        {storeConfig.commercial.pixDiscountPercentage}% OFF no PIX (R$ {(product.retailPrice * (1 - storeConfig.commercial.pixDiscountPercentage / 100)).toFixed(2).replace(".", ",")})
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500">
                      ou até <strong>{storeConfig.commercial.maxInstallments}x de R$ {(product.retailPrice / storeConfig.commercial.maxInstallments).toFixed(2).replace(".", ",")}</strong> sem juros no cartão
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Seleção de Cor */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-zinc-700">
                  Cor Selecionada: <span className="text-am-magenta font-black">{selectedColor}</span>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c.name)}
                    className={`group relative p-1 rounded-full transition-all ${
                      selectedColor === c.name
                        ? "ring-2 ring-am-magenta ring-offset-2 scale-110"
                        : "hover:scale-105"
                    }`}
                    title={c.name}
                  >
                    <span
                      className="w-7 h-7 rounded-full block border border-zinc-300 shadow-2xs"
                      style={{ backgroundColor: c.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Seleção de Tamanho */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-zinc-700">
                  Tamanho Selecionado: <span className="text-am-black font-black">{selectedSize}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="inline-flex items-center gap-1 font-bold text-am-magenta hover:underline"
                >
                  <Ruler size={13} />
                  <span>Guia de Medidas</span>
                </button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {product.sizes.map((sz) => {
                  const isAvailable = true;
                  return (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all border ${
                        selectedSize === sz
                          ? "bg-am-black text-white border-am-black shadow-md"
                          : "bg-white text-zinc-800 border-am-gray-300 hover:border-zinc-500"
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantidade e Botões de Compra */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Seletor de quantidade */}
                <div className="flex items-center border-2 border-am-gray-300 rounded-xl bg-white overflow-hidden h-12">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-full flex items-center justify-center font-bold text-zinc-600 hover:bg-am-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-black text-sm text-am-black">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-full flex items-center justify-center font-bold text-zinc-600 hover:bg-am-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Botão Adicionar ao Carrinho */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`flex-1 h-12 px-6 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
                    addedSuccess
                      ? "bg-emerald-600 text-white"
                      : "bg-am-black hover:bg-zinc-800 text-white shadow-am-black/20"
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <CheckCircle2 size={18} />
                      <span>Adicionado à Sacola!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} className="text-am-magenta" />
                      <span>Adicionar à Sacola</span>
                    </>
                  )}
                </button>
              </div>

              {/* Botão Direto via WhatsApp */}
              <a
                href={getWhatsAppLink(directWhatsAppMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20"
              >
                <PhoneCall size={18} />
                <span>Comprar via WhatsApp com Consultora</span>
              </a>
            </div>

            {/* Simulador de Frete por CEP */}
            <div className="border border-am-gray-200 rounded-2xl p-4 bg-am-gray-50 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-800">
                <Truck size={16} className="text-am-magenta" />
                <span>Simulador de Frete e Prazos</span>
              </div>

              <form onSubmit={handleSimulateShipping} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Digite seu CEP (00000-000)"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  maxLength={9}
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-am-gray-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-am-magenta"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-am-black text-white text-xs font-bold rounded-xl hover:bg-zinc-800 transition-colors"
                >
                  Calcular
                </button>
              </form>

              {shippingCalculated && (
                <div className="space-y-1.5 pt-2 text-xs border-t border-am-gray-200">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-am-gray-200">
                    <div>
                      <strong className="block text-zinc-900">SEDEX Expresso</strong>
                      <span className="text-[11px] text-zinc-500">Entrega em até 2 dias úteis</span>
                    </div>
                    <span className="font-bold text-am-black">R$ 24,90</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-am-gray-200">
                    <div>
                      <strong className="block text-zinc-900">PAC Econômico</strong>
                      <span className="text-[11px] text-zinc-500">Entrega em até 5 dias úteis</span>
                    </div>
                    <span className="font-bold text-emerald-600">
                      {mode === "varejo" && currentPrice >= STORE_CONFIG.commercial.freeShippingRetailThreshold
                        ? "GRÁTIS"
                        : "R$ 14,90"}
                    </span>
                  </div>

                  {mode === "atacado" && (
                    <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-am-gray-200">
                      <div>
                        <strong className="block text-zinc-900">Transportadora Rodoviária (Atacado)</strong>
                        <span className="text-[11px] text-zinc-500">Jadlog / Braspress / Ônibus Brás</span>
                      </div>
                      <span className="font-bold text-am-magenta">Cotação Balcão</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Selos de Confiança */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-am-gray-200 text-center">
              <div className="p-2 rounded-xl bg-white border border-am-gray-200 flex flex-col items-center gap-1">
                <ShieldCheck size={18} className="text-am-magenta" />
                <span className="text-[10px] font-bold text-zinc-700">Zero Transparência</span>
              </div>
              <div className="p-2 rounded-xl bg-white border border-am-gray-200 flex flex-col items-center gap-1">
                <RefreshCw size={18} className="text-emerald-600" />
                <span className="text-[10px] font-bold text-zinc-700">Troca Garantida</span>
              </div>
              <div className="p-2 rounded-xl bg-white border border-am-gray-200 flex flex-col items-center gap-1">
                <Truck size={18} className="text-am-black" />
                <span className="text-[10px] font-bold text-zinc-700">Envio para todo BR</span>
              </div>
            </div>

          </div>
        </div>

        {/* Ficha Técnica & Descrição do Tecido */}
        <div className="mt-16 pt-12 border-t border-am-gray-200">
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-am-black tracking-tight mb-4">
                Descrição do Produto
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-am-gray-50 border border-am-gray-200 space-y-3">
                <h3 className="font-extrabold text-sm uppercase tracking-wider text-am-black flex items-center gap-2">
                  <Sparkles size={16} className="text-am-magenta" />
                  <span>Tecnologia & Tecido</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-600">
                  <li>• <strong>Composição:</strong> {product.fabric}</li>
                  <li>• <strong>Proteção UV50+:</strong> Proteção contra raios solares durante treinos ao ar livre.</li>
                  <li>• <strong>Compressão Anatômica:</strong> Modela a cintura e valoriza as curvas sem apertar.</li>
                  <li>• <strong>Zero Transparência:</strong> Tecido denso homologado para agachamentos pesados.</li>
                </ul>
              </div>

              <div className="p-6 rounded-3xl bg-am-gray-50 border border-am-gray-200 space-y-3">
                <h3 className="font-extrabold text-sm uppercase tracking-wider text-am-black flex items-center gap-2">
                  <Info size={16} className="text-am-magenta" />
                  <span>Cuidados de Lavagem</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-600">
                  <li>• Lavar à mão ou no ciclo delicado com sabão neutro.</li>
                  <li>• Não usar alvejantes ou amaciantes em excesso.</li>
                  <li>• Não secar em secadora rotativa. Secar à sombra.</li>
                  <li>• Não passar ferro quente sobre o tecido de alta compressão.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Produtos Relacionados */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-am-gray-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-am-magenta">
                  Sugestões da Fábrica
                </span>
                <h2 className="text-2xl font-black text-am-black tracking-tight">
                  Quem viu este modelo também comprou
                </h2>
              </div>
              <Link
                href="/catalogo"
                className="text-xs font-bold text-am-magenta hover:underline hidden sm:inline-flex items-center gap-1"
              >
                <span>Ver todo o catálogo</span>
                <ChevronRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal Guia de Medidas */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-am-gray-200">
              <div className="flex items-center gap-2">
                <Ruler size={20} className="text-am-magenta" />
                <h3 className="font-black text-base text-am-black">Tabela de Medidas Oficial AM FIT</h3>
              </div>
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="p-1 rounded-full text-zinc-400 hover:text-zinc-800 hover:bg-am-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-xs text-zinc-500">
              Meça rente ao corpo sem apertar a fita métrica para encontrar o caimento perfeito.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-am-gray-100 text-zinc-700 font-extrabold">
                  <tr>
                    <th className="p-2.5">Tam</th>
                    <th className="p-2.5">Manequim</th>
                    <th className="p-2.5">Busto (cm)</th>
                    <th className="p-2.5">Cintura (cm)</th>
                    <th className="p-2.5">Quadril (cm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-am-gray-200 text-zinc-600">
                  <tr>
                    <td className="p-2.5 font-bold text-am-black">P</td>
                    <td className="p-2.5">36 - 38</td>
                    <td className="p-2.5">80 - 88</td>
                    <td className="p-2.5">64 - 72</td>
                    <td className="p-2.5">88 - 96</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-am-black">M</td>
                    <td className="p-2.5">40 - 42</td>
                    <td className="p-2.5">89 - 96</td>
                    <td className="p-2.5">73 - 80</td>
                    <td className="p-2.5">97 - 105</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-am-black">G</td>
                    <td className="p-2.5">44 - 46</td>
                    <td className="p-2.5">97 - 104</td>
                    <td className="p-2.5">81 - 88</td>
                    <td className="p-2.5">106 - 114</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-am-black">GG</td>
                    <td className="p-2.5">48 - 50</td>
                    <td className="p-2.5">105 - 112</td>
                    <td className="p-2.5">89 - 98</td>
                    <td className="p-2.5">115 - 122</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pt-2 text-[11px] text-zinc-400">
              * Nossos tecidos possuem bastante elasticidade com elastano premium, adaptando-se com conforto ao corpo.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
