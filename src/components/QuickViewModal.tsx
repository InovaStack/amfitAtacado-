"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  X, 
  Star, 
  ShoppingBag, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  Copy, 
  Package, 
  Layers, 
  Building2, 
  Info,
  Lock 
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    mode,
    addToCart,
    favorites,
    toggleFavorite,
  } = useCart();

  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [copiedSku, setCopiedSku] = useState(false);
  const [activeTab, setActiveTab] = useState<"compra" | "variacoes">("compra");

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedImg(0);
      setSelectedSize(quickViewProduct.sizes[0] || "");
      setSelectedColor(quickViewProduct.colors[0]?.name || "");
      setQuantity(1);
      setAdded(false);
      setActiveTab("compra");
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const currentPrice = mode === "atacado" ? quickViewProduct.wholesalePrice : quickViewProduct.retailPrice;
  const isFavorite = favorites.includes(quickViewProduct.id);

  // Selected variation stock
  const currentVariation = quickViewProduct.variations.find(
    (v) => v.color === selectedColor && v.size === selectedSize
  );
  const activeStock = currentVariation ? currentVariation.stock : quickViewProduct.stock;
  const activeSku = currentVariation ? currentVariation.sku : quickViewProduct.sku;

  const handleCopySku = () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(activeSku);
        setCopiedSku(true);
        setTimeout(() => setCopiedSku(false), 2000);
      }
    } catch {
      // fallback
    }
  };

  const handleAdd = () => {
    addToCart(quickViewProduct, selectedSize, selectedColor, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setQuickViewProduct(null);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden z-10 border border-am-gray-200 max-h-[92vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/95 hover:bg-white text-zinc-600 hover:text-am-black flex items-center justify-center shadow-md transition-colors"
          aria-label="Fechar"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 overflow-y-auto">
          
          {/* Gallery Column */}
          <div className="p-6 bg-am-gray-50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-am-gray-200">
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-zinc-200 shadow-sm">
              <Image
                src={quickViewProduct.images[selectedImg] || quickViewProduct.images[0]}
                alt={quickViewProduct.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
              
              <button
                onClick={() => toggleFavorite(quickViewProduct.id)}
                className={`absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center transition-colors shadow-sm ${
                  isFavorite ? "bg-am-magenta text-white" : "bg-white/85 text-zinc-600 hover:text-am-magenta"
                }`}
              >
                <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
              </button>

              {/* SKU pill */}
              <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-[11px] font-mono flex items-center gap-1.5 shadow-sm">
                <span>{activeSku}</span>
                <button 
                  onClick={handleCopySku} 
                  title="Copiar Código"
                  className="hover:text-am-magenta transition-colors"
                >
                  <Copy size={12} />
                </button>
                {copiedSku && <span className="text-emerald-400 font-bold text-[10px]">Copiado!</span>}
              </div>
            </div>

            {/* Thumbnails */}
            {quickViewProduct.images.length > 1 && (
              <div className="flex gap-2.5 mt-3">
                {quickViewProduct.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImg === i ? "border-am-magenta scale-105" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Category, SKU & Rating */}
              <div className="flex items-center justify-between text-xs mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold uppercase tracking-widest text-am-magenta">
                    {quickViewProduct.categoryLabel}
                  </span>
                  <span className="text-zinc-300">•</span>
                  <span className="text-zinc-500 font-mono text-[11px] bg-am-gray-100 px-2 py-0.5 rounded">
                    {quickViewProduct.sku}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star size={13} fill="currentColor" />
                  <span>{quickViewProduct.rating.toFixed(1)}</span>
                  <span className="text-zinc-400 text-[11px]">({quickViewProduct.reviewsCount})</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-black text-am-black leading-snug mb-2">
                {quickViewProduct.name}
              </h2>

              {/* Department & Type */}
              <div className="flex items-center gap-2 text-xs text-zinc-500 mb-4">
                <span>Departamento: <strong className="text-zinc-800">{quickViewProduct.department}</strong></span>
                <span>•</span>
                <span>Tipo: <strong className="text-zinc-800">{quickViewProduct.type}</strong></span>
                <span>•</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <Package size={13} /> {quickViewProduct.stock} peças em estoque
                </span>
              </div>

              {/* Dual Price Box */}
              <div className="p-4 bg-am-gray-50 rounded-2xl border border-am-gray-200 mb-4">
                <div className="grid grid-cols-2 gap-3 pb-3 border-b border-am-gray-200">
                  <div>
                    <span className="text-[11px] font-bold text-zinc-500 uppercase block">Preço Varejo</span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-xs font-semibold text-zinc-600">R$</span>
                      <span className="text-xl font-black text-zinc-900">
                        {quickViewProduct.retailPrice.toFixed(2).replace(".", ",")}
                      </span>
                    </div>
                    <span className="text-[10px] text-zinc-400">Sem pedido mínimo</span>
                  </div>

                  <div className="bg-am-magenta-light p-2.5 rounded-xl border border-am-magenta-border">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black text-am-magenta uppercase flex items-center gap-1">
                        <Building2 size={12} /> Preço Atacado
                      </span>
                      <span className="text-[10px] font-bold bg-am-magenta text-white px-1.5 py-0.2 rounded">
                        Fábrica
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-xs font-semibold text-am-magenta">R$</span>
                      <span className="text-xl font-black text-am-magenta">
                        {quickViewProduct.wholesalePrice.toFixed(2).replace(".", ",")}
                      </span>
                    </div>
                    <span className="text-[10px] text-zinc-600 font-medium">
                      Mínimo: {quickViewProduct.minWholesaleQty} pçs (Lucro: R$ {(quickViewProduct.retailPrice - quickViewProduct.wholesalePrice).toFixed(2).replace(".", ",")})
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-zinc-500 mt-2 flex items-center gap-1.5">
                  <Info size={13} className="text-zinc-400 flex-shrink-0" />
                  <span>Você está visualizando no modo: <strong className="uppercase text-am-black">{mode}</strong></span>
                </p>
              </div>

              {/* Navigation Tabs inside modal */}
              <div className="flex border-b border-am-gray-200 mb-4">
                <button
                  type="button"
                  onClick={() => setActiveTab("compra")}
                  className={`pb-2 text-xs font-bold uppercase tracking-wider mr-4 transition-colors ${
                    activeTab === "compra"
                      ? "border-b-2 border-am-magenta text-am-magenta"
                      : "text-zinc-500 hover:text-am-black"
                  }`}
                >
                  Comprar / Seleção
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("variacoes")}
                  className={`pb-2 text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-colors ${
                    activeTab === "variacoes"
                      ? "border-b-2 border-am-magenta text-am-magenta"
                      : "text-zinc-500 hover:text-am-black"
                  }`}
                >
                  <Layers size={13} />
                  Grade de Variações ({quickViewProduct.variations.length})
                </button>
              </div>

              {/* Tab 1: Standard Purchase Selection */}
              {activeTab === "compra" ? (
                <div className="space-y-4">
                  {/* Fabric details */}
                  <div className="text-xs text-zinc-600 bg-zinc-50 p-2.5 rounded-xl border border-zinc-200">
                    <p><strong>Descrição:</strong> {quickViewProduct.description}</p>
                    <p className="mt-1 text-[11px] text-zinc-500"><strong>Composição:</strong> {quickViewProduct.fabric}</p>
                  </div>

                  {/* Colors */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                      Cor Selecionada: <span className="text-am-magenta font-semibold">{selectedColor}</span>
                    </label>
                    <div className="flex gap-2">
                      {quickViewProduct.colors.map((color) => (
                        <button
                          key={color.name}
                          type="button"
                          onClick={() => setSelectedColor(color.name)}
                          className={`w-7 h-7 rounded-full border transition-all ${
                            selectedColor === color.name
                              ? "ring-2 ring-am-magenta ring-offset-2 scale-110"
                              : "border-zinc-300 hover:scale-105"
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Sizes */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-zinc-700">
                        Tamanho:
                      </label>
                      <span className="text-[11px] text-zinc-500">
                        Estoque desta variação: <strong className="text-emerald-700 font-bold">{activeStock} peças</strong>
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {quickViewProduct.sizes.map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={`w-10 h-10 rounded-xl font-bold text-xs uppercase transition-all border ${
                            selectedSize === size
                              ? "bg-am-black text-white border-am-black shadow-sm"
                              : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Tab 2: Variation Grid & Stock Matrix (Wholesale dream!) */
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  <p className="text-[11px] text-zinc-500">
                    Confira a disponibilidade de estoque e código individual de cada combinação:
                  </p>
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-am-gray-100 text-zinc-700 font-bold">
                        <th className="p-2 rounded-l-lg">Cor</th>
                        <th className="p-2">Tam</th>
                        <th className="p-2">SKU Variação</th>
                        <th className="p-2 rounded-r-lg text-right">Estoque</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-am-gray-200">
                      {quickViewProduct.variations.map((v) => (
                        <tr 
                          key={v.id} 
                          onClick={() => {
                            setSelectedColor(v.color);
                            setSelectedSize(v.size);
                            setActiveTab("compra");
                          }}
                          className="hover:bg-am-magenta-light cursor-pointer transition-colors"
                        >
                          <td className="p-2 flex items-center gap-1.5">
                            <span 
                              className="w-3 h-3 rounded-full border border-zinc-300" 
                              style={{ backgroundColor: v.colorHex }}
                            />
                            <span className="font-medium text-zinc-800">{v.color}</span>
                          </td>
                          <td className="p-2 font-bold text-zinc-700">{v.size}</td>
                          <td className="p-2 font-mono text-[10px] text-zinc-500">{v.sku}</td>
                          <td className="p-2 text-right">
                            <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                              {v.stock} un
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 mt-4 border-t border-am-gray-200 flex gap-3">
              <div className="flex items-center border border-am-gray-300 rounded-xl bg-am-gray-50 px-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 py-1 font-bold text-zinc-600 hover:text-am-magenta"
                >
                  -
                </button>
                <span className="px-2 font-bold text-sm text-am-black">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 py-1 font-bold text-zinc-600 hover:text-am-magenta"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
                  added
                    ? "bg-emerald-600 text-white"
                    : "bg-am-black hover:bg-am-magenta text-white shadow-magenta-sm"
                }`}
              >
                {added ? (
                  <>
                    <Check size={16} />
                    Adicionado ao Carrinho!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    Adicionar ({mode === "atacado" ? "Atacado" : "Varejo"})
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
