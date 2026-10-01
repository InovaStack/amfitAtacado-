"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, PRODUCTS as INITIAL_PRODUCTS, CAMPAIGNS as INITIAL_CAMPAIGNS } from "@/data/products";

export interface AdminProduct {
  id: string;
  sku?: string;
  name: string;
  department?: "Feminino" | "Masculino" | "Infantil" | string;
  type?: string;
  categories?: string[];
  category: any;
  categoryLabel?: string;
  retailPrice?: number;
  wholesalePrice?: number;
  priceRetail: number;
  priceWholesale: number;
  minWholesaleQty: number;
  images: string[];
  sizes: string[];
  colors: any[];
  stock: number;
  variations?: any[];
  isNew?: boolean;
  isBestSeller?: boolean;
  rating: number;
  reviewsCount?: number;
  fabric?: string;
  description: string;
  badge?: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "proprietario" | "gerente";
}

export type AdminOrderStatus =
  | "novo"
  | "pago"
  | "preparacao"
  | "enviado"
  | "entregue"
  | "cancelado"
  | "Novo"
  | "Pago"
  | "Em preparação"
  | "Enviado"
  | "Entregue"
  | "Cancelado"
  | string;

export interface AdminOrder {
  id: string;
  orderNumber?: string;
  customerName?: string;
  clientName?: string;
  customerEmail?: string;
  clientEmail?: string;
  customerPhone?: string;
  clientPhone?: string;
  customerDocument?: string;
  customerType?: "varejo" | "atacado";
  type?: "varejo" | "atacado";
  companyName?: string;
  date: string;
  status: AdminOrderStatus;
  itemsCount?: number;
  total: number;
  subtotal?: number;
  shipping?: number;
  paymentMethod?: string;
  trackingCode?: string;
  carrier?: string;
  trackingCompany?: string;
  address?: string;
  shippingAddress?: any;
  items: any[];
}

export interface AdminClient {
  id: string;
  name: string;
  email: string;
  phone: string;
  document?: string; // CPF ou CNPJ
  cpf?: string;
  cnpj?: string;
  accountType?: "varejo" | "atacado";
  type?: "varejo" | "atacado";
  companyName?: string;
  tradeName?: string;
  wholesaleStatus?: "approved" | "pending" | "rejected" | "aprovado" | "pendente" | "rejeitado" | string;
  city?: string;
  state?: string;
  totalOrders: number;
  totalSpent: number;
  createdAt: string;
}

export interface AdminBanner {
  id: string;
  type?: "principal" | "campanha" | "promocao" | "lancamento";
  category?: "principal" | "campanha" | "promocao" | "lancamento";
  tag?: string;
  title: string;
  subtitle?: string;
  image?: string;
  imageUrl?: string;
  ctaText?: string;
  ctaLink: string;
  badge?: string;
  isActive?: boolean;
  active?: boolean;
}

export interface AdminCoupon {
  id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minOrderValue?: number;
  minValue: number;
  validUntil: string;
  maxUses?: number;
  usageLimit: number;
  usedCount?: number;
  usageCount: number;
  applicableTo?: "todos" | "varejo" | "atacado";
  isActive?: boolean;
  active?: boolean;
}

interface AdminContextType {
  isAdminAuthenticated: boolean;
  adminUser: AdminUser | null;
  adminLogin: (email: string, password?: string) => Promise<boolean>;
  adminLogout: () => void;
  
  // Produtos
  products: any[];
  addProduct: (product: any) => void;
  updateProduct: (id: string, product: any) => void;
  deleteProduct: (id: string) => void;

  // Pedidos
  orders: AdminOrder[];
  updateOrderStatus: (orderId: string, status: AdminOrderStatus) => void;
  updateOrderTracking: (orderId: string, trackingCode: string, trackingCompany: string) => void;
  addOrder: (order: Omit<AdminOrder, "id">) => void;

  // Clientes
  clients: AdminClient[];
  updateClientWholesaleStatus: (clientId: string, status: "approved" | "pending" | "rejected") => void;
  updateClientStatus: (clientId: string, status: "aprovado" | "pendente" | "rejeitado" | "approved" | "pending" | "rejected") => void;

