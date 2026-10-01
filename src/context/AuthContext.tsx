"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem } from "./CartContext";

export interface Address {
  id: string;
  label: string; // Ex: 'Residencial', 'Loja Matriz', 'Depósito'
  recipientName: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault?: boolean;
}

export interface OrderItem {
  productId: string;
  productName: string;
  sku: string;
  image: string;
  size: string;
  color: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export type OrderStatus = "realizado" | "confirmado" | "separacao" | "enviado" | "entregue" | "orcamento";

export interface Order {
  id: string;
  date: string;
  orderNumber: string;
  status: OrderStatus;
  statusLabel: string;
  mode: "varejo" | "atacado";
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: "pix" | "cartao" | "boleto" | "faturado_atacado";
  trackingCode?: string;
  trackingCompany?: string;
  address: Address;
  isQuote?: boolean;
  notes?: string;
}

export interface QuoteRequest {
  id: string;
  date: string;
  quoteNumber: string;
  status: "em_analise" | "respondido" | "aprovado";
  items: OrderItem[];
  totalEstimated: number;
  totalPieces: number;
  notes?: string;
  assignedSalesperson?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  accountType: "varejo" | "atacado";
  document: string; // CPF (varejo) ou CNPJ/CPF (atacado)
  companyName?: string; // Razão Social (atacado)
  tradeName?: string; // Nome Fantasia (atacado)
  stateRegistration?: string; // Inscrição Estadual (atacado)
  resaleType?: "loja_fisica" | "loja_online" | "sacoleira" | "iniciante";
  wholesaleStatus?: "approved" | "pending" | "rejected";
  wholesaleApprovedAt?: string;
  addresses: Address[];
  orders: Order[];
  quotes: QuoteRequest[];
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password?: string;
  accountType: "varejo" | "atacado";
  document: string; // CPF ou CNPJ
  companyName?: string;
  tradeName?: string;
  stateRegistration?: string;
  resaleType?: "loja_fisica" | "loja_online" | "sacoleira" | "iniciante";
  address?: Omit<Address, "id">;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isWholesaleApproved: boolean;
  isWholesalePending: boolean;
  accountType: "varejo" | "atacado" | null;
  requireWholesaleApproval: boolean;
  setRequireWholesaleApproval: (req: boolean) => void;
  login: (email: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  loginAsDemo: (demoType: "varejo" | "atacado_aprovado" | "atacado_pendente") => void;
  register: (data: RegisterData) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addAddress: (address: Omit<Address, "id">) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  addOrderFromCart: (
    items: CartItem[],
    mode: "varejo" | "atacado",
    shipping: number,
    paymentMethod: "pix" | "cartao" | "boleto" | "faturado_atacado",
    address: Address,
    notes?: string
  ) => Order;
  requestWholesaleQuote: (items: CartItem[], notes?: string) => QuoteRequest;
  approveCurrentWholesaleUser: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalTab: "login" | "register";
  setAuthModalTab: (tab: "login" | "register") => void;
  authInitialProfile: "varejo" | "atacado";
  setAuthInitialProfile: (p: "varejo" | "atacado") => void;
  openAuthModal: (profile?: "varejo" | "atacado", tab?: "login" | "register") => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Contas Demo pré-configuradas para avaliação e testes rápidos
const DEMO_VAREJO: User = {
  id: "usr-varejo-01",
  name: "Camila Oliveira",
  email: "camila@amfit.com.br",
  phone: "(11) 98765-4321",
  accountType: "varejo",
  document: "345.892.108-44",
  addresses: [
    {
      id: "addr-01",
      label: "Residencial Principal",
      recipientName: "Camila Oliveira",
      street: "Rua Oscar Freire",
      number: "1420",
      complement: "Apto 82B",
      neighborhood: "Cerqueira César",
      city: "São Paulo",
      state: "SP",
      zipCode: "01426-001",
      isDefault: true,
    },
    {
      id: "addr-02",
      label: "Trabalho / Academia",
      recipientName: "Camila Oliveira",
      street: "Av. Paulista",
      number: "1000",
      neighborhood: "Bela Vista",
      city: "São Paulo",
      state: "SP",
      zipCode: "01310-100",
      isDefault: false,
    },
  ],
  orders: [
    {
      id: "ord-84920",
      orderNumber: "AM-84920",
      date: "28/09/2026",
      status: "entregue",
      statusLabel: "Entregue ao Destinatário",
      mode: "varejo",
      items: [
        {
          productId: "prod-001",
          productName: "Legging Power Compressão Empina Bumbum",
          sku: "REF-AM8401",
          image: "https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?auto=format&fit=crop&w=600&q=80",
          size: "M",
          color: "Preto",
          quantity: 1,
          unitPrice: 119.9,
          totalPrice: 119.9,
        },
        {
          productId: "prod-002",
          productName: "Top Nadador Alta Sustentação Bojo Removível",
          sku: "REF-AM8402",
          image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
          size: "M",
          color: "Preto",
          quantity: 1,
          unitPrice: 69.9,
          totalPrice: 69.9,
        },
      ],
      subtotal: 189.8,
      shipping: 0,
      discount: 0,
      total: 189.8,
      paymentMethod: "pix",
      trackingCode: "BR849201934BR",
      trackingCompany: "Correios Sedex",
      address: {
        id: "addr-01",
        label: "Residencial Principal",
        recipientName: "Camila Oliveira",
        street: "Rua Oscar Freire",
        number: "1420",
        neighborhood: "Cerqueira César",
        city: "São Paulo",
        state: "SP",
        zipCode: "01426-001",
      },
    },
    {
      id: "ord-91042",
      orderNumber: "AM-91042",
      date: "30/09/2026",
      status: "enviado",
      statusLabel: "Em Trânsito com a Transportadora",
      mode: "varejo",
      items: [
        {
          productId: "prod-003",
          productName: "Conjunto Seamless Canelado Zero Costura",
          sku: "REF-AM8403",
          image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
          size: "P",
          color: "Cinza Mescla",
          quantity: 1,
          unitPrice: 169.9,
          totalPrice: 169.9,
        },
      ],
      subtotal: 169.9,
      shipping: 19.9,
      discount: 0,
      total: 189.8,
      paymentMethod: "cartao",
      trackingCode: "AM910425510BR",
      trackingCompany: "Jadlog Express",
      address: {
        id: "addr-01",
        label: "Residencial Principal",
        recipientName: "Camila Oliveira",
        street: "Rua Oscar Freire",
        number: "1420",
        neighborhood: "Cerqueira César",
        city: "São Paulo",
        state: "SP",
        zipCode: "01426-001",
      },
    },
  ],
  quotes: [],
};

const DEMO_ATACADO_APROVADO: User = {
  id: "usr-atacado-01",
  name: "Patrícia Mendes",
  email: "contato@fitstore.com.br",
  phone: "(11) 97654-3210",
  accountType: "atacado",
  document: "34.567.890/0001-12",
  companyName: "Fit Store Comércio de Roupas Esportivas Ltda",
  tradeName: "Fit Store Boutique & Moda Fitness",
  stateRegistration: "123.456.789.000",
  resaleType: "loja_fisica",
  wholesaleStatus: "approved",
  wholesaleApprovedAt: "15/01/2026",
  addresses: [
    {
      id: "addr-at-01",
      label: "Loja Física / Recebimento",
      recipientName: "Fit Store - Depto de Compras",
      street: "Rua das Figueiras",
      number: "850",
      neighborhood: "Jardim",
      city: "Santo André",
      state: "SP",
      zipCode: "09080-300",
      isDefault: true,
    },
  ],
  orders: [
    {
      id: "ord-at-40192",
      orderNumber: "ATAC-40192",
      date: "18/09/2026",
      status: "entregue",
      statusLabel: "Mercadoria Entregue na Loja",
      mode: "atacado",
      items: [
        {
          productId: "prod-001",
          productName: "Legging Power Compressão Empina Bumbum (Grade)",
          sku: "REF-AM8401",
          image: "https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?auto=format&fit=crop&w=600&q=80",
          size: "P, M, G",
          color: "Preto, Marinho",
          quantity: 24,
          unitPrice: 59.9,
          totalPrice: 1437.6,
        },
        {
          productId: "prod-002",
          productName: "Top Nadador Alta Sustentação (Grade)",
          sku: "REF-AM8402",
          image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
          size: "P, M, G",
          color: "Preto, Rosa Neon",
          quantity: 18,
          unitPrice: 34.9,
          totalPrice: 628.2,
        },
      ],
      subtotal: 2065.8,
      shipping: 0,
      discount: 100.0,
      total: 1965.8,
      paymentMethod: "faturado_atacado",
      trackingCode: "JAD40192BR",
      trackingCompany: "Braspress Logística",
      address: {
        id: "addr-at-01",
        label: "Loja Física / Recebimento",
        recipientName: "Fit Store - Depto de Compras",
        street: "Rua das Figueiras",
        number: "850",
        neighborhood: "Jardim",
        city: "Santo André",
        state: "SP",
        zipCode: "09080-300",
      },
      notes: "Grade de 42 peças para reposição de vitrine",
    },
    {
      id: "ord-at-51208",
      orderNumber: "ATAC-51208",
      date: "29/09/2026",
      status: "separacao",
      statusLabel: "Em Separação e Conferência na Fábrica",
      mode: "atacado",
      items: [
        {
          productId: "prod-003",
          productName: "Conjunto Seamless Canelado Zero Costura (Grade)",
          sku: "REF-AM8403",
          image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
          size: "P, M, G",
          color: "Cinza Mescla, Terracota",
          quantity: 30,
          unitPrice: 89.9,
          totalPrice: 2697.0,
        },
      ],
      subtotal: 2697.0,
      shipping: 0,
      discount: 134.85,
      total: 2562.15,
      paymentMethod: "pix",
      trackingCode: "AGUARDANDO-COLETA",
      trackingCompany: "DirectLog",
      address: {
        id: "addr-at-01",
        label: "Loja Física / Recebimento",
        recipientName: "Fit Store - Depto de Compras",
        street: "Rua das Figueiras",
        number: "850",
        neighborhood: "Jardim",
        city: "Santo André",
        state: "SP",
        zipCode: "09080-300",
      },
    },
  ],
  quotes: [
    {
      id: "qc-2026-08",
      quoteNumber: "ORC-AM-2026-08",
      date: "25/09/2026",
      status: "respondido",
      totalEstimated: 6480.0,
      totalPieces: 120,
      assignedSalesperson: "Renata (Gerente de Atacado)",
      notes: "Cotação para evento de inauguração da 2ª loja física. Margem aplicada de atacado com bonificação de frete.",
      items: [
        {
          productId: "prod-001",
          productName: "Legging Power Compressão Empina Bumbum",
          sku: "REF-AM8401",
          image: "https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?auto=format&fit=crop&w=600&q=80",
          size: "P (20), M (30), G (20)",
          color: "Preto, Marinho, Grafite",
          quantity: 70,
          unitPrice: 56.9,
          totalPrice: 3983.0,
        },
        {
          productId: "prod-002",
          productName: "Top Nadador Alta Sustentação",
          sku: "REF-AM8402",
          image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
          size: "P (15), M (20), G (15)",
          color: "Variadas",
          quantity: 50,
          unitPrice: 32.9,
          totalPrice: 1645.0,
        },
      ],
    },
  ],
};

const DEMO_ATACADO_PENDENTE: User = {
  id: "usr-atacado-02",
  name: "Mariana Alencar",
  email: "mariana.revenda@exemplo.com",
  phone: "(19) 99876-5432",
  accountType: "atacado",
  document: "28.901.234/0001-99",
  companyName: "Mariana Alencar Moda Fitness MEI",
  tradeName: "Mari Fitness Online",
  resaleType: "loja_online",
  wholesaleStatus: "pending",
  addresses: [
    {
      id: "addr-at-02",
      label: "Centro de Distribuição / Loja",
      recipientName: "Mariana Alencar",
      street: "Av. Brasil",
      number: "1500",
      neighborhood: "Cambuí",
      city: "Campinas",
      state: "SP",
      zipCode: "13024-001",
      isDefault: true,
    },
  ],
  orders: [],
  quotes: [],
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Opção: Se TRUE, os preços de atacado ficam ocultos até que o lojista faça login e seja aprovado
  const [requireWholesaleApproval, setRequireWholesaleApprovalState] = useState<boolean>(true);

  // Modal de autenticação
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">("login");
  const [authInitialProfile, setAuthInitialProfile] = useState<"varejo" | "atacado">("varejo");

  // Carregar do localStorage
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("am_fit_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      const savedApprovalSetting = localStorage.getItem("am_fit_require_approval");
      if (savedApprovalSetting !== null) {
        setRequireWholesaleApprovalState(savedApprovalSetting === "true");
      }
    } catch {
      // ignore
    }
  }, []);

