"use client";

import React from "react";
import Image from "next/image";
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Building2, 
  Truck, 
  CheckCircle2,
  ExternalLink,
  FileText
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export const CartDrawer: React.FC = () => {
  const { isAuthenticated, requestWholesaleQuote, openAuthModal } = useAuth();
  const {
    isCartOpen,
    setIsCartOpen,
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    mode,
    setMode,
    subtotal,
    totalItems,
    wholesaleMinTarget,
    isWholesaleQualified,
  } = useCart();

  if (!isCartOpen) return null;

  // Free shipping threshold for retail
  const freeShippingThreshold = 299;
  const retailFreeShippingReached = subtotal >= freeShippingThreshold;

  // Wholesale progress
  const wholesaleProgress = Math.min(100, Math.round((subtotal / wholesaleMinTarget) * 100));
  const retailProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  // Build WhatsApp Checkout message
  const handleWhatsAppCheckout = () => {
    let message = `*NOVO PEDIDO AM FIT (${mode.toUpperCase()})*\n\n`;
    items.forEach((item, idx) => {
      const price = mode === "atacado" ? item.product.wholesalePrice : item.product.retailPrice;
      message += `${idx + 1}. *${item.product.name}*\n`;
      message += `   Tamanho: ${item.size} | Cor: ${item.color}\n`;
      message += `   Qtd: ${item.quantity} x R$ ${price.toFixed(2)} = R$ ${(price * item.quantity).toFixed(2)}\n\n`;
    });

    message += `---------------------------------\n`;
    message += `*Total de Peças:* ${totalItems}\n`;
    message += `*Subtotal:* R$ ${subtotal.toFixed(2)}\n`;
    message += `*Modalidade:* ${mode === "atacado" ? "Atacado (Revenda)" : "Varejo (Consumo Próprio)"}\n\n`;
    message += `Olá! Gostaria de finalizar meu pedido e calcular o frete para o meu CEP.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/5511999999999?text=${encoded}`, "_blank");
  };

  const handleRequestQuote = () => {
    if (!isAuthenticated) {
      setIsCartOpen(false);
      openAuthModal("atacado", "register");
      return;
    }
    const quote = requestWholesaleQuote(items, "Cotação gerada via carrinho online de atacado.");
    alert(`Orçamento #${quote.quoteNumber} gerado com sucesso! Você pode acompanhá-lo e baixar na sua Área do Cliente.`);
    setIsCartOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-am-gray-200">
          
          {/* Header */}
          <div className="p-5 border-b border-am-gray-200 flex items-center justify-between bg-am-gray-50/70">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-am-magenta" />
              <h3 className="font-black text-base text-am-black uppercase">
                Seu Carrinho ({totalItems})
              </h3>
            </div>
            
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-zinc-500 hover:text-am-black hover:bg-am-gray-200 transition-colors"
              aria-label="Fechar carrinho"
            >
              <X size={20} />
            </button>
          </div>

          {/* Pricing Mode switcher inside drawer */}
          <div className="px-5 py-3 bg-white border-b border-am-gray-200 flex items-center justify-between text-xs">
            <span className="font-semibold text-zinc-500">Tabela de Preço:</span>
            <div className="flex items-center gap-1 bg-am-gray-100 p-1 rounded-full border border-am-gray-300">
              <button
                type="button"
                onClick={() => setMode("varejo")}
                className={`px-2.5 py-1 rounded-full font-bold transition-all ${
                  mode === "varejo" ? "bg-white text-am-black shadow-xs" : "text-zinc-500"
                }`}
              >
                Varejo
              </button>
              <button
                type="button"
                onClick={() => setMode("atacado")}
                className={`px-2.5 py-1 rounded-full font-bold transition-all ${
                  mode === "atacado" ? "bg-am-magenta text-white shadow-xs" : "text-zinc-500"
                }`}
              >
                Atacado
              </button>
            </div>
          </div>

          {/* Dynamic Progress Indicator */}
          <div className="px-5 py-3 bg-am-magenta-light/50 border-b border-am-magenta-border">
            {mode === "atacado" ? (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-am-black">
                  <span className="flex items-center gap-1">
                    <Building2 size={14} className="text-am-magenta" />
                    Mínimo Atacado (R$ {wholesaleMinTarget} ou 6 pcs)
                  </span>
                  <span>{wholesaleProgress}%</span>
                </div>
                <div className="w-full bg-am-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-am-magenta h-full rounded-full transition-all duration-300"
                    style={{ width: `${wholesaleProgress}%` }}
                  />
                </div>
                {isWholesaleQualified ? (
                  <p className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 size={12} /> Pedido qualificado para preços de fábrica!
                  </p>
                ) : (
                  <p className="text-[11px] text-zinc-600">
                    Faltam <strong>R$ {(wholesaleMinTarget - subtotal).toFixed(2).replace(".", ",")}</strong> para liberar a compra no atacado.
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-am-black">
                  <span className="flex items-center gap-1">
                    <Truck size={14} className="text-am-magenta" />
                    Frete Grátis Brasil (acima de R$ 299)
                  </span>
                  <span>{retailProgress}%</span>
                </div>
                <div className="w-full bg-am-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-am-magenta h-full rounded-full transition-all duration-300"
                    style={{ width: `${retailProgress}%` }}
                  />
                </div>
                {retailFreeShippingReached ? (
                  <p className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 size={12} /> Você ganhou Frete Grátis!
                  </p>
                ) : (
                  <p className="text-[11px] text-zinc-600">
                    Adicione mais <strong>R$ {(freeShippingThreshold - subtotal).toFixed(2).replace(".", ",")}</strong> para Frete Grátis.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-am-gray-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-am-gray-100 flex items-center justify-center text-zinc-400">
                  <ShoppingBag size={30} />
                </div>
                <div>
                  <h4 className="font-black text-base text-am-black">Seu carrinho está vazio</h4>
                  <p className="text-xs text-zinc-500 mt-1 max-w-xs">
                    Explore nossas coleções fitness e adicione suas peças favoritas no atacado ou varejo.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-am-black hover:bg-am-magenta text-white font-bold text-xs uppercase tracking-wider rounded-full transition-colors"
                >
                  Explorar Loja
                </button>
              </div>
            ) : (
              items.map((item) => {
                const itemPrice = mode === "atacado" ? item.product.wholesalePrice : item.product.retailPrice;

                return (
                  <div key={`${item.product.id}-${item.size}-${item.color}`} className="py-4 flex gap-4">
                    {/* Item Image */}
                    <div className="relative w-16 h-20 bg-zinc-100 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-bold text-xs sm:text-sm text-am-black line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                            className="text-zinc-400 hover:text-rose-600 transition-colors"
                            title="Remover produto"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                        <div className="text-[11px] text-zinc-500 mt-0.5 flex gap-2">
                          <span>Tam: <strong>{item.size}</strong></span>
                          <span>•</span>
                          <span>Cor: <strong>{item.color}</strong></span>
                        </div>
                      </div>

                      {/* Quantity & Unit Price */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-am-gray-300 rounded-lg overflow-hidden bg-am-gray-50">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                            className="p-1 hover:bg-am-gray-200 text-zinc-600 transition-colors"
                            aria-label="Diminuir quantidade"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="px-2 text-xs font-bold text-zinc-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                            className="p-1 hover:bg-am-gray-200 text-zinc-600 transition-colors"
                            aria-label="Aumentar quantidade"
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-black text-am-black">
                            R$ {(itemPrice * item.quantity).toFixed(2).replace(".", ",")}
                          </span>
                          <span className="block text-[10px] text-zinc-400">
                            (R$ {itemPrice.toFixed(2).replace(".", ",")} un)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Checkout Bar */}
          {items.length > 0 && (
            <div className="p-5 border-t border-am-gray-200 bg-white space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-zinc-500">
                  <span>Total de Peças:</span>
                  <span className="font-bold text-zinc-800">{totalItems} peças</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-black text-am-black pt-1 border-t border-am-gray-100">
                  <span>Subtotal:</span>
                  <span className="text-am-magenta">
                    R$ {subtotal.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleWhatsAppCheckout}
                  disabled={mode === "atacado" && !isWholesaleQualified}
                  className={`w-full py-3.5 px-4 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
                    mode === "atacado" && !isWholesaleQualified
                      ? "bg-zinc-300 text-zinc-500 cursor-not-allowed"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20"
                  }`}
                >
                  <ExternalLink size={16} />
                  <span>Finalizar Pedido no WhatsApp</span>
                </button>

                {mode === "atacado" && (
                  <button
                    type="button"
                    onClick={handleRequestQuote}
                    className="w-full py-3 px-4 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all border-2 border-am-magenta text-am-magenta hover:bg-pink-50"
                  >
                    <FileText size={16} />
                    <span>Solicitar Orçamento Formal (Fábrica)</span>
                  </button>
                )}

                <div className="flex items-center justify-between text-[11px] text-zinc-400 px-1">
                  <span>Atendimento rápido via WhatsApp</span>
                  <button 
                    onClick={clearCart}
                    className="hover:text-rose-600 underline"
                  >
                    Esvaziar carrinho
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
