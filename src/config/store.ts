export const STORE_CONFIG = {
  name: "AM FIT",
  tradeName: "AM FIT Atacado & Varejo",
  tagline: "Moda Fitness Direto da Fábrica com Alta Compressão",
  domain: "amfitatacado.com.br",
  
  contact: {
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511999999999",
    whatsappFormatted: process.env.NEXT_PUBLIC_WHATSAPP_FORMATTED || "(11) 99999-9999",
    email: process.env.NEXT_PUBLIC_STORE_EMAIL || "contato@amfitatacado.com.br",
    salesEmail: "vendas@amfitatacado.com.br",
    hours: "Segunda a Sexta: 08:00 às 18:00 | Sábados: 09:00 às 13:00",
  },

  social: {
    instagram: "@amfit.oficial",
    instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/amfit.oficial",
    shopeeUrl: process.env.NEXT_PUBLIC_SHOPEE_URL || "https://shopee.com.br",
    mercadoLivreUrl: process.env.NEXT_PUBLIC_MERCADOLIVRE_URL || "https://www.mercadolivre.com.br",
  },

  address: {
    city: "São Paulo",
    state: "SP",
    neighborhood: "Brás / Bom Retiro",
    fullAddress: "Polo de Confecção - Brás / Bom Retiro - São Paulo, SP",
  },

  commercial: {
    minWholesaleOrderAmount: 600,
    minWholesalePieces: 6,
    freeShippingRetailThreshold: 299,
    maxInstallments: 6,
    pixDiscountPercentage: 5,
  },
};

/**
 * Gera o link direto para o WhatsApp com número sanitizado e mensagem codificada
 */
export function getWhatsAppLink(customMessage?: string): string {
  const cleanNumber = STORE_CONFIG.contact.whatsappNumber.replace(/\D/g, "");
  const message = customMessage || "Olá! Gostaria de mais informações sobre as peças da AM FIT.";
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
