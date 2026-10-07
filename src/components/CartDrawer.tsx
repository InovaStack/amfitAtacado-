"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  PhoneCall, 
  CheckCircle2,
  MapPin,
  User,
  Phone,
  FileText,
  Building2
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAdmin } from "@/context/AdminContext";
import { useAuth } from "@/context/AuthContext";
import { getWhatsAppLink } from "@/config/store";

interface DeliveryInfo {
  recipientName: string;
  phone: string;
  cep: string;
  address: string;
  city: string;
  notes: string;
}

const STORAGE_KEY = "amfit_delivery_info";

export const CartDrawer: React.FC = () => {
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
    isWholesaleQualified,
    wholesaleMinTarget,
  } = useCart();
  const { addOrder, storeConfig } = useAdmin();
  const { user } = useAuth();

  // Delivery Form State
  const [delivery, setDelivery] = useState<DeliveryInfo>({
    recipientName: "",
    phone: "",
    cep: "",
    address: "",
    city: "",
    notes: "",
  });

  const [isLoadingCep, setIsLoadingCep] = useState(false);

  // Load saved delivery info from LocalStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          setDelivery(JSON.parse(saved));
        }
      } catch {
        // ignore JSON parse errors
      }
    }
  }, []);

  // Save delivery info to LocalStorage
  const handleDeliveryChange = (field: keyof DeliveryInfo, value: string) => {
    setDelivery((prev) => {
      const updated = { ...prev, [field]: value };
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch {
          // ignore storage errors
        }
      }
      return updated;
    });
  };

  // Format Phone mask: (XX) XXXXX-XXXX
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, "");
    if (raw.length > 11) raw = raw.slice(0, 11);
    
    let formatted = raw;
    if (raw.length > 2) {
      formatted = `(${raw.slice(0, 2)}) ${raw.slice(2)}`;
    }
    if (raw.length > 7) {
      formatted = `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7)}`;
    }
    handleDeliveryChange("phone", formatted);
  };

  // Format and Auto-fetch CEP
  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, "");
    if (raw.length > 8) raw = raw.slice(0, 8);

    let formatted = raw;
    if (raw.length > 5) {
      formatted = `${raw.slice(0, 5)}-${raw.slice(5)}`;
    }
    handleDeliveryChange("cep", formatted);

    // Auto lookup when full CEP is typed
    if (raw.length === 8) {
      try {
        setIsLoadingCep(true);
        const res = await fetch(`https://viacep.com.br/ws/${raw}/json/`);
        const data = await res.json();
        if (!data.erro) {
          const autoAddress = `${data.logradouro ? data.logradouro + ", " : ""}${data.bairro ? data.bairro : ""}`;
          const autoCity = `${data.localidade} - ${data.uf}`;
          
          setDelivery((prev) => {
            const updated = {
              ...prev,
              address: prev.address ? prev.address : autoAddress,
              city: autoCity,
            };
            if (typeof window !== "undefined") {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            }
            return updated;
          });
        }
      } catch {
        // network fallback
      } finally {
        setIsLoadingCep(false);
      }
    }
  };

  // Validation rules
  const cleanPhone = delivery.phone.replace(/\D/g, "");
  const cleanCep = delivery.cep.replace(/\D/g, "");
  const isNameValid = delivery.recipientName.trim().length >= 3;
  const isPhoneValid = cleanPhone.length >= 10;
  const isCepValid = cleanCep.length >= 8;
  const isAddressValid = delivery.address.trim().length >= 4;
  const isCityValid = delivery.city.trim().length >= 3;

  const isWhatsAppActive = storeConfig.channelsStatus?.whatsappActive !== false;
  const isDeliveryComplete = isNameValid && isPhoneValid && isCepValid && isAddressValid && isCityValid;
  const canFinalize = items.length > 0 && isDeliveryComplete && isWhatsAppActive && isWholesaleQualified;

  if (!isCartOpen) return null;

  // Build WhatsApp Checkout message
  const handleWhatsAppCheckout = () => {
    if (!canFinalize || !isWhatsAppActive) return;

    let message = `*NOVO PEDIDO AM FIT - ${mode.toUpperCase()}*\n\n`;
    message += `Olá! Gostaria de fechar o seguinte pedido:\n\n`;

    // Lista de produtos
    message += `🛍️ *ITENS DO PEDIDO:*\n`;
    items.forEach((item, idx) => {
      const price = mode === "atacado" ? item.product.wholesalePrice : item.product.retailPrice;
      message += `${idx + 1}. *${item.product.name}*\n`;
      message += `   REF: ${item.product.sku}\n`;
      message += `   Cor: ${item.color} | Tamanho: ${item.size}\n`;
      message += `   Qtd: ${item.quantity} un. x R$ ${price.toFixed(2).replace(".", ",")} = R$ ${(price * item.quantity).toFixed(2).replace(".", ",")}\n\n`;
    });

    message += `---------------------------------\n`;
    message += `*Total de Peças:* ${totalItems}\n`;
    message += `*Subtotal:* R$ ${subtotal.toFixed(2).replace(".", ",")}\n`;
    message += `*Modalidade:* ${mode === "atacado" ? "Atacado (Direto de Fábrica)" : "Varejo"}\n\n`;

    // Dados de Entrega
    message += `📍 *DADOS PARA ENTREGA & CONTATO:*\n`;
    message += `• *Quem recebe:* ${delivery.recipientName.trim()}\n`;
    message += `• *WhatsApp / Contato:* ${delivery.phone.trim()}\n`;
    message += `• *CEP:* ${delivery.cep.trim()}\n`;
    message += `• *Endereço:* ${delivery.address.trim()}\n`;
    message += `• *Cidade/UF:* ${delivery.city.trim()}\n`;
    if (delivery.notes.trim()) {
      message += `• *Observações:* ${delivery.notes.trim()}\n`;
    }

    message += `\nPor favor, confirme a disponibilidade e envie as opções de frete e chave PIX para pagamento!`;

    // Criar pedido no painel Admin automaticamente
    const newOrderNumber = `${mode === "atacado" ? "ATAC" : "AM"}-${Math.floor(10000 + Math.random() * 90000)}`;
    const orderItems = items.map((i) => ({
      name: i.product.name,
      productName: i.product.name,
      sku: i.product.sku,
      size: i.size,
      color: i.color,
      quantity: i.quantity,
      price: mode === "atacado" ? (i.product.wholesalePrice ?? (i.product as any).priceWholesale ?? 0) : (i.product.retailPrice ?? (i.product as any).priceRetail ?? 0),
      unitPrice: mode === "atacado" ? (i.product.wholesalePrice ?? (i.product as any).priceWholesale ?? 0) : (i.product.retailPrice ?? (i.product as any).priceRetail ?? 0),
    }));

    addOrder({
      orderNumber: newOrderNumber,
      customerName: delivery.recipientName.trim(),
      clientName: delivery.recipientName.trim(),
      customerEmail: user?.email || `${delivery.recipientName.toLowerCase().replace(/\s+/g, ".")}@cliente.com`,
      clientEmail: user?.email || `${delivery.recipientName.toLowerCase().replace(/\s+/g, ".")}@cliente.com`,
      customerPhone: delivery.phone.trim(),
      clientPhone: delivery.phone.trim(),
      customerDocument: user?.document || "Consumidor Final",
      customerType: mode,
      type: mode,
      companyName: user?.companyName,
      date: new Date().toLocaleDateString("pt-BR"),
      status: "Novo",
      itemsCount: totalItems,
      subtotal,
      shipping: 0,
      total: subtotal,
      paymentMethod: "A combinar via WhatsApp",
      trackingCode: "GERANDO-RASTREIO",
      carrier: "Correios (Sedex)",
      trackingCompany: "Correios (Sedex)",
      address: `${delivery.address.trim()} - ${delivery.city.trim()} (CEP: ${delivery.cep.trim()})`,
      items: orderItems,
    });

    window.open(getWhatsAppLink(message, storeConfig.contact.whatsappNumber), "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Drawer com largura ampliada: max-w-xl até max-w-2xl */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-3 sm:pl-8">
        <div className="w-screen max-w-lg sm:max-w-xl lg:max-w-2xl bg-white shadow-2xl flex flex-col justify-between border-l border-am-gray-200">
          
          {/* Header Ampliado */}
          <div className="p-5 sm:p-6 border-b border-am-gray-200 flex items-center justify-between bg-am-gray-50/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-am-magenta-light text-am-magenta flex items-center justify-center">
                <ShoppingBag size={22} />
              </div>
              <div>
                <h3 className="font-black text-lg sm:text-xl text-am-black uppercase tracking-tight">
                  Sua Sacola
                </h3>
                <span className="text-xs sm:text-sm font-semibold text-zinc-500">
                  {totalItems} {totalItems === 1 ? "peça selecionada" : "peças selecionadas"}
                </span>
              </div>
            </div>
            
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-zinc-500 hover:text-am-black hover:bg-am-gray-200 transition-colors"
              aria-label="Fechar carrinho"
            >
              <X size={24} />
            </button>
          </div>

          {/* Pricing Mode switcher */}
          <div className="px-5 sm:px-6 py-3.5 bg-white border-b border-am-gray-200 flex items-center justify-between">
            <span className="font-bold text-xs sm:text-sm text-zinc-700">Tabela de Preço:</span>
            <div className="flex items-center gap-1.5 bg-am-gray-100 p-1 rounded-xl border border-am-gray-300">
              <button
                type="button"
                onClick={() => setMode("varejo")}
                className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-black transition-all ${
                  mode === "varejo" ? "bg-white text-am-black shadow-xs" : "text-zinc-500 hover:text-am-black"
                }`}
              >
                Varejo
              </button>
              <button
                type="button"
                onClick={() => setMode("atacado")}
                className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-black transition-all ${
                  mode === "atacado" ? "bg-am-magenta text-white shadow-xs" : "text-zinc-500 hover:text-am-black"
                }`}
              >
                Atacado
              </button>
            </div>
          </div>

          {/* Scrollable Container (Items + Delivery Form) */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-7">
            
            {/* 1. Items List */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-zinc-600">
                  Itens Selecionados ({totalItems})
                </span>
                {items.length > 0 && (
                  <button 
                    onClick={clearCart}
                    className="text-xs text-zinc-400 hover:text-rose-600 underline font-medium"
                  >
                    Esvaziar sacola
                  </button>
                )}
              </div>

              {items.length === 0 ? (
                <div className="h-52 flex flex-col items-center justify-center text-center text-zinc-400 py-8 border border-dashed border-zinc-200 rounded-2xl">
                  <ShoppingBag size={44} className="mb-2 text-zinc-300 stroke-1" />
                  <p className="text-sm font-bold text-zinc-700">Sua sacola está vazia</p>
                  <p className="text-xs text-zinc-400 mt-1 max-w-xs">
                    Navegue pelo catálogo e adicione suas peças fitness favoritas.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-am-gray-200">
                  {items.map((item) => {
                    const itemPrice = mode === "atacado" ? item.product.wholesalePrice : item.product.retailPrice;

                    return (
                      <div key={`${item.product.id}-${item.size}-${item.color}`} className="py-4 flex gap-4 items-center">
                        {/* Foto ampliada */}
                        <div className="relative w-20 h-24 sm:w-22 sm:h-28 bg-zinc-100 rounded-2xl overflow-hidden shrink-0 border border-am-gray-200">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        </div>

                        {/* Dados do produto com fontes maiores */}
                        <div className="flex-1 flex flex-col justify-between self-stretch">
                          <div>
                            <div className="flex justify-between items-start gap-2">
                              <h4 className="font-bold text-sm sm:text-base text-am-black line-clamp-1 leading-snug">
                                {item.product.name}
                              </h4>
                              <button
                                onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                                className="text-zinc-400 hover:text-rose-600 transition-colors p-1"
                                aria-label="Remover item"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                            <div className="flex items-center gap-3 text-xs sm:text-sm text-zinc-600 mt-1">
                              <span>Tam: <strong className="text-am-black">{item.size}</strong></span>
                              <span>•</span>
                              <span>Cor: <strong className="text-am-black">{item.color}</strong></span>
                              <span>•</span>
                              <span className="text-zinc-400 text-xs">{item.product.sku}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-am-gray-100">
                            {/* Controle de quantidade com botões maiores */}
                            <div className="flex items-center border border-am-gray-300 rounded-xl overflow-hidden bg-am-gray-50">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-am-gray-200 text-zinc-700 transition-colors"
                                aria-label="Diminuir quantidade"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="px-3 text-xs sm:text-sm font-black text-zinc-900">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-am-gray-200 text-zinc-700 transition-colors"
                                aria-label="Aumentar quantidade"
                              >
                                <Plus size={14} />
                              </button>
                            </div>

                            {/* Preço ampliado */}
                            <div className="text-right">
                              <span className="text-sm sm:text-base font-black text-am-black block">
                                R$ {(itemPrice * item.quantity).toFixed(2).replace(".", ",")}
                              </span>
                              <span className="block text-[11px] sm:text-xs text-zinc-400">
                                R$ {itemPrice.toFixed(2).replace(".", ",")} / un
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 2. Formulário de Entrega & Contato Ampliado */}
            {items.length > 0 && (
              <div className="pt-4 border-t-2 border-am-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-am-magenta/10 text-am-magenta flex items-center justify-center">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-black uppercase tracking-tight text-am-black">
                        Dados para Entrega & Contato
                      </h4>
                      <p className="text-xs text-zinc-500">
                        Preencha para calcular frete e finalizar no WhatsApp
                      </p>
                    </div>
                  </div>

                  {isDeliveryComplete ? (
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-300 self-start sm:self-auto">
                      <CheckCircle2 size={14} /> Tudo preenchido
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-300 self-start sm:self-auto">
                      Preenchimento obrigatório
                    </span>
                  )}
                </div>

                <div className="space-y-4 bg-zinc-50/80 p-4 sm:p-5 rounded-2xl border border-zinc-200">
                  {/* Nome de quem vai receber */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-zinc-800 mb-1.5">
                      Pessoa que vai receber o pedido <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                      <input
                        type="text"
                        value={delivery.recipientName}
                        onChange={(e) => handleDeliveryChange("recipientName", e.target.value)}
                        placeholder="Nome completo de quem vai receber"
                        className={`w-full pl-10 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl bg-white border ${
                          delivery.recipientName && !isNameValid
                            ? "border-rose-400"
                            : "border-zinc-300 focus:border-am-magenta"
                        } focus:outline-none transition-colors shadow-xs`}
                      />
                    </div>
                  </div>

                  {/* WhatsApp / Contato */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-zinc-800 mb-1.5">
                      Número de WhatsApp para contato e envio <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                      <input
                        type="text"
                        value={delivery.phone}
                        onChange={handlePhoneChange}
                        placeholder="(00) 00000-0000"
                        maxLength={15}
                        className={`w-full pl-10 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl bg-white border ${
                          delivery.phone && !isPhoneValid
                            ? "border-rose-400"
                            : "border-zinc-300 focus:border-am-magenta"
                        } focus:outline-none transition-colors shadow-xs`}
                      />
                    </div>
                  </div>

                  {/* CEP & Cidade/UF */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-zinc-800 mb-1.5">
                        CEP <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={delivery.cep}
                          onChange={handleCepChange}
                          placeholder="00000-000"
                          maxLength={9}
                          className={`w-full px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl bg-white border ${
                            delivery.cep && !isCepValid
                              ? "border-rose-400"
                              : "border-zinc-300 focus:border-am-magenta"
                          } focus:outline-none transition-colors shadow-xs`}
                        />
                        {isLoadingCep && (
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-am-magenta animate-pulse font-bold">
                            Buscando...
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-zinc-800 mb-1.5">
                        Cidade / UF <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={delivery.city}
                        onChange={(e) => handleDeliveryChange("city", e.target.value)}
                        placeholder="Ex: São Paulo - SP"
                        className={`w-full px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl bg-white border ${
                          delivery.city && !isCityValid
                            ? "border-rose-400"
                            : "border-zinc-300 focus:border-am-magenta"
                        } focus:outline-none transition-colors shadow-xs`}
                      />
                    </div>
                  </div>

                  {/* Endereço completo (Rua, Número, Bairro) */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-zinc-800 mb-1.5">
                      Endereço (Rua, Número, Apto, Bairro) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={delivery.address}
                      onChange={(e) => handleDeliveryChange("address", e.target.value)}
                      placeholder="Ex: Av. Paulista, 1000, Apto 42 - Bela Vista"
                      className={`w-full px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl bg-white border ${
                        delivery.address && !isAddressValid
                          ? "border-rose-400"
                          : "border-zinc-300 focus:border-am-magenta"
                      } focus:outline-none transition-colors shadow-xs`}
                    />
                  </div>

                  {/* Observações / Ponto de Referência */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-zinc-800 mb-1.5">
                      Observações de Entrega (Opcional)
                    </label>
                    <div className="relative">
                      <FileText size={18} className="absolute left-3.5 top-3 text-zinc-400" />
                      <textarea
                        rows={2}
                        value={delivery.notes}
                        onChange={(e) => handleDeliveryChange("notes", e.target.value)}
                        placeholder="Ex: Ponto de referência, portaria, horário preferencial para entrega..."
                        className="w-full pl-10 pr-3.5 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl bg-white border border-zinc-300 focus:border-am-magenta focus:outline-none transition-colors resize-none shadow-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Footer Checkout Bar Ampliado */}
          {items.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-am-gray-200 bg-white space-y-4 shadow-lg">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs sm:text-sm text-zinc-600">
                  <span>Total de Peças:</span>
                  <span className="font-bold text-zinc-900">{totalItems} peças</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-am-gray-100">
                  <span className="text-sm sm:text-base font-bold text-zinc-800">Subtotal:</span>
                  <span className="text-xl sm:text-2xl font-black text-am-magenta font-mono">
                    R$ {subtotal.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              </div>

              {/* Avisos de Validação */}
              <div className="space-y-2">
                {!isWhatsAppActive ? (
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs sm:text-sm flex items-center gap-2.5">
                    <PhoneCall size={18} className="shrink-0 text-amber-600" />
                    <span>O canal de pedidos via WhatsApp está pausado pela administração no momento.</span>
                  </div>
                ) : mode === "atacado" && !isWholesaleQualified ? (
                  <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-300 text-purple-900 text-xs sm:text-sm flex items-center gap-2.5">
                    <Building2 size={18} className="shrink-0 text-purple-600" />
                    <span>
                      <strong>Pedido Mínimo de Atacado:</strong> Adicione pelo menos {storeConfig.commercial?.minWholesalePieces || 6} peças variadas ou R$ {(storeConfig.commercial?.minWholesaleOrderAmount || 300).toLocaleString("pt-BR")},00 para liberar o checkout de fábrica.
                    </span>
                  </div>
                ) : !isDeliveryComplete ? (
                  <div className="p-3 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-700 text-xs sm:text-sm flex items-center gap-2.5">
                    <MapPin size={18} className="shrink-0 text-am-magenta" />
                    <span>Preencha os dados de entrega acima para liberar o botão.</span>
                  </div>
                ) : null}

                {/* Botão Condicional para Finalizar no WhatsApp Ampliado */}
                <button
                  type="button"
                  onClick={handleWhatsAppCheckout}
                  disabled={!canFinalize}
                  className={`w-full py-4 sm:py-4.5 px-6 rounded-2xl font-black text-sm sm:text-base uppercase tracking-wider flex items-center justify-center gap-3 transition-all shadow-lg ${
                    canFinalize
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30 cursor-pointer active:scale-98"
                      : "bg-zinc-200 text-zinc-400 cursor-not-allowed border border-zinc-300 shadow-none opacity-60 grayscale"
                  }`}
                >
                  <PhoneCall size={22} />
                  <span>
                    {!isWhatsAppActive
                      ? "Canal WhatsApp Temporariamente Indisponível"
                      : mode === "atacado" && !isWholesaleQualified
                      ? "Atingir Mínimo de Atacado para Finalizar"
                      : canFinalize
                      ? "Finalizar Pedido no WhatsApp"
                      : "Preencha a Entrega para Finalizar"}
                  </span>
                </button>

                <p className="text-center text-xs text-zinc-500 pt-1">
                  {isWhatsAppActive 
                    ? "Ao clicar, seus dados e a lista do pedido serão enviados diretamente ao WhatsApp da fábrica."
                    : "Aguarde a reativação do canal pela loja para envio de novos pedidos."}
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