  // Banners
  banners: AdminBanner[];
  addBanner: (banner: Omit<AdminBanner, "id"> | any) => void;
  updateBanner: (id: string, banner: Partial<AdminBanner> | any) => void;
  deleteBanner: (id: string) => void;
  toggleBannerStatus: (id: string) => void;
  toggleBannerActive: (id: string) => void;

  // Cupons
  coupons: AdminCoupon[];
  addCoupon: (coupon: Omit<AdminCoupon, "id" | "usedCount"> | any) => void;
  updateCoupon: (id: string, coupon: Partial<AdminCoupon> | any) => void;
  deleteCoupon: (id: string) => void;
  toggleCouponStatus: (id: string) => void;
  toggleCouponActive: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Dados Iniciais Realistas
const INITIAL_ADMIN_ORDERS: AdminOrder[] = [
  {
    id: "adm-ord-1",
    orderNumber: "AM-84920",
    customerName: "Camila Oliveira",
    customerEmail: "camila@amfit.com.br",
    customerPhone: "(11) 98765-4321",
    customerDocument: "345.892.108-44",
    customerType: "varejo",
    date: "28/09/2026",
    status: "entregue",
    itemsCount: 2,
    subtotal: 189.80,
    shipping: 0,
    total: 189.80,
    paymentMethod: "PIX",
    trackingCode: "BR849201934BR",
    trackingCompany: "Correios Sedex",
    address: "Rua Oscar Freire, 1420 - São Paulo/SP",
    items: [
      { name: "Legging Power Compressão Empina Bumbum", sku: "REF-AM8401", size: "M", color: "Preto", quantity: 1, price: 119.90 },
      { name: "Top Nadador Alta Sustentação", sku: "REF-AM8402", size: "M", color: "Preto", quantity: 1, price: 69.90 },
    ],
  },
  {
    id: "adm-ord-2",
    orderNumber: "ATAC-40192",
    customerName: "Patrícia Mendes",
    companyName: "Fit Store Comércio de Roupas Esportivas Ltda",
    customerEmail: "contato@fitstore.com.br",
    customerPhone: "(11) 97654-3210",
    customerDocument: "34.567.890/0001-12",
    customerType: "atacado",
    date: "29/09/2026",
    status: "preparacao",
    itemsCount: 42,
    subtotal: 2065.80,
    shipping: 0,
    total: 1965.80,
    paymentMethod: "Faturado 30 Dias",
    trackingCode: "AGUARDANDO-COLETA",
    trackingCompany: "Braspress Cargas",
    address: "Rua das Figueiras, 850 - Santo André/SP",
    items: [
      { name: "Legging Power Compressão Empina Bumbum (Grade)", sku: "REF-AM8401", size: "P, M, G", color: "Preto, Marinho", quantity: 24, price: 59.90 },
      { name: "Top Nadador Alta Sustentação (Grade)", sku: "REF-AM8402", size: "P, M, G", color: "Preto, Rosa Neon", quantity: 18, price: 34.90 },
    ],
  },
  {
    id: "adm-ord-3",
    orderNumber: "AM-91042",
    customerName: "Mariana Alencar",
    customerEmail: "mariana.revenda@exemplo.com",
    customerPhone: "(19) 99876-5432",
    customerDocument: "28.901.234/0001-99",
    customerType: "varejo",
    date: "30/09/2026",
    status: "enviado",
    itemsCount: 1,
    subtotal: 169.90,
    shipping: 19.90,
    total: 189.80,
    paymentMethod: "Cartão de Crédito (3x)",
    trackingCode: "AM910425510BR",
    trackingCompany: "Jadlog Express",
    address: "Av. Brasil, 1500 - Campinas/SP",
    items: [
      { name: "Conjunto Seamless Canelado Zero Costura", sku: "REF-AM8403", size: "P", color: "Cinza Mescla", quantity: 1, price: 169.90 },
    ],
  },
  {
    id: "adm-ord-4",
    orderNumber: "ATAC-52011",
    customerName: "Rodrigo Vasconcelos",
    companyName: "Academia Iron Fit & Store",
    customerEmail: "rodrigo@ironfit.com.br",
    customerPhone: "(21) 98111-2233",
    customerDocument: "45.123.789/0001-55",
    customerType: "atacado",
    date: "01/10/2026",
    status: "pago",
    itemsCount: 60,
    subtotal: 3450.00,
    shipping: 0,
    total: 3450.00,
    paymentMethod: "PIX",
    address: "Av. das Américas, 4200 - Barra da Tijuca, Rio de Janeiro/RJ",
    items: [
      { name: "Conjunto Fit Power Magenta Glow", sku: "REF-AM8401", size: "M", color: "Magenta AM", quantity: 30, price: 89.90 },
      { name: "Shorts Suplex Alta Compressão", sku: "REF-AM8404", size: "G", color: "Preto", quantity: 30, price: 25.10 },
    ],
  },
  {
    id: "adm-ord-5",
    orderNumber: "AM-92301",
    customerName: "Juliana Barreto",
    customerEmail: "juliana.barreto@gmail.com",
    customerPhone: "(31) 99222-3344",
    customerDocument: "458.129.832-11",
    customerType: "varejo",
    date: "01/10/2026",
    status: "novo",
    itemsCount: 3,
    subtotal: 289.70,
    shipping: 0,
    total: 289.70,
    paymentMethod: "PIX",
    address: "Rua Sergipe, 900 - Savassi, Belo Horizonte/MG",
    items: [
      { name: "Top Nadador Alta Sustentação", sku: "REF-AM8402", size: "P", color: "Branco", quantity: 2, price: 69.90 },
      { name: "Legging Power Compressão", sku: "REF-AM8401", size: "P", color: "Marinho", quantity: 1, price: 119.90 },
    ],
  },
];

const INITIAL_ADMIN_CLIENTS: AdminClient[] = [
  {
    id: "cli-1",
    name: "Camila Oliveira",
    email: "camila@amfit.com.br",
    phone: "(11) 98765-4321",
    document: "345.892.108-44",
    accountType: "varejo",
    city: "São Paulo",
    state: "SP",
    totalOrders: 4,
    totalSpent: 649.20,
    createdAt: "12/05/2026",
  },
  {
    id: "cli-2",
    name: "Patrícia Mendes",
    companyName: "Fit Store Comércio de Roupas Esportivas Ltda",
    tradeName: "Fit Store Boutique",
    email: "contato@fitstore.com.br",
    phone: "(11) 97654-3210",
    document: "34.567.890/0001-12",
    accountType: "atacado",
    wholesaleStatus: "approved",
    city: "Santo André",
    state: "SP",
    totalOrders: 8,
    totalSpent: 16840.50,
    createdAt: "15/01/2026",
  },
  {
    id: "cli-3",
    name: "Mariana Alencar",
    companyName: "Mariana Alencar Moda MEI",
    tradeName: "Mari Fitness Online",
    email: "mariana.revenda@exemplo.com",
    phone: "(19) 99876-5432",
    document: "28.901.234/0001-99",
    accountType: "atacado",
    wholesaleStatus: "pending", // Aguardando aprovação pelo admin
    city: "Campinas",
    state: "SP",
    totalOrders: 1,
    totalSpent: 189.80,
    createdAt: "28/09/2026",
  },
  {
    id: "cli-4",
    name: "Rodrigo Vasconcelos",
    companyName: "Academia Iron Fit & Store",
    tradeName: "Iron Fit Store",
    email: "rodrigo@ironfit.com.br",
    phone: "(21) 98111-2233",
    document: "45.123.789/0001-55",
    accountType: "atacado",
    wholesaleStatus: "approved",
    city: "Rio de Janeiro",
    state: "RJ",
    totalOrders: 3,
    totalSpent: 9120.00,
    createdAt: "10/06/2026",
  },
  {
    id: "cli-5",
    name: "Juliana Barreto",
    email: "juliana.barreto@gmail.com",
    phone: "(31) 99222-3344",
    document: "458.129.832-11",
    accountType: "varejo",
    city: "Belo Horizonte",
    state: "MG",
    totalOrders: 2,
    totalSpent: 429.60,
    createdAt: "18/07/2026",
  },
];

const INITIAL_ADMIN_BANNERS: AdminBanner[] = [
  {
    id: "ban-1",
    type: "principal",
    tag: "COLEÇÃO 2026",
    title: "POTÊNCIA & ESTILO FIT",
    subtitle: "Moda fitness feminina de alta compressão e conforto inigualável.",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=85",
    ctaText: "VER COLEÇÃO",
    ctaLink: "/catalogo",
    badge: "Lançamento Exclusivo",
    isActive: true,
  },
  {
    id: "ban-2",
    type: "principal",
    tag: "ATACADO DIRETO DA FÁBRICA",
    title: "LUCRO DE ATÉ 120% NA REVENDA",
    subtitle: "Seja uma revendedora AM FIT. Pedido mínimo facilitado e envio imediato para todo o Brasil.",
    image: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=1200&q=85",
    ctaText: "QUERO REVENDER",
    ctaLink: "/#atacado",
    badge: "Preços Especiais de Atacado",
    isActive: true,
  },
  {
    id: "ban-3",
    type: "promocao",
    tag: "OFERTAS DA SEMANA",
    title: "PROMOÇÃO FLASH FIT",
    subtitle: "Descontos de até 40% nas peças queridinhas das academias. Aproveite enquanto durarem os estoques!",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=85",
    ctaText: "VER PROMOÇÕES",
    ctaLink: "/catalogo?categoria=promocoes",
    badge: "Por Tempo Limitado",
    isActive: true,
  },
];

const INITIAL_ADMIN_COUPONS: AdminCoupon[] = [
  {
    id: "cup-1",
    code: "BEMVINDO10",
    discountType: "percentage",
    discountValue: 10,
    minOrderValue: 150.00,
    minValue: 150.00,
    validUntil: "31/12/2026",
    maxUses: 500,
    usageLimit: 500,
    usedCount: 142,
    usageCount: 142,
    applicableTo: "varejo",
    isActive: true,
  },
  {
    id: "cup-2",
    code: "ATACADOFRETE",
    discountType: "fixed",
    discountValue: 100.00,
    minOrderValue: 1500.00,
    minValue: 1500.00,
    validUntil: "31/10/2026",
    maxUses: 100,
    usageLimit: 100,
    usedCount: 28,
    usageCount: 28,
    applicableTo: "atacado",
    isActive: true,
  },
  {
    id: "cup-3",
    code: "FITNESS15",
    discountType: "percentage",
    discountValue: 15,
    minOrderValue: 299.00,
    minValue: 299.00,
    validUntil: "15/11/2026",
    maxUses: 200,
    usageLimit: 200,
    usedCount: 89,
    usageCount: 89,
    applicableTo: "todos",
    isActive: true,
  },
  {
    id: "cup-4",
    code: "BLACKFIT",
    discountType: "percentage",
    discountValue: 20,
    minOrderValue: 500.00,
    minValue: 500.00,
    validUntil: "30/11/2026",
    maxUses: 1000,
    usageLimit: 1000,
    usedCount: 0,
    usageCount: 0,
    applicableTo: "todos",
    isActive: false,
  },
];

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_ADMIN_ORDERS);
  const [clients, setClients] = useState<AdminClient[]>(INITIAL_ADMIN_CLIENTS);
  const [banners, setBanners] = useState<AdminBanner[]>(INITIAL_ADMIN_BANNERS);
  const [coupons, setCoupons] = useState<AdminCoupon[]>(INITIAL_ADMIN_COUPONS);

  // Carregar do localStorage
  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem("am_fit_admin_auth");
      if (savedAuth) {
        setIsAdminAuthenticated(true);
        setAdminUser(JSON.parse(savedAuth));
      }

      const savedProducts = localStorage.getItem("am_fit_admin_products");
      if (savedProducts) setProducts(JSON.parse(savedProducts));

      const savedOrders = localStorage.getItem("am_fit_admin_orders");
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedClients = localStorage.getItem("am_fit_admin_clients");
      if (savedClients) setClients(JSON.parse(savedClients));

      const savedBanners = localStorage.getItem("am_fit_admin_banners");
      if (savedBanners) setBanners(JSON.parse(savedBanners));

      const savedCoupons = localStorage.getItem("am_fit_admin_coupons");
      if (savedCoupons) setCoupons(JSON.parse(savedCoupons));
    } catch {
      // ignore
    }
  }, []);

  // Salvar no localStorage
  useEffect(() => {
    try {
      localStorage.setItem("am_fit_admin_products", JSON.stringify(products));
    } catch {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem("am_fit_admin_orders", JSON.stringify(orders));
    } catch {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem("am_fit_admin_clients", JSON.stringify(clients));
    } catch {}
  }, [clients]);

  useEffect(() => {
    try {
      localStorage.setItem("am_fit_admin_banners", JSON.stringify(banners));
    } catch {}
  }, [banners]);

  useEffect(() => {
    try {
      localStorage.setItem("am_fit_admin_coupons", JSON.stringify(coupons));
    } catch {}
  }, [coupons]);

  // Auth Methods
  const adminLogin = async (email: string, password?: string): Promise<boolean> => {
    // Conta padrão do administrador
    const user: AdminUser = {
      id: "adm-master-1",
      name: "Lucas Pedro",
      email: email.trim().toLowerCase() || "admin@amfit.com.br",
      role: "proprietario",
    };
    setAdminUser(user);
    setIsAdminAuthenticated(true);
    localStorage.setItem("am_fit_admin_auth", JSON.stringify(user));
    return true;
  };

  const adminLogout = () => {
    setAdminUser(null);
    setIsAdminAuthenticated(false);
    localStorage.removeItem("am_fit_admin_auth");
  };

  // Produtos CRUD
  const addProduct = (productData: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Pedidos CRUD
  const updateOrderStatus = (orderId: string, status: AdminOrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
  };

  const updateOrderTracking = (orderId: string, trackingCode: string, trackingCompany: string) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? { ...ord, trackingCode, trackingCompany, status: "enviado" }
          : ord
      )
    );
  };

  const addOrder = (orderData: Omit<AdminOrder, "id">) => {
    const newOrd: AdminOrder = {
      ...orderData,
      id: `ord-${Date.now()}`,
    };
    setOrders((prev) => [newOrd, ...prev]);
  };

  // Clientes
  const updateClientWholesaleStatus = (clientId: string, status: "approved" | "pending" | "rejected") => {
    setClients((prev) =>
      prev.map((cli) =>
        cli.id === clientId ? { ...cli, wholesaleStatus: status } : cli
      )
    );
  };

  // Banners
  const addBanner = (bannerData: Omit<AdminBanner, "id">) => {
    const newBan: AdminBanner = {
      ...bannerData,
      id: `ban-${Date.now()}`,
    };
    setBanners((prev) => [newBan, ...prev]);
  };

  const updateBanner = (id: string, fields: Partial<AdminBanner>) => {
    setBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...fields } : b))
    );
  };

  const deleteBanner = (id: string) => {
    setBanners((prev) => prev.filter((b) => b.id !== id));
  };

  const toggleBannerStatus = (id: string) => {
    setBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isActive: !b.isActive } : b))
    );
  };

  // Cupons
  const addCoupon = (couponData: Omit<AdminCoupon, "id" | "usedCount">) => {
    const newC: AdminCoupon = {
      ...couponData,
      id: `cup-${Date.now()}`,
      usedCount: 0,
    };
    setCoupons((prev) => [newC, ...prev]);
  };

  const updateCoupon = (id: string, fields: Partial<AdminCoupon>) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...fields } : c))
    );
  };

  const deleteCoupon = (id: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
  };

  const toggleCouponStatus = (id: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  return (
    <AdminContext.Provider
      value={{
        isAdminAuthenticated,
        adminUser,
        adminLogin,
        adminLogout,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        orders,
        updateOrderStatus,
        updateOrderTracking,
        addOrder,
        clients,
        updateClientWholesaleStatus,
        updateClientStatus: (id: string, st: any) => {
          const mapped = st === "aprovado" ? "approved" : st === "rejeitado" ? "rejected" : "pending";
          updateClientWholesaleStatus(id, mapped as any);
        },
        banners,
        addBanner,
        updateBanner,
        deleteBanner,
        toggleBannerStatus,
        toggleBannerActive: (id: string) => toggleBannerStatus(id),
        coupons,
        addCoupon,
        updateCoupon,
        deleteCoupon,
        toggleCouponStatus,
        toggleCouponActive: (id: string) => toggleCouponStatus(id),
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within an AdminProvider");
  return context;
};
