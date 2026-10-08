"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Eye, ShoppingCart, Star, Check, PackageCheck, Layers, Lock } from "lucide-react";
import { Product, getProductSlug } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { mode, addToCart, setQuickViewProduct, favorites, toggleFavorite } = useCart();
  const firstColor = (product.colors && product.colors[0]) ? product.colors[0].name : "Preto";
  const firstSize = (product.sizes && product.sizes[0]) ? product.sizes[0] : "M";

  const [selectedColor, setSelectedColor] = useState(firstColor);
  const [selectedSize, setSelectedSize] = useState(firstSize);
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const fallbackImg = "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80";
  const [imgError, setImgError] = useState(false);

  const isFavorite = favorites.includes(product.id);

  // Selected variation stock
  const currentVariation = (product.variations || []).find(
    (v: any) => v.color === selectedColor && v.size === selectedSize
  );
  const variationStock = currentVariation ? currentVariation.stock : product.stock;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedSize, selectedColor, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleOpenQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const retailVal = Number(product.retailPrice ?? (product as any).priceRetail ?? 0);
  const wholesaleVal = Number(product.wholesalePrice ?? (product as any).priceWholesale ?? 0);
  const currentPrice = mode === "atacado" ? wholesaleVal : retailVal;
  const alternatePrice = mode === "atacado" ? retailVal : wholesaleVal;

  return (
    <div 
      className="group relative bg-white rounded-2xl border border-am-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
        {product.isNew && (
          <span className="bg-am-black text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
            Novidade
          </span>
        )}
        {product.isBestSeller && (
          <span className="bg-am-magenta text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-magenta-sm">
            Mais Vendido
          </span>
        )}
        {product.discountPercentage && (
          <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
            -{product.discountPercentage}% OFF
          </span>
        )}
      </div>

      {/* Floating Action Buttons */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md active:scale-95 ${
            isFavorite
              ? "bg-am-magenta text-white scale-110"
              : "bg-white text-zinc-600 hover:text-am-magenta hover:bg-am-gray-50"
          }`}
          aria-label="Adicionar aos favoritos"
        >
          <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
        </button>

        <button
          onClick={handleOpenQuickView}
          className="w-9 h-9 rounded-full bg-white text-zinc-600 hover:text-am-magenta hover:bg-am-gray-50 flex items-center justify-center transition-all shadow-md opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transform sm:translate-x-2 sm:group-hover:translate-x-0 duration-200 active:scale-95"
          aria-label="Espiar produto"
        >
          <Eye size={16} />
        </button>
      </div>

      {/* Product Image */}
      <Link 
        href={`/produto/${getProductSlug(product)}`}
        className="relative w-full aspect-[4/5] bg-zinc-100 overflow-hidden cursor-pointer block"
      >
        {(() => {
          const mainImg = (!imgError && product.images && product.images[0]) ? product.images[0] : fallbackImg;
          const hoverImg = (!imgError && isHovered && product.images && product.images[1]) ? product.images[1] : mainImg;
          
          return (
            <Image
              src={hoverImg}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          );
        })()}

        {/* Stock / Ref pill at bottom of image */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] pointer-events-none">
          <span className="bg-black/80 backdrop-blur-sm text-zinc-300 px-2 py-0.5 rounded font-mono font-bold">
            {product.sku}
          </span>
          <span className="bg-white/90 backdrop-blur-sm text-emerald-700 px-2 py-0.5 rounded font-bold flex items-center gap-1 shadow-xs">
            <PackageCheck size={11} /> {product.stock} un.
          </span>
        </div>

        {/* Quick View Overlay bar */}
        <div className="absolute inset-x-0 bottom-0 py-2.5 bg-am-black/85 backdrop-blur-xs text-white text-xs font-semibold text-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-200">
          Ver Detalhes do Produto
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Department, Category & Rating */}
          <div className="flex items-center justify-between text-xs text-zinc-500 mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="bg-am-gray-100 text-zinc-700 font-extrabold text-[10px] px-2 py-0.5 rounded uppercase">
                {product.department}
              </span>
              <span className="font-semibold uppercase tracking-wider text-[10px] text-zinc-400">
                {product.type}
              </span>
            </div>
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star size={12} fill="currentColor" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-zinc-400 text-[10px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-bold text-zinc-900 text-sm sm:text-base leading-snug line-clamp-2 hover:text-am-magenta transition-colors mb-2">
            <Link href={`/produto/${getProductSlug(product)}`}>
              {product.name}
            </Link>
          </h3>

          {/* Color swatches */}
          <div className="flex items-center gap-1.5 mb-2.5 flex-wrap">
            {(product.colors || []).map((color: any) => {
              const cName = typeof color === "string" ? color : color.name;
              const cHex = typeof color === "string" ? "#000000" : (color.hex || "#000000");

              return (
                <button
                  key={cName}
                  type="button"
                  onClick={() => setSelectedColor(cName)}
                  title={cName}
                  className={`w-5 h-5 sm:w-4 sm:h-4 rounded-full border transition-all ${
                    selectedColor === cName
                      ? "ring-2 ring-am-magenta ring-offset-1 scale-110"
                      : "border-zinc-300 hover:scale-105"
                  }`}
                  style={{ backgroundColor: cHex }}
                />
              );
            })}
            <span className="text-[11px] text-zinc-500 ml-1 truncate">
              {selectedColor}
            </span>
          </div>

          {/* Size picker */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] text-zinc-400 mr-0.5 font-medium">Tam:</span>
              {(product.sizes || []).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[28px] h-7 sm:min-w-[24px] sm:h-6 px-2 flex items-center justify-center rounded font-bold text-xs transition-all border ${
                    selectedSize === size
                      ? "bg-am-black text-white border-am-black"
                      : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            <span className="text-[10px] text-zinc-400 font-medium">
              Disp: <strong className="text-zinc-700">{variationStock} un</strong>
            </span>
          </div>
        </div>

        {/* Pricing & Add to Cart button */}
        <div className="pt-3 border-t border-am-gray-100">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xs font-semibold text-zinc-500">R$</span>
                <span className="text-xl sm:text-2xl font-black text-zinc-900">
                  {currentPrice.toFixed(2).replace(".", ",")}
                </span>
                {product.originalPrice && mode === "varejo" && (
                  <span className="text-xs text-zinc-400 line-through">
                    R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                  </span>
                )}
              </div>

              {/* Complementary price highlight */}
              {mode === "atacado" ? (
                <div className="text-[11px] text-am-magenta font-bold flex items-center gap-1">
                  <span>Preço Atacado</span>
                  <span className="text-zinc-400 font-normal">• Mín: {product.minWholesaleQty} pçs</span>
                </div>
              ) : (
                <p className="text-[11px] text-zinc-500">
                  No atacado: <strong className="text-am-magenta font-bold">R$ {alternatePrice.toFixed(2).replace(".", ",")}</strong>
                </p>
              )}
            </div>

            <button
              onClick={handleOpenQuickView}
              className="text-[11px] font-bold text-am-magenta hover:underline flex items-center gap-0.5"
            >
              <Layers size={12} />
              Variações
            </button>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
              justAdded
                ? "bg-emerald-600 text-white"
                : "bg-am-black hover:bg-am-magenta text-white shadow-sm hover:shadow-magenta-sm"
            }`}
          >
            {justAdded ? (
              <>
                <Check size={16} />
                Adicionado!
              </>
            ) : (
              <>
                <ShoppingCart size={15} />
                Comprar
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