  // Salvar alterações de usuário
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem("am_fit_user", JSON.stringify(user));
      } else {
        localStorage.removeItem("am_fit_user");
      }
    } catch {
      // ignore
    }
  }, [user]);

  const setRequireWholesaleApproval = (req: boolean) => {
    setRequireWholesaleApprovalState(req);
    try {
      localStorage.setItem("am_fit_require_approval", String(req));
    } catch {
      // ignore
    }
  };

  const loginAsDemo = (demoType: "varejo" | "atacado_aprovado" | "atacado_pendente") => {
    let chosenUser: User;
    if (demoType === "varejo") {
      chosenUser = DEMO_VAREJO;
    } else if (demoType === "atacado_aprovado") {
      chosenUser = DEMO_ATACADO_APROVADO;
    } else {
      chosenUser = DEMO_ATACADO_PENDENTE;
    }
    setUser(chosenUser);
    setIsAuthModalOpen(false);
  };

  const login = async (email: string, password?: string): Promise<{ success: boolean; message?: string }> => {
    // Simulação de login
    const cleanEmail = email.toLowerCase().trim();
    if (cleanEmail === DEMO_VAREJO.email.toLowerCase()) {
      setUser(DEMO_VAREJO);
      setIsAuthModalOpen(false);
      return { success: true };
    }
    if (cleanEmail === DEMO_ATACADO_APROVADO.email.toLowerCase()) {
      setUser(DEMO_ATACADO_APROVADO);
      setIsAuthModalOpen(false);
      return { success: true };
    }
    if (cleanEmail === DEMO_ATACADO_PENDENTE.email.toLowerCase()) {
      setUser(DEMO_ATACADO_PENDENTE);
      setIsAuthModalOpen(false);
      return { success: true };
    }

    // Login com qualquer email cadastrado
    const isAtacadoCandidate = cleanEmail.includes("atacado") || cleanEmail.includes("loja") || cleanEmail.includes("fit");
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: email.split("@")[0].replace(".", " ").toUpperCase(),
      email: cleanEmail,
      phone: "(11) 99999-9999",
      accountType: isAtacadoCandidate ? "atacado" : "varejo",
      document: isAtacadoCandidate ? "12.345.678/0001-90" : "123.456.789-00",
      companyName: isAtacadoCandidate ? "Empresa Moda Fitness Ltda" : undefined,
      tradeName: isAtacadoCandidate ? "Loja Parceira AM FIT" : undefined,
      wholesaleStatus: isAtacadoCandidate ? (requireWholesaleApproval ? "pending" : "approved") : undefined,
      addresses: [
        {
          id: `addr-${Date.now()}`,
          label: "Principal",
          recipientName: email.split("@")[0],
          street: "Rua do Comércio",
          number: "100",
          neighborhood: "Centro",
          city: "São Paulo",
          state: "SP",
          zipCode: "01001-000",
          isDefault: true,
        },
      ],
      orders: [],
      quotes: [],
    };

    setUser(newUser);
    setIsAuthModalOpen(false);
    return { success: true };
  };

  const register = async (data: RegisterData): Promise<{ success: boolean; message?: string }> => {
    const isAtacado = data.accountType === "atacado";
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: data.name,
      email: data.email.toLowerCase().trim(),
      phone: data.phone,
      accountType: data.accountType,
      document: data.document,
      companyName: data.companyName,
      tradeName: data.tradeName,
      stateRegistration: data.stateRegistration,
      resaleType: data.resaleType,
      // Se requireWholesaleApproval for false, já inicia aprovado
      wholesaleStatus: isAtacado ? (requireWholesaleApproval ? "pending" : "approved") : undefined,
      wholesaleApprovedAt: isAtacado && !requireWholesaleApproval ? new Date().toLocaleDateString("pt-BR") : undefined,
      addresses: data.address
        ? [{ ...data.address, id: `addr-${Date.now()}`, isDefault: true }]
        : [],
      orders: [],
      quotes: [],
    };

    setUser(newUser);
    setIsAuthModalOpen(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    setUser({ ...user, ...data });
  };

  const addAddress = (addressData: Omit<Address, "id">) => {
    if (!user) return;
    const isDef = Boolean(user.addresses.length === 0 || addressData.isDefault);
    const newAddress: Address = {
      ...addressData,
      id: `addr-${Date.now()}`,
      isDefault: isDef,
    };
    const updatedAddresses: Address[] = addressData.isDefault
      ? [...user.addresses.map((a) => ({ ...a, isDefault: false })), newAddress]
      : [...user.addresses, newAddress];
    setUser({ ...user, addresses: updatedAddresses });
  };

  const removeAddress = (id: string) => {
    if (!user) return;
    const remaining = user.addresses.filter((a) => a.id !== id);
    if (remaining.length > 0 && !remaining.some((a) => a.isDefault)) {
      remaining[0].isDefault = true;
    }
    setUser({ ...user, addresses: remaining });
  };

  const setDefaultAddress = (id: string) => {
    if (!user) return;
    const updated = user.addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    setUser({ ...user, addresses: updated });
  };

  const addOrderFromCart = (
    cartItems: CartItem[],
    mode: "varejo" | "atacado",
    shipping: number,
    paymentMethod: "pix" | "cartao" | "boleto" | "faturado_atacado",
    address: Address,
    notes?: string
  ): Order => {
    const orderItems: OrderItem[] = cartItems.map((item) => {
      const price = mode === "atacado" ? item.product.wholesalePrice : item.product.retailPrice;
      return {
        productId: item.product.id,
        productName: item.product.name,
        sku: item.product.sku,
        image: item.product.images[0] || "",
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        unitPrice: price,
        totalPrice: price * item.quantity,
      };
    });

    const subtotal = orderItems.reduce((acc, i) => acc + i.totalPrice, 0);
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `${mode === "atacado" ? "ATAC" : "AM"}-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString("pt-BR"),
      status: "realizado",
      statusLabel: "Pedido Recebido com Sucesso",
      mode,
      items: orderItems,
      subtotal,
      shipping,
      discount: 0,
      total: subtotal + shipping,
      paymentMethod,
      trackingCode: "GERANDO-RASTREIO",
      trackingCompany: mode === "atacado" ? "Braspress Cargas" : "Correios Sedex",
      address,
      notes,
    };

    if (user) {
      setUser({
        ...user,
        orders: [newOrder, ...user.orders],
      });
    }

    return newOrder;
  };

  const requestWholesaleQuote = (cartItems: CartItem[], notes?: string): QuoteRequest => {
    const orderItems: OrderItem[] = cartItems.map((item) => {
      const price = item.product.wholesalePrice;
      return {
        productId: item.product.id,
        productName: item.product.name,
        sku: item.product.sku,
        image: item.product.images[0] || "",
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        unitPrice: price,
        totalPrice: price * item.quantity,
      };
    });

    const totalEstimated = orderItems.reduce((acc, i) => acc + i.totalPrice, 0);
    const totalPieces = orderItems.reduce((acc, i) => acc + i.quantity, 0);

    const newQuote: QuoteRequest = {
      id: `quote-${Date.now()}`,
      quoteNumber: `ORC-AM-${new Date().getFullYear()}-${Math.floor(10 + Math.random() * 90)}`,
      date: new Date().toLocaleDateString("pt-BR"),
      status: "em_analise",
      items: orderItems,
      totalEstimated,
      totalPieces,
      notes,
      assignedSalesperson: "Equipe Comercial Fábrica AM FIT",
    };

    if (user) {
      setUser({
        ...user,
        quotes: [newQuote, ...(user.quotes || [])],
      });
    }

    return newQuote;
  };

  const approveCurrentWholesaleUser = () => {
    if (!user) return;
    setUser({
      ...user,
      accountType: "atacado",
      wholesaleStatus: "approved",
      wholesaleApprovedAt: new Date().toLocaleDateString("pt-BR"),
    });
  };

  const openAuthModal = (profile: "varejo" | "atacado" = "varejo", tab: "login" | "register" = "login") => {
    setAuthInitialProfile(profile);
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const isAuthenticated = Boolean(user);
  const isWholesaleApproved = Boolean(
    user && user.accountType === "atacado" && user.wholesaleStatus === "approved"
  );
  const isWholesalePending = Boolean(
    user && user.accountType === "atacado" && user.wholesaleStatus === "pending"
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isWholesaleApproved,
        isWholesalePending,
        accountType: user ? user.accountType : null,
        requireWholesaleApproval,
        setRequireWholesaleApproval,
        login,
        loginAsDemo,
        register,
        logout,
        updateProfile,
        addAddress,
        removeAddress,
        setDefaultAddress,
        addOrderFromCart,
        requestWholesaleQuote,
        approveCurrentWholesaleUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        authInitialProfile,
        setAuthInitialProfile,
        openAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
