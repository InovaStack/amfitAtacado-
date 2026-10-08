export interface StoreConfig {
  name: string;
  tradeName: string;
  tagline: string;
  domain: string;
  contact: {
    whatsappNumber: string;
    whatsappFormatted: string;
    email: string;
    salesEmail: string;
    hours: string;
  };
  social: {
    instagram: string;
    instagramUrl: string;
    shopeeUrl: string;
    mercadoLivreUrl: string;
  };
  address: {
    city: string;
    state: string;
    neighborhood: string;
    fullAddress: string;
  };
  commercial: {
    minWholesaleOrderAmount: number;
    minWholesalePieces: number;
    freeShippingRetailThreshold: number;
    maxInstallments: number;
    pixDiscountPercentage: number;
  };
  channelsStatus: {
    whatsappActive: boolean;
    instagramActive: boolean;
    shopeeActive: boolean;
    mercadoLivreActive: boolean;
  };
  policies: {
    factoryOrigin: string;
    wholesaleRule: string;
    warrantyAndExchange: string;
    shippingPolicy: string;
    announcementBarText: string;
  };
}

export const STORE_CONFIG: StoreConfig = {
  name: "AM FIT",
  tradeName: "AM FIT Atacado & Varejo",
  tagline: "Lucre 100% com nossos produtos | Atacado Preço de fábrica",
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
    minWholesaleOrderAmount: 300,
    minWholesalePieces: 6,
    freeShippingRetailThreshold: 299,
    maxInstallments: 6,
    pixDiscountPercentage: 5,
  },

  channelsStatus: {
    whatsappActive: true,
    instagramActive: true,
    shopeeActive: true,
    mercadoLivreActive: true,
  },

  policies: {
    factoryOrigin: "Confecção própria sediada em São Paulo - SP. Despacho ágil para todos os estados do Brasil via Correios e transportadoras parceiras.",
    wholesaleRule: "Pedido mínimo no atacado a partir de 6 peças variadas ou R$ 300,00. Grade totalmente livre sem obrigatoriedade de conjuntos ou tamanhos únicos.",
    warrantyAndExchange: "Garantia total de Zero Transparência em poliamida de alta gramatura. 1ª Troca facilitada em até 7 dias corridos após o recebimento.",
    shippingPolicy: "Envio rápido em até 24h úteis após confirmação de pagamento com código de rastreamento enviado diretamente no WhatsApp.",
    announcementBarText: "Lucre 100% com nossos produtos | Atacado Preço de fábrica",
  },
};

/**
 * Retorna a configuração atualizada da loja (priorizando a persistida no localStorage)
 */
export function getActiveStoreConfig(): StoreConfig {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem("am_fit_store_config");
      if (saved) {
        return {
          ...STORE_CONFIG,
          ...JSON.parse(saved),
          contact: { ...STORE_CONFIG.contact, ...JSON.parse(saved).contact },
          social: { ...STORE_CONFIG.social, ...JSON.parse(saved).social },
          address: { ...STORE_CONFIG.address, ...JSON.parse(saved).address },
          commercial: { ...STORE_CONFIG.commercial, ...JSON.parse(saved).commercial },
          channelsStatus: { ...STORE_CONFIG.channelsStatus, ...JSON.parse(saved).channelsStatus },
          policies: { ...STORE_CONFIG.policies, ...JSON.parse(saved).policies },
        };
      }
    } catch {}
  }
  return STORE_CONFIG;
}

/**
 * Gera o link direto para o WhatsApp com número sanitizado e mensagem codificada
 */
export function getWhatsAppLink(customMessage?: string, phoneOverride?: string): string {
  const number = phoneOverride || (typeof window !== "undefined" ? getActiveStoreConfig().contact.whatsappNumber : STORE_CONFIG.contact.whatsappNumber);
  const cleanNumber = number.replace(/\D/g, "");
  const message = customMessage || "Olá! Gostaria de mais informações sobre as peças da AM FIT.";
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
