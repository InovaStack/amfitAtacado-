"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  useAdmin,
  AdminProduct,
  AdminOrder,
  AdminClient,
  AdminBanner,
  AdminCoupon,
} from "@/context/AdminContext";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  Image as ImageIcon,
  Tag,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle2,
  Truck,
  AlertCircle,
  Plus,
  Edit2,
  Trash2,
  Search,
  Filter,
  LogOut,
  ExternalLink,
  Lock,
  Eye,
  X,
  Save,
  RotateCw,
  ArrowUpRight,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Award,
} from "lucide-react";

export default function AdminPage() {
  const {
    isAdminAuthenticated,
    adminLogin,
    adminLogout,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    updateOrderTracking,
    clients,
    updateClientStatus,
    banners,
    addBanner,
    updateBanner,
    deleteBanner,
    toggleBannerActive,
    coupons,
    addCoupon,
    updateCoupon,
    deleteCoupon,
    toggleCouponActive,
  } = useAdmin();

  // Navigation tab
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "produtos" | "pedidos" | "clientes" | "banners" | "cupons"
  >("dashboard");

  // Login Form State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Product Modals & Filters
  const [productSearch, setProductSearch] = useState("");
  const [productCategoryFilter, setProductCategoryFilter] = useState("all");
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [productForm, setProductForm] = useState({
    name: "",
    category: "Leggings",
    priceRetail: 0,
    priceWholesale: 0,
    minWholesaleQty: 6,
    stock: 50,
    images: "",
    sizes: "P, M, G, GG",
    colors: "Preto, Vinho, Azul Marinho",
    description: "",
    rating: 5.0,
    badge: "Lançamento",
  });

  // Order Details Modal
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [orderFilter, setOrderFilter] = useState<string>("all");
  const [orderSearch, setOrderSearch] = useState("");

  // Tracking Edit Form
  const [trackingForm, setTrackingForm] = useState({
    code: "",
    carrier: "Correios (Sedex)",
  });

  // Client Details & Filter
  const [clientTypeFilter, setClientTypeFilter] = useState<"all" | "varejo" | "atacado">("all");
  const [clientSearch, setClientSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState<AdminClient | null>(null);

  // Banner Modal
  const [bannerModalOpen, setBannerModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<AdminBanner | null>(null);
  const [bannerForm, setBannerForm] = useState({
    title: "",
    subtitle: "",
    ctaText: "Ver Coleção",
    ctaLink: "/categoria/lancamentos",
    category: "principal" as AdminBanner["category"],
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=80",
    active: true,
  });

  // Coupon Modal
  const [couponModalOpen, setCouponModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<AdminCoupon | null>(null);
  const [couponForm, setCouponForm] = useState({
    code: "",
    discountType: "percentage" as "percentage" | "fixed",
    discountValue: 10,
    validUntil: "2026-12-31",
    minValue: 100,
    usageLimit: 100,
    active: true,
  });

  // ==========================================
  // HANDLERS
  // ==========================================
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const success = adminLogin(loginEmail, loginPassword);
    if (!success) {
      setLoginError("E-mail ou senha incorretos. Use admin@amfit.com.br / admin123");
    }
  };

  const handleQuickLogin = () => {
    setLoginEmail("admin@amfit.com.br");
    setLoginPassword("admin123");
    adminLogin("admin@amfit.com.br", "admin123");
  };

  // Product Actions
  const openNewProductModal = () => {
    setEditingProduct(null);
    setProductForm({
      name: "",
      category: "Leggings",
      priceRetail: 129.9,
      priceWholesale: 64.9,
      minWholesaleQty: 6,
      stock: 50,
      images: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80",
      sizes: "P, M, G, GG",
      colors: "Preto, Vinho, Azul",
      description: "Tecido de alta compressão, zero transparência e costura reforçada.",
      rating: 5.0,
      badge: "Novo",
    });
    setProductModalOpen(true);
  };

  const openEditProductModal = (prod: AdminProduct) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name,
      category: prod.category,
      priceRetail: prod.priceRetail,
      priceWholesale: prod.priceWholesale,
      minWholesaleQty: prod.minWholesaleQty,
      stock: prod.stock,
      images: prod.images.join(", "),
      sizes: prod.sizes.join(", "),
      colors: prod.colors.join(", "),
      description: prod.description,
      rating: prod.rating,
      badge: prod.badge || "",
    });
    setProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const imgs = productForm.images
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const szs = productForm.sizes
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const cls = productForm.colors
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: productForm.name,
        category: productForm.category,
        priceRetail: Number(productForm.priceRetail),
        priceWholesale: Number(productForm.priceWholesale),
        minWholesaleQty: Number(productForm.minWholesaleQty),
        stock: Number(productForm.stock),
        images: imgs.length ? imgs : [editingProduct.images[0]],
        sizes: szs.length ? szs : ["P", "M", "G"],
        colors: cls.length ? cls : ["Preto"],
        description: productForm.description,
        badge: productForm.badge || undefined,
      });
    } else {
      addProduct({
        name: productForm.name,
        category: productForm.category,
        priceRetail: Number(productForm.priceRetail),
        priceWholesale: Number(productForm.priceWholesale),
        minWholesaleQty: Number(productForm.minWholesaleQty),
        stock: Number(productForm.stock),
        images: imgs.length
          ? imgs
          : ["https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80"],
        sizes: szs.length ? szs : ["P", "M", "G"],
        colors: cls.length ? cls : ["Preto"],
        description: productForm.description,
        rating: 5.0,
        badge: productForm.badge || "Novo",
      });
    }
    setProductModalOpen(false);
  };

  // Banner Actions
  const openNewBannerModal = () => {
    setEditingBanner(null);
    setBannerForm({
      title: "",
      subtitle: "",
      ctaText: "Ver Ofertas",
      ctaLink: "/categoria/promocoes",
      category: "principal",
      imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=80",
      active: true,
    });
    setBannerModalOpen(true);
  };

  const openEditBannerModal = (banner: AdminBanner) => {
    setEditingBanner(banner);
    setBannerForm({
      title: banner.title,
      subtitle: banner.subtitle || "",
      ctaText: banner.ctaText || "Aproveitar",
      ctaLink: banner.ctaLink,
      category: (banner.category || banner.type || "principal") as any,
      imageUrl: banner.imageUrl || banner.image || "",
      active: banner.active ?? banner.isActive ?? true,
    });
    setBannerModalOpen(true);
  };

  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBanner) {
      updateBanner(editingBanner.id, bannerForm);
    } else {
      addBanner(bannerForm);
    }
    setBannerModalOpen(false);
  };

  // Coupon Actions
  const openNewCouponModal = () => {
    setEditingCoupon(null);
    setCouponForm({
      code: "",
      discountType: "percentage",
      discountValue: 10,
      validUntil: "2026-12-31",
      minValue: 100,
      usageLimit: 100,
      active: true,
    });
    setCouponModalOpen(true);
  };

  const openEditCouponModal = (coupon: AdminCoupon) => {
    setEditingCoupon(coupon);
    setCouponForm({
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      validUntil: coupon.validUntil,
      minValue: coupon.minValue ?? coupon.minOrderValue ?? 0,
      usageLimit: coupon.usageLimit ?? coupon.maxUses ?? 100,
      active: coupon.active ?? coupon.isActive ?? true,
    });
    setCouponModalOpen(true);
  };

  const handleSaveCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCoupon) {
      updateCoupon(editingCoupon.id, {
        ...couponForm,
        code: couponForm.code.toUpperCase().trim(),
        discountValue: Number(couponForm.discountValue),
        minValue: Number(couponForm.minValue),
        usageLimit: Number(couponForm.usageLimit),
      });
    } else {
      addCoupon({
        ...couponForm,
        code: couponForm.code.toUpperCase().trim(),
        discountValue: Number(couponForm.discountValue),
        minValue: Number(couponForm.minValue),
        usageLimit: Number(couponForm.usageLimit),
        usageCount: 0,
      });
    }
    setCouponModalOpen(false);
  };

  // ==========================================
  // DASHBOARD CALCULATIONS
  // ==========================================
  const totalRevenue = orders.reduce((acc, curr) => acc + curr.total, 0);
  const pendingOrders = orders.filter((o) => o.status === "Novo" || o.status === "Em preparação");
  const wholesaleClientsCount = clients.filter((c) => c.type === "atacado").length;
  const retailClientsCount = clients.filter((c) => c.type === "varejo").length;
  const pendingWholesaleApprovals = clients.filter(
    (c) => c.type === "atacado" && c.wholesaleStatus === "pendente"
  ).length;

  // Best selling products mock logic from orders
  const topProducts = products.slice(0, 4);

  // ==========================================
  // IF NOT AUTHENTICATED -> SHOW ADMIN LOGIN
  // ==========================================
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
        {/* Background Accent Gradients */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-am-magenta/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl mb-4 text-am-magenta text-2xl">
              <Lock />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white uppercase font-[family-name:var(--font-heading)]">
              Painel Administrativo
            </h1>
            <p className="text-xs uppercase tracking-widest text-zinc-400 mt-1 font-semibold">
              AM FIT • Gestão da Fábrica & E-commerce
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 shadow-2xl">
            <div className="mb-6 pb-4 border-b border-zinc-800/80">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-am-magenta/10 text-am-magenta border border-am-magenta/20">
                <Lock className="text-xs" size={14} /> Acesso Restrito ao Proprietário
              </span>
              <p className="text-xs text-zinc-400 mt-2">
                Esta é uma conta administrativa separada dos clientes.
              </p>
            </div>

            {loginError && (
              <div className="mb-5 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400 flex items-center gap-2">
                <AlertCircle className="shrink-0 text-base" size={16} />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-1.5">
                  E-mail do Administrador
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="admin@amfit.com.br"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-am-magenta focus:ring-1 focus:ring-am-magenta transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-1.5">
                  Senha Master
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-am-magenta focus:ring-1 focus:ring-am-magenta transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-gradient-to-r from-am-magenta to-pink-600 hover:from-pink-600 hover:to-am-magenta text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-am-magenta/25 hover:shadow-am-magenta/40 transition-all duration-300 transform active:scale-95"
              >
                Acessar Painel Master
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-zinc-800/80">
              <div className="bg-zinc-950/60 p-3.5 rounded-xl border border-zinc-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-zinc-300">Acesso Rápido de Teste:</p>
                  <p className="text-[11px] text-zinc-500">admin@amfit.com.br / admin123</p>
                </div>
                <button
                  type="button"
                  onClick={handleQuickLogin}
                  className="px-3 py-1.5 text-xs font-bold uppercase bg-zinc-800 hover:bg-zinc-700 text-am-magenta rounded-lg border border-zinc-700 transition-colors"
                >
                  Entrar Direto
                </button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors"
              >
                ← Voltar para a Loja Virtual
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // AUTHENTICATED ADMIN PANEL LAYOUT
  // ==========================================
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col md:flex-row font-sans">
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-zinc-900/90 border-r border-zinc-800 flex flex-col shrink-0 select-none">
        {/* Brand Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-am-magenta to-pink-700 flex items-center justify-center font-black text-white text-base shadow-md">
              AM
            </div>
            <div>
              <div className="font-extrabold text-sm tracking-tight text-white leading-none">
                AM FIT
              </div>
              <div className="text-[10px] font-bold text-am-magenta tracking-widest uppercase mt-0.5">
                Painel Master
              </div>
            </div>
          </div>
          <Link
            href="/"
            target="_blank"
            title="Abrir Loja em nova aba"
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <ExternalLink className="text-sm" />
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1 flex-1">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "dashboard"
                ? "bg-am-magenta text-white shadow-lg shadow-am-magenta/25"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <LayoutDashboard className="text-lg" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab("produtos")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "produtos"
                ? "bg-am-magenta text-white shadow-lg shadow-am-magenta/25"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className="text-lg" />
              <span>Produtos</span>
            </div>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                activeTab === "produtos" ? "bg-white/20 text-white" : "bg-zinc-800 text-zinc-400"
              }`}
            >
              {products.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("pedidos")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "pedidos"
                ? "bg-am-magenta text-white shadow-lg shadow-am-magenta/25"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <div className="flex items-center gap-3">
              <Package className="text-lg" />
              <span>Pedidos</span>
            </div>
            {pendingOrders.length > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
                {pendingOrders.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("clientes")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "clientes"
                ? "bg-am-magenta text-white shadow-lg shadow-am-magenta/25"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <div className="flex items-center gap-3">
              <Users className="text-lg" />
              <span>Clientes</span>
            </div>
            {pendingWholesaleApprovals > 0 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500 text-white font-black animate-pulse">
                {pendingWholesaleApprovals} NOVO
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("banners")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "banners"
                ? "bg-am-magenta text-white shadow-lg shadow-am-magenta/25"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <div className="flex items-center gap-3">
              <ImageIcon className="text-lg" />
              <span>Banners</span>
            </div>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                activeTab === "banners" ? "bg-white/20 text-white" : "bg-zinc-800 text-zinc-400"
              }`}
            >
              {banners.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("cupons")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "cupons"
                ? "bg-am-magenta text-white shadow-lg shadow-am-magenta/25"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            <div className="flex items-center gap-3">
              <Tag className="text-lg" />
              <span>Cupons</span>
            </div>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                activeTab === "cupons" ? "bg-white/20 text-white" : "bg-zinc-800 text-zinc-400"
              }`}
            >
              {coupons.length}
            </span>
          </button>
        </nav>

        {/* User Status & Logout Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-am-magenta font-black text-xs">
                ADM
              </div>
              <div>
                <p className="text-xs font-bold text-white leading-none">Administrador</p>
                <p className="text-[10px] text-zinc-500 mt-0.5">Proprietário Geral</p>
              </div>
            </div>
            <button
              onClick={adminLogout}
              title="Sair do painel administrativo"
              className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <LogOut className="text-base" />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto max-h-screen p-4 sm:p-6 lg:p-8">
        {/* ========================================================= */}
        {/* TAB: DASHBOARD                                            */}
        {/* ========================================================= */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 max-w-7xl mx-auto">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-[family-name:var(--font-heading)]">
                  Visão Geral do Negócio
                </h1>
                <p className="text-xs text-zinc-400 mt-1">
                  Acompanhe em tempo real o faturamento, pedidos e clientes da fábrica AM FIT.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Loja Virtual Online
                </span>
                <Link
                  href="/"
                  target="_blank"
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border border-zinc-700"
                >
                  <ExternalLink /> Ver Loja
                </Link>
              </div>
            </div>

            {/* KPI Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Card 1: Faturamento Total */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 relative overflow-hidden shadow-sm hover:border-zinc-700 transition-all">
                <div className="flex items-center justify-between text-zinc-400 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider">Faturamento Total</span>
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-lg">
                    <DollarSign />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white">
                  {totalRevenue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                  <TrendingUp /> +18.4% este mês
                </div>
              </div>

              {/* Card 2: Vendas do Dia & Mês */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 relative overflow-hidden shadow-sm hover:border-zinc-700 transition-all">
                <div className="flex items-center justify-between text-zinc-400 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider">Vendas do Mês</span>
                  <div className="w-9 h-9 rounded-xl bg-am-magenta/10 text-am-magenta flex items-center justify-center text-lg">
                    <ShoppingBag />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white">{orders.length} pedidos</div>
                <div className="mt-2 text-xs text-zinc-400">
                  Hoje: <strong className="text-white">R$ 1.840,00</strong> (3 vendas)
                </div>
              </div>

              {/* Card 3: Pedidos Pendentes */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 relative overflow-hidden shadow-sm hover:border-zinc-700 transition-all">
                <div className="flex items-center justify-between text-zinc-400 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider">Pedidos a Despachar</span>
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-lg">
                    <Clock />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white">
                  {pendingOrders.length} aguardando
                </div>
                <div className="mt-2 text-xs text-amber-400 font-semibold">
                  Requer atenção para expedição
                </div>
              </div>

              {/* Card 4: Clientes */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 relative overflow-hidden shadow-sm hover:border-zinc-700 transition-all">
                <div className="flex items-center justify-between text-zinc-400 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider">Base de Clientes</span>
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center text-lg">
                    <Users />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white">{clients.length} cadastrados</div>
                <div className="mt-2 text-xs text-zinc-400 flex gap-2">
                  <span>
                    Atacado: <strong className="text-blue-400">{wholesaleClientsCount}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Varejo: <strong className="text-purple-400">{retailClientsCount}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Middle Section: Top Products & Recent Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Produtos Mais Vendidos */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                    <Award className="text-am-magenta" /> Produtos Mais Vendidos
                  </h3>
                  <button
                    onClick={() => setActiveTab("produtos")}
                    className="text-xs text-am-magenta hover:underline font-bold"
                  >
                    Ver catálogo
                  </button>
                </div>
                <div className="space-y-4">
                  {topProducts.map((prod, index) => (
                    <div
                      key={prod.id}
                      className="flex items-center gap-3.5 p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80"
                    >
                      <span className="text-xs font-black text-zinc-500 w-4 text-center">
                        #{index + 1}
                      </span>
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-12 h-12 rounded-lg object-cover bg-zinc-800 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white truncate">{prod.name}</p>
                        <p className="text-[11px] text-zinc-400">
                          {prod.category} • Estoque: {prod.stock}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs font-black text-white">
                          {prod.priceRetail.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </p>
                        <p className="text-[10px] text-emerald-400 font-bold">
                          Atacado: {prod.priceWholesale.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pedidos Recentes */}
              <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                    <Package className="text-am-magenta" /> Pedidos Recentes da Loja
                  </h3>
                  <button
                    onClick={() => setActiveTab("pedidos")}
                    className="text-xs text-am-magenta hover:underline font-bold"
                  >
                    Gerenciar todos ({orders.length})
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="text-zinc-500 border-b border-zinc-800 uppercase tracking-wider">
                        <th className="pb-3 font-semibold">Pedido</th>
                        <th className="pb-3 font-semibold">Cliente</th>
                        <th className="pb-3 font-semibold">Tipo</th>
                        <th className="pb-3 font-semibold">Status</th>
                        <th className="pb-3 font-semibold text-right">Valor</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60">
                      {orders.slice(0, 5).map((order) => (
                        <tr
                          key={order.id}
                          className="hover:bg-zinc-800/40 cursor-pointer transition-colors"
                          onClick={() => {
                            setSelectedOrder(order);
                            setTrackingForm({
                              code: order.trackingCode || "",
                              carrier: order.carrier || "Correios",
                            });
                          }}
                        >
                          <td className="py-3.5 font-mono font-bold text-white">{order.id}</td>
                          <td className="py-3.5">
                            <p className="font-semibold text-white">{order.clientName}</p>
                            <p className="text-[11px] text-zinc-500">{order.clientEmail}</p>
                          </td>
                          <td className="py-3.5">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                order.type === "atacado"
                                  ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                                  : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                              }`}
                            >
                              {order.type}
                            </span>
                          </td>
                          <td className="py-3.5">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                order.status === "Novo"
                                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                                  : order.status === "Pago"
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                                  : order.status === "Em preparação"
                                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                                  : order.status === "Enviado"
                                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                                  : order.status === "Entregue"
                                  ? "bg-green-500/10 text-green-400 border border-green-500/30"
                                  : "bg-red-500/10 text-red-400 border border-red-500/30"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3.5 text-right font-black text-white">
                            {order.total.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB: PRODUTOS                                             */}
        {/* ========================================================= */}
        {activeTab === "produtos" && (
          <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header with Search and Create Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-[family-name:var(--font-heading)]">
                  Catálogo de Produtos ({products.length})
                </h1>
                <p className="text-xs text-zinc-400 mt-1">
                  Cadastre novos modelos, ajuste preços de atacado/varejo, cores, tamanhos e estoque.
                </p>
              </div>
              <button
                onClick={openNewProductModal}
                className="px-5 py-2.5 bg-am-magenta hover:bg-pink-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-am-magenta/20 transition-all"
              >
                <Plus className="text-base" /> Cadastrar Novo Produto
              </button>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Buscar produto por nome..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-am-magenta"
                />
              </div>
              <select
                value={productCategoryFilter}
                onChange={(e) => setProductCategoryFilter(e.target.value)}
                className="px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-am-magenta"
              >
                <option value="all">Todas as Categorias</option>
                <option value="Leggings">Leggings</option>
                <option value="Tops">Tops</option>
                <option value="Conjuntos">Conjuntos</option>
                <option value="Shorts">Shorts</option>
                <option value="Macacões">Macacões</option>
                <option value="Linha Sem Costura">Linha Sem Costura</option>
              </select>
            </div>

            {/* Products Table */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-950/60 text-zinc-400 uppercase tracking-wider border-b border-zinc-800">
                    <tr>
                      <th className="py-3.5 px-4 font-semibold">Produto</th>
                      <th className="py-3.5 px-4 font-semibold">Categoria</th>
                      <th className="py-3.5 px-4 font-semibold">Preço Varejo</th>
                      <th className="py-3.5 px-4 font-semibold">Preço Atacado</th>
                      <th className="py-3.5 px-4 font-semibold">Mín. Atacado</th>
                      <th className="py-3.5 px-4 font-semibold">Estoque</th>
                      <th className="py-3.5 px-4 font-semibold text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {products
                      .filter((p) =>
                        p.name.toLowerCase().includes(productSearch.toLowerCase())
                      )
                      .filter((p) =>
                        productCategoryFilter === "all"
                          ? true
                          : p.category.toLowerCase() === productCategoryFilter.toLowerCase()
                      )
                      .map((prod) => (
                        <tr key={prod.id} className="hover:bg-zinc-800/30 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={prod.images[0]}
                                alt={prod.name}
                                className="w-12 h-12 rounded-lg object-cover bg-zinc-800 shrink-0"
                              />
                              <div>
                                <p className="font-bold text-white text-sm">{prod.name}</p>
                                <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-zinc-500">
                                  <span>Tam: {prod.sizes.join(", ")}</span>
                                  <span>•</span>
                                  <span>Cores: {prod.colors.length}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-300 font-medium">
                              {prod.category}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-bold text-white">
                            {prod.priceRetail.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </td>
                          <td className="py-3.5 px-4 font-extrabold text-emerald-400">
                            {prod.priceWholesale.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </td>
                          <td className="py-3.5 px-4 text-zinc-300 font-semibold">
                            {prod.minWholesaleQty} peças
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2 py-0.5 rounded-full font-bold text-[11px] ${
                                prod.stock > 20
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                  : prod.stock > 0
                                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                  : "bg-red-500/10 text-red-400 border border-red-500/20"
                              }`}
                            >
                              {prod.stock} un
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => openEditProductModal(prod)}
                                className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-lg transition-colors"
                                title="Editar Produto"
                              >
                                <Edit2 className="text-xs" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Deseja realmente excluir "${prod.name}"?`)) {
                                    deleteProduct(prod.id);
                                  }
                                }}
                                className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                                title="Excluir Produto"
                              >
                                <Trash2 className="text-xs" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB: PEDIDOS                                              */}
        {/* ========================================================= */}
        {activeTab === "pedidos" && (
          <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-[family-name:var(--font-heading)]">
                  Gestão de Pedidos ({orders.length})
                </h1>
                <p className="text-xs text-zinc-400 mt-1">
                  Altere status para Novo, Pago, Em preparação, Enviado, Entregue ou Cancelado.
                </p>
              </div>

              {/* Status Pills Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0">
                {["all", "Novo", "Pago", "Em preparação", "Enviado", "Entregue", "Cancelado"].map(
                  (st) => (
                    <button
                      key={st}
                      onClick={() => setOrderFilter(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                        orderFilter === st
                          ? "bg-am-magenta text-white shadow-md shadow-am-magenta/20"
                          : "bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800"
                      }`}
                    >
                      {st === "all" ? "Todos" : st}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-950/60 text-zinc-400 uppercase tracking-wider border-b border-zinc-800">
                    <tr>
                      <th className="py-3.5 px-4 font-semibold">Código</th>
                      <th className="py-3.5 px-4 font-semibold">Data</th>
                      <th className="py-3.5 px-4 font-semibold">Cliente</th>
                      <th className="py-3.5 px-4 font-semibold">Canal</th>
                      <th className="py-3.5 px-4 font-semibold">Status</th>
                      <th className="py-3.5 px-4 font-semibold">Rastreio</th>
                      <th className="py-3.5 px-4 font-semibold text-right">Total</th>
                      <th className="py-3.5 px-4 font-semibold text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {orders
                      .filter((o) => (orderFilter === "all" ? true : o.status === orderFilter))
                      .map((order) => (
                        <tr key={order.id} className="hover:bg-zinc-800/30 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-white">{order.id}</td>
                          <td className="py-3.5 px-4 text-zinc-400">{order.date}</td>
                          <td className="py-3.5 px-4">
                            <p className="font-bold text-white">{order.clientName}</p>
                            <p className="text-[11px] text-zinc-500">{order.clientEmail}</p>
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                order.type === "atacado"
                                  ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                                  : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                              }`}
                            >
                              {order.type}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <select
                              value={order.status}
                              onChange={(e) =>
                                updateOrderStatus(order.id, e.target.value as AdminOrder["status"])
                              }
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold border focus:outline-none bg-zinc-950 cursor-pointer ${
                                order.status === "Novo"
                                  ? "border-blue-500/40 text-blue-400"
                                  : order.status === "Pago"
                                  ? "border-emerald-500/40 text-emerald-400"
                                  : order.status === "Em preparação"
                                  ? "border-amber-500/40 text-amber-400"
                                  : order.status === "Enviado"
                                  ? "border-cyan-500/40 text-cyan-400"
                                  : order.status === "Entregue"
                                  ? "border-green-500/40 text-green-400"
                                  : "border-red-500/40 text-red-400"
                              }`}
                            >
                              <option value="Novo">Novo</option>
                              <option value="Pago">Pago</option>
                              <option value="Em preparação">Em preparação</option>
                              <option value="Enviado">Enviado</option>
                              <option value="Entregue">Entregue</option>
                              <option value="Cancelado">Cancelado</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4">
                            {order.trackingCode ? (
                              <span className="font-mono text-[11px] text-zinc-300 bg-zinc-800/80 px-2 py-1 rounded">
                                {order.trackingCode}
                              </span>
                            ) : (
                              <span className="text-[11px] text-zinc-500 italic">Sem código</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-right font-black text-white">
                            {order.total.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => {
                                setSelectedOrder(order);
                                setTrackingForm({
                                  code: order.trackingCode || "",
                                  carrier: order.carrier || "Correios (Sedex)",
                                });
                              }}
                              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-bold transition-colors"
                            >
                              Detalhes
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB: CLIENTES                                             */}
        {/* ========================================================= */}
        {activeTab === "clientes" && (
          <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-[family-name:var(--font-heading)]">
                  Clientes Varejo & Atacado ({clients.length})
                </h1>
                <p className="text-xs text-zinc-400 mt-1">
                  Gerencie contas, aprove cadastros de lojistas para liberar preços de atacado e consulte histórico.
                </p>
              </div>

              {/* Filter Type */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setClientTypeFilter("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    clientTypeFilter === "all"
                      ? "bg-am-magenta text-white"
                      : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
                  }`}
                >
                  Todos ({clients.length})
                </button>
                <button
                  onClick={() => setClientTypeFilter("varejo")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    clientTypeFilter === "varejo"
                      ? "bg-blue-600 text-white"
                      : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
                  }`}
                >
                  Varejo ({retailClientsCount})
                </button>
                <button
                  onClick={() => setClientTypeFilter("atacado")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    clientTypeFilter === "atacado"
                      ? "bg-purple-600 text-white"
                      : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
                  }`}
                >
                  Atacado ({wholesaleClientsCount})
                </button>
              </div>
            </div>

            {/* Clients Table */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-950/60 text-zinc-400 uppercase tracking-wider border-b border-zinc-800">
                    <tr>
                      <th className="py-3.5 px-4 font-semibold">Cliente</th>
                      <th className="py-3.5 px-4 font-semibold">Tipo</th>
                      <th className="py-3.5 px-4 font-semibold">Documento / Loja</th>
                      <th className="py-3.5 px-4 font-semibold">Contato</th>
                      <th className="py-3.5 px-4 font-semibold">Status Atacado</th>
                      <th className="py-3.5 px-4 font-semibold">Pedidos</th>
                      <th className="py-3.5 px-4 font-semibold text-right">Total Gasto</th>
                      <th className="py-3.5 px-4 font-semibold text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {clients
                      .filter((c) => (clientTypeFilter === "all" ? true : c.type === clientTypeFilter))
                      .map((client) => (
                        <tr key={client.id} className="hover:bg-zinc-800/30 transition-colors">
                          <td className="py-3.5 px-4">
                            <p className="font-bold text-white text-sm">{client.name}</p>
                            <p className="text-[11px] text-zinc-500">Cadastrado em {client.createdAt}</p>
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                client.type === "atacado"
                                  ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                                  : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                              }`}
                            >
                              {client.type}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <p className="font-mono text-zinc-300">
                              {client.cnpj || client.cpf || "Não informado"}
                            </p>
                            {client.companyName && (
                              <p className="text-[11px] text-zinc-400 font-semibold">
                                {client.companyName}
                              </p>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            <p className="text-zinc-300">{client.email}</p>
                            <p className="text-[11px] text-zinc-500">{client.phone}</p>
                          </td>
                          <td className="py-3.5 px-4">
                            {client.type === "atacado" ? (
                              <select
                                value={client.wholesaleStatus}
                                onChange={(e) =>
                                  updateClientStatus(
                                    client.id,
                                    e.target.value as "aprovado" | "pendente" | "rejeitado"
                                  )
                                }
                                className={`px-2.5 py-1 rounded-lg text-xs font-bold border focus:outline-none bg-zinc-950 cursor-pointer ${
                                  client.wholesaleStatus === "aprovado"
                                    ? "border-emerald-500/40 text-emerald-400"
                                    : client.wholesaleStatus === "pendente"
                                    ? "border-amber-500/40 text-amber-400 animate-pulse"
                                    : "border-red-500/40 text-red-400"
                                }`}
                              >
                                <option value="pendente">Pendente de Aprovação</option>
                                <option value="aprovado">Aprovado (Preço Atacado ON)</option>
                                <option value="rejeitado">Rejeitado</option>
                              </select>
                            ) : (
                              <span className="text-zinc-500 text-[11px]">Liberado Varejo</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-zinc-300">
                            {client.totalOrders} pedidos
                          </td>
                          <td className="py-3.5 px-4 text-right font-black text-white">
                            {client.totalSpent.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => setSelectedClient(client)}
                              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-bold transition-colors"
                            >
                              Ver Perfil
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB: BANNERS                                              */}
        {/* ========================================================= */}
        {activeTab === "banners" && (
          <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-[family-name:var(--font-heading)]">
                  Gerenciamento de Banners ({banners.length})
                </h1>
                <p className="text-xs text-zinc-400 mt-1">
                  Configure o Banner Principal da Home, Campanhas Sazonais, Promoções e Lançamentos.
                </p>
              </div>
              <button
                onClick={openNewBannerModal}
                className="px-5 py-2.5 bg-am-magenta hover:bg-pink-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-am-magenta/20 transition-all"
              >
                <Plus className="text-base" /> Adicionar Banner
              </button>
            </div>

            {/* Banners Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {banners.map((b) => (
                <div
                  key={b.id}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col shadow-sm group hover:border-zinc-700 transition-all"
                >
                  <div className="relative h-44 w-full bg-zinc-950 overflow-hidden">
                    <img
                      src={b.imageUrl}
                      alt={b.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/70 backdrop-blur-md text-white border border-white/10">
                        {b.category}
                      </span>
                      <button
                        onClick={() => toggleBannerActive(b.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          b.active
                            ? "bg-emerald-500 text-white"
                            : "bg-zinc-800 text-zinc-400 border border-zinc-700"
                        }`}
                      >
                        {b.active ? "Ativo" : "Inativo"}
                      </button>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-extrabold text-white text-base leading-tight mb-1">
                        {b.title}
                      </h3>
                      {b.subtitle && (
                        <p className="text-xs text-zinc-400 line-clamp-2">{b.subtitle}</p>
                      )}
                      <div className="mt-3 text-[11px] text-zinc-500 font-mono">
                        Link: {b.ctaLink}
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-zinc-800 flex items-center justify-between">
                      <button
                        onClick={() => openEditBannerModal(b)}
                        className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <Edit2 /> Editar
                      </button>
                      <button
                        onClick={() => {
                          if (confirm("Excluir este banner permanentemente?")) {
                            deleteBanner(b.id);
                          }
                        }}
                        className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="text-base" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB: CUPONS                                               */}
        {/* ========================================================= */}
        {activeTab === "cupons" && (
          <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-[family-name:var(--font-heading)]">
                  Cupons Promocionais ({coupons.length})
                </h1>
                <p className="text-xs text-zinc-400 mt-1">
                  Crie cupons com desconto percentual ou fixo, valor mínimo, limite de uso e validade.
                </p>
              </div>
              <button
                onClick={openNewCouponModal}
                className="px-5 py-2.5 bg-am-magenta hover:bg-pink-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-am-magenta/20 transition-all"
              >
                <Plus className="text-base" /> Criar Novo Cupom
              </button>
            </div>

            {/* Coupons Table */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-950/60 text-zinc-400 uppercase tracking-wider border-b border-zinc-800">
                    <tr>
                      <th className="py-3.5 px-4 font-semibold">Código</th>
                      <th className="py-3.5 px-4 font-semibold">Desconto</th>
                      <th className="py-3.5 px-4 font-semibold">Pedido Mínimo</th>
                      <th className="py-3.5 px-4 font-semibold">Validade</th>
                      <th className="py-3.5 px-4 font-semibold">Uso / Limite</th>
                      <th className="py-3.5 px-4 font-semibold">Status</th>
                      <th className="py-3.5 px-4 font-semibold text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {coupons.map((c) => (
                      <tr key={c.id} className="hover:bg-zinc-800/30 transition-colors">
                        <td className="py-3.5 px-4">
                          <span className="font-mono font-black text-white bg-zinc-950 px-2.5 py-1 rounded border border-zinc-700 tracking-wider">
                            {c.code}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-black text-emerald-400 text-sm">
                          {c.discountType === "percentage"
                            ? `${c.discountValue}% OFF`
                            : `R$ ${c.discountValue},00 OFF`}
                        </td>
                        <td className="py-3.5 px-4 text-zinc-300 font-semibold">
                          {c.minValue.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </td>
                        <td className="py-3.5 px-4 text-zinc-400">{c.validUntil}</td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white">
                              {c.usageCount} / {c.usageLimit}
                            </span>
                            <div className="w-16 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-am-magenta rounded-full"
                                style={{
                                  width: `${Math.min(
                                    100,
                                    (c.usageCount / c.usageLimit) * 100
                                  )}%`,
                                }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => toggleCouponActive(c.id)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              c.active
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : "bg-red-500/10 text-red-400 border border-red-500/20"
                            }`}
                          >
                            {c.active ? "Ativo" : "Inativo"}
                          </button>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEditCouponModal(c)}
                              className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-lg transition-colors"
                            >
                              <Edit2 className="text-xs" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Excluir o cupom ${c.code}?`)) {
                                  deleteCoupon(c.id);
                                }
                              }}
                              className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                            >
                              <Trash2 className="text-xs" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================= */}
      {/* MODAL: PRODUTO (NOVO / EDITAR)                             */}
      {/* ========================================================= */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-6">
              <h2 className="text-xl font-black text-white uppercase font-[family-name:var(--font-heading)]">
                {editingProduct ? "Editar Produto" : "Novo Produto"}
              </h2>
              <button
                onClick={() => setProductModalOpen(false)}
                className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <X className="text-lg" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                  Nome do Produto *
                </label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-am-magenta"
                  placeholder="Ex: Legging Empina Bumbum Alta Compressão"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                    Categoria *
                  </label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-am-magenta"
                  >
                    <option value="Leggings">Leggings</option>
                    <option value="Tops">Tops</option>
                    <option value="Conjuntos">Conjuntos</option>
                    <option value="Shorts">Shorts</option>
                    <option value="Macacões">Macacões</option>
                    <option value="Linha Sem Costura">Linha Sem Costura</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                    Tag / Destaque
                  </label>
                  <input
                    type="text"
                    value={productForm.badge}
                    onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-am-magenta"
                    placeholder="Ex: Mais Vendido, Lançamento"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                    Preço Varejo (R$) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={productForm.priceRetail}
                    onChange={(e) =>
                      setProductForm({ ...productForm, priceRetail: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-am-magenta font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                    Preço Atacado (R$) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={productForm.priceWholesale}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        priceWholesale: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-emerald-400 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                    Mínimo Atacado (peças)
                  </label>
                  <input
                    type="number"
                    value={productForm.minWholesaleQty}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        minWholesaleQty: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-am-magenta"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                    Estoque Geral
                  </label>
                  <input
                    type="number"
                    value={productForm.stock}
                    onChange={(e) =>
                      setProductForm({ ...productForm, stock: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-am-magenta"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                    Tamanhos (separar por vírgula)
                  </label>
                  <input
                    type="text"
                    value={productForm.sizes}
                    onChange={(e) => setProductForm({ ...productForm, sizes: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-am-magenta"
                    placeholder="P, M, G, GG"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                    Cores (separar por vírgula)
                  </label>
                  <input
                    type="text"
                    value={productForm.colors}
                    onChange={(e) => setProductForm({ ...productForm, colors: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-am-magenta"
                    placeholder="Preto, Vinho, Azul"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                  Fotos (URLs separadas por vírgula)
                </label>
                <input
                  type="text"
                  value={productForm.images}
                  onChange={(e) => setProductForm({ ...productForm, images: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-am-magenta font-mono text-[11px]"
                  placeholder="https://imagem1.jpg, https://imagem2.jpg"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                  Descrição Técnica do Produto
                </label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-am-magenta"
                  placeholder="Composição do tecido, elasticidade, compressão..."
                />
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-bold transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-am-magenta hover:bg-pink-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-am-magenta/25 transition-all"
                >
                  {editingProduct ? "Salvar Alterações" : "Criar Produto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: DETALHES DO PEDIDO & RASTREIO                      */}
      {/* ========================================================= */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-black text-white text-lg">{selectedOrder.id}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      selectedOrder.type === "atacado"
                        ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                        : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    }`}
                  >
                    {selectedOrder.type}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">Realizado em {selectedOrder.date}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <X className="text-lg" />
              </button>
            </div>

            {/* Client Info */}
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 mb-6">
              <h4 className="text-xs font-black uppercase text-zinc-400 tracking-wider mb-2">
                Dados do Comprador
              </h4>
              <p className="text-sm font-bold text-white">{selectedOrder.clientName}</p>
              <p className="text-xs text-zinc-400">{selectedOrder.clientEmail}</p>
              {selectedOrder.shippingAddress && (
                <p className="text-xs text-zinc-400 mt-2 flex items-center gap-1.5">
                  <MapPin className="text-am-magenta shrink-0" />
                  {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.number} -{" "}
                  {selectedOrder.shippingAddress.neighborhood},{" "}
                  {selectedOrder.shippingAddress.city} - {selectedOrder.shippingAddress.state} (
                  {selectedOrder.shippingAddress.cep})
                </p>
              )}
            </div>

            {/* Items List */}
            <div className="mb-6">
              <h4 className="text-xs font-black uppercase text-zinc-400 tracking-wider mb-3">
                Itens Comprados ({selectedOrder.items.length})
              </h4>
              <div className="space-y-2">
                {selectedOrder.items.map((it, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-xs"
                  >
                    <div>
                      <p className="font-bold text-white">{it.name}</p>
                      <p className="text-[11px] text-zinc-400">
                        {it.quantity}x • Tam: {it.size} • Cor: {it.color}
                      </p>
                    </div>
                    <div className="text-right font-black text-white">
                      {(it.price * it.quantity).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-right">
                <span className="text-xs text-zinc-400 uppercase tracking-wider mr-2">
                  Total do Pedido:
                </span>
                <span className="text-lg font-black text-am-magenta">
                  {selectedOrder.total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
            </div>

            {/* Tracking Update Section */}
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 mb-6">
              <h4 className="text-xs font-black uppercase text-zinc-400 tracking-wider mb-3 flex items-center gap-1.5">
                <Truck className="text-am-magenta" /> Atualizar Envio & Código de Rastreio
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                    Transportadora
                  </label>
                  <input
                    type="text"
                    value={trackingForm.carrier}
                    onChange={(e) =>
                      setTrackingForm({ ...trackingForm, carrier: e.target.value })
                    }
                    placeholder="Ex: Correios (Sedex), Jadlog"
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                    Código de Rastreio
                  </label>
                  <input
                    type="text"
                    value={trackingForm.code}
                    onChange={(e) =>
                      setTrackingForm({ ...trackingForm, code: e.target.value.toUpperCase() })
                    }
                    placeholder="Ex: AM928374821BR"
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white font-mono"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  updateOrderTracking(selectedOrder.id, trackingForm.code, trackingForm.carrier);
                  setSelectedOrder({
                    ...selectedOrder,
                    trackingCode: trackingForm.code,
                    carrier: trackingForm.carrier,
                    status: "Enviado",
                  });
                  alert("Código de rastreamento salvo e pedido marcado como Enviado!");
                }}
                className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Salvar Rastreio e Marcar como Enviado
              </button>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2.5 bg-am-magenta text-white font-bold text-xs uppercase rounded-xl"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: PERFIL DO CLIENTE                                  */}
      {/* ========================================================= */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-6">
              <div>
                <h3 className="text-lg font-black text-white">{selectedClient.name}</h3>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    selectedClient.type === "atacado"
                      ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                      : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  }`}
                >
                  Perfil {selectedClient.type}
                </span>
              </div>
              <button
                onClick={() => setSelectedClient(null)}
                className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <X className="text-lg" />
              </button>
            </div>

            <div className="space-y-3 text-xs mb-6">
              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                <span className="text-zinc-500 block mb-0.5">E-mail:</span>
                <span className="font-bold text-white">{selectedClient.email}</span>
              </div>
              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                <span className="text-zinc-500 block mb-0.5">WhatsApp / Telefone:</span>
                <span className="font-bold text-white">{selectedClient.phone}</span>
              </div>
              {selectedClient.companyName && (
                <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                  <span className="text-zinc-500 block mb-0.5">Razão Social / Nome Fantasia:</span>
                  <span className="font-bold text-white">{selectedClient.companyName}</span>
                </div>
              )}
              {(selectedClient.cnpj || selectedClient.cpf) && (
                <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                  <span className="text-zinc-500 block mb-0.5">Documento (CNPJ/CPF):</span>
                  <span className="font-bold font-mono text-white">
                    {selectedClient.cnpj || selectedClient.cpf}
                  </span>
                </div>
              )}
              {selectedClient.city && (
                <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                  <span className="text-zinc-500 block mb-0.5">Localidade:</span>
                  <span className="font-bold text-white">
                    {selectedClient.city} - {selectedClient.state}
                  </span>
                </div>
              )}
              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 flex justify-between">
                <div>
                  <span className="text-zinc-500 block mb-0.5">Total de Pedidos:</span>
                  <span className="font-bold text-white">{selectedClient.totalOrders} pedidos</span>
                </div>
                <div className="text-right">
                  <span className="text-zinc-500 block mb-0.5">Faturamento Total:</span>
                  <span className="font-black text-am-magenta">
                    {selectedClient.totalSpent.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
              </div>
            </div>

            {selectedClient.type === "atacado" && (
              <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl mb-6">
                <p className="text-xs font-bold text-purple-300 mb-2">
                  Aprovação de Conta Lojista:
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      updateClientStatus(selectedClient.id, "aprovado");
                      setSelectedClient({ ...selectedClient, wholesaleStatus: "aprovado" });
                    }}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg ${
                      selectedClient.wholesaleStatus === "aprovado"
                        ? "bg-emerald-500 text-white"
                        : "bg-zinc-800 hover:bg-emerald-600 text-zinc-300 hover:text-white"
                    }`}
                  >
                    ✓ Aprovar Atacado
                  </button>
                  <button
                    onClick={() => {
                      updateClientStatus(selectedClient.id, "rejeitado");
                      setSelectedClient({ ...selectedClient, wholesaleStatus: "rejeitado" });
                    }}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg ${
                      selectedClient.wholesaleStatus === "rejeitado"
                        ? "bg-red-500 text-white"
                        : "bg-zinc-800 hover:bg-red-600 text-zinc-300 hover:text-white"
                    }`}
                  >
                    ✕ Rejeitar
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={() => setSelectedClient(null)}
              className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: BANNER (NOVO / EDITAR)                             */}
      {/* ========================================================= */}
      {bannerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-6">
              <h2 className="text-xl font-black text-white uppercase font-[family-name:var(--font-heading)]">
                {editingBanner ? "Editar Banner" : "Novo Banner"}
              </h2>
              <button
                onClick={() => setBannerModalOpen(false)}
                className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <X className="text-lg" />
              </button>
            </div>

            <form onSubmit={handleSaveBanner} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                  Título Principal *
                </label>
                <input
                  type="text"
                  required
                  value={bannerForm.title}
                  onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-am-magenta"
                  placeholder="Ex: NOVA COLEÇÃO COMPRESSÃO PRO"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                  Subtítulo / Descrição
                </label>
                <input
                  type="text"
                  value={bannerForm.subtitle}
                  onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-am-magenta"
                  placeholder="Ex: Peças com acabamento premium e margens de até 120%"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                    Categoria do Banner
                  </label>
                  <select
                    value={bannerForm.category}
                    onChange={(e) =>
                      setBannerForm({
                        ...bannerForm,
                        category: e.target.value as AdminBanner["category"],
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-am-magenta"
                  >
                    <option value="principal">Banner Principal (Hero)</option>
                    <option value="campanha">Campanha Sazonal</option>
                    <option value="promocao">Promoção</option>
                    <option value="lancamento">Lançamento</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                    Texto do Botão
                  </label>
                  <input
                    type="text"
                    value={bannerForm.ctaText}
                    onChange={(e) => setBannerForm({ ...bannerForm, ctaText: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-am-magenta"
                    placeholder="Ex: Conferir Ofertas"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                  Link de Redirecionamento
                </label>
                <input
                  type="text"
                  value={bannerForm.ctaLink}
                  onChange={(e) => setBannerForm({ ...bannerForm, ctaLink: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-am-magenta font-mono"
                  placeholder="/categoria/lancamentos"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                  URL da Imagem de Fundo *
                </label>
                <input
                  type="text"
                  required
                  value={bannerForm.imageUrl}
                  onChange={(e) => setBannerForm({ ...bannerForm, imageUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-am-magenta font-mono text-[11px]"
                  placeholder="https://images.unsplash.com/photo-..."
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="bannerActive"
                  checked={bannerForm.active}
                  onChange={(e) => setBannerForm({ ...bannerForm, active: e.target.checked })}
                  className="rounded text-am-magenta focus:ring-am-magenta"
                />
                <label htmlFor="bannerActive" className="text-xs text-zinc-300 font-semibold cursor-pointer">
                  Banner ativo no site
                </label>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setBannerModalOpen(false)}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-am-magenta hover:bg-pink-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-am-magenta/25"
                >
                  Salvar Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: CUPOM (NOVO / EDITAR)                              */}
      {/* ========================================================= */}
      {couponModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-6">
              <h2 className="text-xl font-black text-white uppercase font-[family-name:var(--font-heading)]">
                {editingCoupon ? "Editar Cupom" : "Novo Cupom de Desconto"}
              </h2>
              <button
                onClick={() => setCouponModalOpen(false)}
                className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <X className="text-lg" />
              </button>
            </div>

            <form onSubmit={handleSaveCoupon} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                  Código do Cupom *
                </label>
                <input
                  type="text"
                  required
                  value={couponForm.code}
                  onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-am-magenta font-mono font-bold tracking-widest uppercase"
                  placeholder="Ex: PRIMEIRACOMPRA, ATACADO10"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                    Tipo de Desconto
                  </label>
                  <select
                    value={couponForm.discountType}
                    onChange={(e) =>
                      setCouponForm({
                        ...couponForm,
                        discountType: e.target.value as "percentage" | "fixed",
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-am-magenta"
                  >
                    <option value="percentage">Porcentagem (%)</option>
                    <option value="fixed">Valor Fixo (R$)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                    Valor do Desconto *
                  </label>
                  <input
                    type="number"
                    required
                    value={couponForm.discountValue}
                    onChange={(e) =>
                      setCouponForm({
                        ...couponForm,
                        discountValue: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-am-magenta font-mono"
                    placeholder="10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                    Valor Mínimo do Pedido (R$)
                  </label>
                  <input
                    type="number"
                    value={couponForm.minValue}
                    onChange={(e) =>
                      setCouponForm({
                        ...couponForm,
                        minValue: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-am-magenta font-mono"
                    placeholder="150"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                    Limite de Usos Totais
                  </label>
                  <input
                    type="number"
                    value={couponForm.usageLimit}
                    onChange={(e) =>
                      setCouponForm({
                        ...couponForm,
                        usageLimit: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-am-magenta font-mono"
                    placeholder="100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                  Validade até
                </label>
                <input
                  type="date"
                  value={couponForm.validUntil}
                  onChange={(e) => setCouponForm({ ...couponForm, validUntil: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-am-magenta"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="couponActive"
                  checked={couponForm.active}
                  onChange={(e) => setCouponForm({ ...couponForm, active: e.target.checked })}
                  className="rounded text-am-magenta focus:ring-am-magenta"
                />
                <label htmlFor="couponActive" className="text-xs text-zinc-300 font-semibold cursor-pointer">
                  Cupom ativo para uso no checkout
                </label>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setCouponModalOpen(false)}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-am-magenta hover:bg-pink-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-am-magenta/25"
                >
                  Salvar Cupom
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
