"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  Building2, 
  UserCheck, 
  ChevronRight,
  ChevronDown,
  PhoneCall,
  Sparkles,
  User,
  LogOut,
  SlidersHorizontal,
  Package,
  ShieldCheck,
  Clock,
  ArrowRight,
  Flame,
  Grid
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useAdmin } from "@/context/AdminContext";
import { getWhatsAppLink } from "@/config/store";

interface NavbarProps {
  onSearch?: (query: string) => void;
}

const QUICK_SEARCH_TAGS = [
  { label: "🔥 Mais Vendidos", query: "destaque" },
  { label: "Leggings", query: "legging" },
  { label: "Conjuntos", query: "conjunto" },
  { label: "Tops", query: "top" },
  { label: "Shorts", query: "short" },
  { label: "Sem Costura", query: "sem costura" },
];

export const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const router = useRouter();
  const { mode, setMode, totalItems, setIsCartOpen, favorites } = useCart();
  const { user, isAuthenticated, logout, openAuthModal, isWholesaleApproved } = useAuth();
  const { storeConfig } = useAdmin();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleSearchSubmit = (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const query = customQuery !== undefined ? customQuery : searchQuery;
    const trimmed = query.trim();

    if (onSearch) {
      onSearch(trimmed);
      const element = document.getElementById("destaques");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`/catalogo?q=${encodeURIComponent(trimmed)}`);
    }
  };

  const handleQuickTagClick = (tagQuery: string) => {
    setSearchQuery(tagQuery);
    handleSearchSubmit(undefined, tagQuery);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    if (onSearch) {
      onSearch("");
    }
  };

  const handleSetMode = (targetMode: "varejo" | "atacado") => {
    setMode(targetMode);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200/90 shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition-all">
        
        {/* ========================================================= */}
        {/* TOP BANNER BAR                                            */}
        {/* ========================================================= */}
        <div className="bg-am-black text-white py-1.5 sm:py-2 px-3 sm:px-6 lg:px-8 border-b border-zinc-900/60 transition-colors">
          <div className="w-full max-w-[1720px] mx-auto flex items-center justify-between gap-2">
            
            {/* Mensagem Mobile (1 linha concisa e centrada) */}
            <div className="sm:hidden flex items-center justify-center w-full text-[11px] font-semibold text-zinc-200">
              <span className="flex items-center gap-1.5 truncate">
                <span className="text-amber-400">✨</span>
                <span className="font-bold text-white">Atacado Direto da Fábrica</span>
                <span className="text-zinc-500">•</span>
                <span className="text-pink-300">Lucro de 100%</span>
              </span>
            </div>

            {/* Mensagens Tablet / Desktop */}
            <div className="hidden sm:flex flex-wrap items-center justify-start gap-2.5 sm:gap-4 font-semibold text-zinc-300 text-xs">
              <span className="flex items-center gap-1.5 text-amber-300">
                <span>✨</span>
                <span>Lucre 100% com nossos produtos</span>
              </span>
              <span className="text-zinc-600">&bull;</span>
              <span className="flex items-center gap-1.5 text-zinc-200">
                <span>📦</span>
                <span>Atacado | Preço de fábrica</span>
              </span>
              <span className="text-zinc-600 hidden lg:inline">&bull;</span>
              <span className="hidden lg:flex items-center gap-1.5 text-purple-300">
                <span>💼</span>
                <span>Exclusivo para revendedores</span>
              </span>
              <span className="text-zinc-600 hidden xl:inline">&bull;</span>
              <span className="hidden xl:flex items-center gap-1.5 text-pink-400">
                <span>🚀</span>
                <span>Seu negócio começa aqui</span>
              </span>
            </div>

            {/* Ações rápidas desktop do Top Banner */}
            <div className="hidden sm:flex items-center gap-3 sm:gap-4 font-semibold tracking-wider text-[11px] shrink-0">
              {!isAuthenticated ? (
                <div className="hidden md:flex items-center gap-3 text-[11px] text-zinc-400">
                  <button
                    onClick={() => openAuthModal("varejo", "register")}
                    className="hover:text-white transition-colors"
                  >
                    Criar Conta Varejo
                  </button>
                  <span>&bull;</span>
                  <button
                    onClick={() => openAuthModal("atacado", "register")}
                    className="text-am-magenta hover:underline font-bold"
                  >
                    Cadastre-se como Lojista / Atacado
                  </button>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2 text-[11px] text-zinc-300">
                  <span className="text-zinc-400">Logado como:</span>
                  <span className="text-white font-bold">{user?.name}</span>
                  <span className={`px-1.5 py-0.2 rounded text-[9px] font-black uppercase ${
                    user?.accountType === "atacado" ? "bg-am-magenta text-white" : "bg-zinc-800 text-zinc-300 border border-zinc-700"
                  }`}>
                    {user?.accountType}
                  </span>
                </div>
              )}

              {storeConfig.channelsStatus?.whatsappActive !== false ? (
                <a 
                  href={getWhatsAppLink("Olá, gostaria de tirar dúvidas sobre os produtos da AM FIT", storeConfig.contact.whatsappNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors group"
                >
                  <PhoneCall size={12} className="text-am-magenta group-hover:scale-110 transition-transform" />
                  <span>Televendas WhatsApp</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">ONLINE</span>
                </a>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-zinc-500 opacity-40 grayscale cursor-not-allowed line-through">
                  <PhoneCall size={12} />
                  <span>WhatsApp (Pausado)</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* MAIN NAVBAR CONTAINER                                     */}
        {/* ========================================================= */}
        <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10">
          
          {/* LINHA 1: LOGO & CONTROLES */}
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20 gap-2 sm:gap-4">
            
            {/* Lado Esquerdo: Hambúrguer Mobile + Logo */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-zinc-800 hover:bg-zinc-100 active:scale-95 transition-all border border-zinc-200/80"
                aria-label="Abrir Menu de Navegação"
              >
                <Menu size={20} />
              </button>

              <Link href="/" className="flex items-center group shrink-0">
                <div className="relative w-28 h-9 sm:w-36 sm:h-11 lg:w-44 lg:h-14 bg-black rounded-xl p-1 sm:p-1.5 shadow-xs overflow-hidden flex items-center justify-center border border-zinc-800 transition-all duration-300 group-hover:border-am-magenta/50">
                  <Image
                    src="/logo.jpg"
                    alt="AM FIT Atacado e Varejo"
                    fill
                    sizes="(max-width: 640px) 112px, (max-width: 1024px) 144px, 176px"
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center justify-center gap-2 xl:gap-3 flex-1 max-w-3xl mx-auto text-xs xl:text-sm font-semibold tracking-wide text-zinc-700">
              <Link 
                href="/" 
                className="px-3.5 py-1.5 rounded-lg hover:text-am-magenta hover:bg-zinc-100 transition-all"
              >
                Início
              </Link>
              <Link 
                href="/catalogo" 
                className="px-3.5 py-1.5 rounded-lg text-zinc-950 hover:text-am-magenta hover:bg-zinc-100 font-bold transition-all"
              >
                Catálogo Completo
              </Link>
              <Link 
                href="/lista-atacado" 
                className="px-3.5 py-1.5 rounded-lg text-am-magenta hover:bg-pink-50 font-bold transition-all flex items-center gap-1.5 border border-am-magenta/30 shadow-2xs"
              >
                <Sparkles size={13} />
                <span>Grade Atacado</span>
                <span className="text-[9px] font-black uppercase px-1.5 py-0.2 bg-am-magenta text-white rounded">B2B</span>
              </Link>
              <Link 
                href="/#contato" 
                className="px-3.5 py-1.5 rounded-lg hover:text-am-magenta hover:bg-zinc-100 transition-all"
              >
                Dúvidas & Contato
              </Link>
              <Link 
                href="/conta" 
                className="px-3.5 py-1.5 rounded-lg hover:text-am-magenta hover:bg-zinc-100 transition-all text-zinc-600"
              >
                Minha Conta
              </Link>
            </nav>

            {/* Lado Direito: Alternador Varejo/Atacado & Ações */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 lg:gap-3 shrink-0">
              
              {/* Seletor Varejo / Atacado */}
              <div className="bg-zinc-100 p-0.5 sm:p-1 rounded-full border border-zinc-200 flex items-center shadow-inner">
                <button
                  type="button"
                  onClick={() => handleSetMode("varejo")}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1 sm:gap-1.5 ${
                    mode === "varejo"
                      ? "bg-white text-zinc-950 shadow-xs"
                      : "text-zinc-500 hover:text-zinc-900"
                  }`}
                  title="Modo Varejo: sem valor mínimo"
                >
                  <UserCheck size={12} className={mode === "varejo" ? "text-am-magenta" : ""} />
                  <span className="text-[11px] sm:text-xs">Varejo</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSetMode("atacado")}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1 sm:gap-1.5 ${
                    mode === "atacado"
                      ? "bg-am-magenta text-white shadow-magenta-sm"
                      : "text-zinc-500 hover:text-am-magenta"
                  }`}
                  title="Modo Atacado: preço direto de fábrica"
                >
                  <Building2 size={12} />
                  <span className="text-[11px] sm:text-xs">Atacado</span>
                </button>
              </div>

              {/* Botão de Busca Desktop */}
              <button
                onClick={() => setDesktopSearchOpen(!desktopSearchOpen)}
                className={`hidden lg:flex w-10 h-10 rounded-full items-center justify-center transition-all ${
                  desktopSearchOpen
                    ? "bg-am-magenta text-white"
                    : "text-zinc-700 hover:text-am-magenta hover:bg-zinc-100"
                }`}
                aria-label="Buscar produtos no desktop"
              >
                <Search size={18} />
              </button>

              {/* Favoritos Desktop */}
              <a
                href="#destaques"
                className="w-10 h-10 rounded-full items-center justify-center text-zinc-700 hover:text-am-magenta hover:bg-zinc-100 transition-colors relative hidden xl:flex"
                aria-label="Favoritos"
              >
                <Heart size={18} />
                {favorites.length > 0 && (
                  <span className="absolute top-1 right-1 bg-am-magenta text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold ring-2 ring-white">
                    {favorites.length}
                  </span>
                )}
              </a>

              {/* Dropdown de Usuário Desktop */}
              <div className="relative hidden md:block" ref={dropdownRef}>
                {!isAuthenticated ? (
                  <button
                    type="button"
                    onClick={() => openAuthModal("varejo", "login")}
                    className="h-9 sm:h-10 px-3 sm:px-3.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 transition-all rounded-full flex items-center gap-1.5 sm:gap-2 text-xs font-bold border border-zinc-200/80 group"
                    aria-label="Entrar ou Cadastrar"
                  >
                    <User size={15} className="text-zinc-600 group-hover:text-am-magenta transition-colors" />
                    <span>Entrar</span>
                  </button>
                ) : (
                  <div>
                    <button
                      type="button"
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="h-9 sm:h-10 px-2.5 sm:px-3 bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-am-magenta text-zinc-900 transition-all rounded-full flex items-center gap-2 text-xs font-bold shadow-2xs"
                      aria-label="Menu do Usuário"
                    >
                      <div className="w-6 h-6 rounded-full bg-am-magenta text-white flex items-center justify-center text-[10px] font-black uppercase shrink-0">
                        {user?.name?.charAt(0) || "U"}
                      </div>
                      <div className="text-left hidden lg:block">
                        <div className="leading-tight text-[11px] text-zinc-900 font-bold truncate max-w-[90px]">
                          {user?.name?.split(" ")[0]}
                        </div>
                        <div className="text-[9px] uppercase font-black tracking-wider text-am-magenta">
                          {user?.accountType === "atacado" ? "Atacado" : "Varejo"}
                        </div>
                      </div>
                      <ChevronDown size={14} className="text-zinc-400" />
                    </button>

                    {userDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-zinc-200 py-2 z-50 animate-fadeIn">
                        <div className="px-4 py-3 border-b border-zinc-100">
                          <p className="text-xs font-black text-zinc-900 truncate">{user?.name}</p>
                          <p className="text-[11px] text-zinc-500 truncate">{user?.email}</p>
                          <div className="mt-1.5 flex items-center gap-1.5">
                            <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                              user?.accountType === "atacado" 
                                ? "bg-purple-100 text-purple-700" 
                                : "bg-pink-100 text-pink-700"
                            }`}>
                              Cliente {user?.accountType}
                            </span>
                            {user?.accountType === "atacado" && (
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                                isWholesaleApproved
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-amber-100 text-amber-700"
                              }`}>
                                {isWholesaleApproved ? <ShieldCheck size={11} /> : <Clock size={11} />}
                                <span>{isWholesaleApproved ? "Liberado" : "Em análise"}</span>
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="p-1 space-y-0.5">
                          <Link
                            href="/conta"
                            onClick={() => setUserDropdownOpen(false)}
                            className="w-full px-3 py-2 text-xs font-semibold text-zinc-700 hover:text-am-magenta hover:bg-zinc-50 rounded-xl flex items-center gap-2 transition-colors"
                          >
                            <User size={15} className="text-zinc-400" />
                            <span>Meu Perfil & Endereços</span>
                          </Link>
                          <Link
                            href="/conta"
                            onClick={() => setUserDropdownOpen(false)}
                            className="w-full px-3 py-2 text-xs font-semibold text-zinc-700 hover:text-am-magenta hover:bg-zinc-50 rounded-xl flex items-center gap-2 transition-colors"
                          >
                            <Package size={15} className="text-zinc-400" />
                            <span>Meus Pedidos & Rastreamento</span>
                          </Link>
                          {user?.accountType === "atacado" && (
                            <Link
                              href="/lista-atacado"
                              onClick={() => setUserDropdownOpen(false)}
                              className="w-full px-3 py-2 text-xs font-semibold text-am-magenta hover:bg-pink-50 rounded-xl flex items-center gap-2 transition-colors"
                            >
                              <Sparkles size={15} />
                              <span>Grade Rápida de Atacado</span>
                            </Link>
                          )}
                        </div>

                        <div className="p-1 pt-1 border-t border-zinc-100 space-y-0.5">
                          <button
                            type="button"
                            onClick={() => {
                              handleSetMode(mode === "atacado" ? "varejo" : "atacado");
                              setUserDropdownOpen(false);
                            }}
                            className="w-full px-3 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-50 rounded-xl flex items-center justify-between text-left transition-colors"
                          >
                            <span className="flex items-center gap-2">
                              <SlidersHorizontal size={14} className="text-zinc-400" />
                              <span>Ver modo {mode === "atacado" ? "Varejo" : "Atacado"}</span>
                            </span>
                            <span className="text-[10px] text-zinc-400 font-bold uppercase">{mode}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              logout();
                              setUserDropdownOpen(false);
                            }}
                            className="w-full px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl flex items-center gap-2 text-left transition-colors"
                          >
                            <LogOut size={15} />
                            <span>Sair da Conta</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Botão de Sacola / Carrinho */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="h-9 sm:h-10 px-2.5 sm:px-3.5 bg-zinc-950 hover:bg-am-magenta text-white transition-all rounded-full flex items-center gap-1.5 sm:gap-2 shadow-xs group shrink-0"
                aria-label="Carrinho de Compras"
              >
                <ShoppingBag size={17} className="group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold bg-am-magenta group-hover:bg-zinc-950 text-white px-1.5 sm:px-2 py-0.5 rounded-full min-w-5 text-center transition-colors">
                  {totalItems}
                </span>
              </button>
            </div>
          </div>

          {/* ========================================================= */}
          {/* LINHA 2 (MOBILE ONLY): BARRA DE PESQUISA MODERNA E CHIPS  */}
          {/* ========================================================= */}
          <div className="lg:hidden pb-2.5 pt-1">
            <form 
              onSubmit={handleSearchSubmit} 
              className="relative flex items-center w-full"
            >
              <div className="relative flex-1 flex items-center">
                <Search size={16} className="absolute left-3.5 text-zinc-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar leggings, tops, conjuntos..."
                  className="w-full h-10 pl-9 pr-9 text-xs sm:text-sm bg-zinc-100 hover:bg-zinc-50 focus:bg-white text-zinc-900 placeholder:text-zinc-400 rounded-full border border-zinc-200/90 focus:border-am-magenta focus:ring-2 focus:ring-am-magenta/20 focus:outline-hidden transition-all shadow-inner"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-2.5 p-1 text-zinc-400 hover:text-zinc-600 rounded-full"
                    aria-label="Limpar busca"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <button
                type="submit"
                className="ml-2 h-10 px-3.5 bg-am-magenta hover:bg-pink-600 text-white rounded-full text-xs font-bold flex items-center gap-1 shrink-0 shadow-magenta-sm active:scale-95 transition-all"
                aria-label="Executar Busca"
              >
                <span>Buscar</span>
                <ArrowRight size={13} className="hidden sm:inline" />
              </button>
            </form>

            {/* Chips Rápidos de Busca no Mobile */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2 pb-0.5 -mx-1 px-1">
              {QUICK_SEARCH_TAGS.map((tag) => (
                <button
                  key={tag.label}
                  type="button"
                  onClick={() => handleQuickTagClick(tag.query)}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap shrink-0 transition-all border ${
                    searchQuery.toLowerCase() === tag.query.toLowerCase()
                      ? "bg-zinc-900 text-white border-zinc-900"
                      : "bg-zinc-100/90 hover:bg-zinc-200/80 text-zinc-600 border-zinc-200/60"
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Search Dropdown (quando ativado no botão da lupa) */}
          {desktopSearchOpen && (
            <div className="hidden lg:block py-3 border-t border-zinc-100 animate-fadeIn">
              <div className="max-w-2xl mx-auto">
                <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                  <Search size={18} className="absolute left-4 text-zinc-400 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Busque por leggings, tops, conjuntos, sem costura..."
                    className="w-full py-2.5 pl-11 pr-24 text-sm bg-zinc-50 border border-zinc-300 rounded-full focus:outline-hidden focus:border-am-magenta focus:ring-2 focus:ring-am-magenta/20 transition-all text-zinc-900 shadow-inner"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="absolute right-24 text-zinc-400 hover:text-zinc-600 p-1"
                    >
                      <X size={16} />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="absolute right-2 px-4 py-1.5 bg-am-magenta text-white text-xs font-bold rounded-full hover:bg-pink-600 transition-colors"
                  >
                    Buscar
                  </button>
                </form>
              </div>
            </div>
          )}

        </div>
      </header>

      {/* ========================================================= */}
      {/* MOBILE DRAWER / MENU LATERAL COMPLETO E RESPONSIVO        */}
      {/* ========================================================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          
          {/* Backdrop Escurecido */}
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn"
            aria-hidden="true"
          />

          {/* Drawer Lateral */}
          <div className="relative w-[86%] max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
            
            {/* Cabeçalho do Drawer */}
            <div className="p-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
              <div className="relative w-28 h-8 bg-black rounded-lg p-1 flex items-center justify-center border border-zinc-800">
                <Image
                  src="/logo.jpg"
                  alt="AM FIT"
                  fill
                  sizes="112px"
                  className="object-contain"
                />
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200 transition-colors"
                aria-label="Fechar menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Conteúdo do Drawer */}
            <div className="p-4 space-y-4 flex-1">
              
              {/* Card do Usuário / Login */}
              {!isAuthenticated ? (
                <div className="p-4 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 text-white space-y-3 shadow-sm border border-zinc-800">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-am-magenta tracking-wider">Área do Cliente</span>
                    <span className="text-[10px] font-bold bg-white/10 px-2 py-0.5 rounded-full text-zinc-300">AM FIT</span>
                  </div>
                  <h4 className="text-sm font-black leading-tight">Entre ou cadastre sua loja</h4>
                  <p className="text-xs text-zinc-300">
                    Acesse preços de atacado direto da fábrica ou compre no varejo.
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        openAuthModal("varejo", "login");
                      }}
                      className="py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold rounded-xl transition-all border border-zinc-700/60"
                    >
                      Entrar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        openAuthModal("atacado", "register");
                      }}
                      className="py-2.5 bg-am-magenta hover:bg-pink-600 text-white text-xs font-black rounded-xl transition-all shadow-magenta-sm"
                    >
                      Cadastrar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/90 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-am-magenta text-white flex items-center justify-center text-xs font-black uppercase shadow-xs">
                        {user?.name?.charAt(0) || "U"}
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-zinc-900 leading-tight">{user?.name}</h4>
                        <p className="text-[11px] text-zinc-500 truncate max-w-[150px]">{user?.email}</p>
                      </div>
                    </div>
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                      user?.accountType === "atacado" ? "bg-am-magenta text-white" : "bg-zinc-200 text-zinc-800"
                    }`}>
                      {user?.accountType}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-zinc-200/80">
                    <Link
                      href="/conta"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex-1 py-2 text-center text-xs font-bold bg-zinc-900 text-white rounded-xl hover:bg-black transition-all"
                    >
                      Minha Conta & Pedidos
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="px-3 py-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
                    >
                      Sair
                    </button>
                  </div>
                </div>
              )}

              {/* Seletor de Tabela de Preço no Drawer */}
              <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/90 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-800">Tabela Ativa:</span>
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                    mode === "atacado" ? "bg-am-magenta text-white" : "bg-zinc-200 text-zinc-800"
                  }`}>
                    {mode === "atacado" ? "Atacado (Fábrica)" : "Varejo"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 p-1 bg-zinc-200/60 rounded-xl">
                  <button
                    type="button"
                    onClick={() => {
                      handleSetMode("varejo");
                    }}
                    className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      mode === "varejo"
                        ? "bg-white text-zinc-900 shadow-xs"
                        : "text-zinc-600 hover:text-zinc-900"
                    }`}
                  >
                    <UserCheck size={13} className={mode === "varejo" ? "text-am-magenta" : ""} />
                    <span>Varejo</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleSetMode("atacado");
                    }}
                    className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      mode === "atacado"
                        ? "bg-am-magenta text-white shadow-magenta-sm"
                        : "text-zinc-600 hover:text-am-magenta"
                    }`}
                  >
                    <Building2 size={13} />
                    <span>Atacado</span>
                  </button>
                </div>
                <p className="text-[10px] text-zinc-500 text-center">
                  {mode === "atacado" 
                    ? "✨ Preço direto de fábrica exclusivo para revenda" 
                    : "Compre peças avulsas sem pedido mínimo"}
                </p>
              </div>

              {/* Links Principais */}
              <div className="space-y-1 pt-1">
                <div className="text-[10px] font-black uppercase text-zinc-400 tracking-wider px-2 pb-1">
                  Navegação
                </div>

                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl font-bold text-xs text-zinc-800 hover:bg-zinc-100 flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <Flame size={16} className="text-amber-500" />
                    <span>Início & Destaques</span>
                  </span>
                  <ChevronRight size={15} className="text-zinc-400" />
                </Link>

                <Link
                  href="/catalogo"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl font-bold text-xs text-zinc-900 hover:bg-zinc-100 flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <Grid size={16} className="text-am-magenta" />
                    <span>Catálogo Completo</span>
                  </span>
                  <ChevronRight size={15} className="text-zinc-400" />
                </Link>

                <Link
                  href="/lista-atacado"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-am-magenta to-pink-600 flex items-center justify-between shadow-xs"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles size={15} />
                    <span>Grade Rápida Atacado (P/M/G)</span>
                  </span>
                  <span className="text-[9px] bg-white text-am-magenta px-1.5 py-0.2 rounded font-black">B2B</span>
                </Link>

                <Link
                  href="/conta"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl font-bold text-xs text-zinc-800 hover:bg-zinc-100 flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <User size={16} className="text-zinc-500" />
                    <span>Minha Conta</span>
                  </span>
                  <ChevronRight size={15} className="text-zinc-400" />
                </Link>

                <Link
                  href="/#contato"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl font-bold text-xs text-zinc-800 hover:bg-zinc-100 flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <PhoneCall size={16} className="text-zinc-500" />
                    <span>Dúvidas & Contato</span>
                  </span>
                  <ChevronRight size={15} className="text-zinc-400" />
                </Link>
              </div>

              {/* Botão de WhatsApp Direto no Drawer */}
              {storeConfig.channelsStatus?.whatsappActive !== false && (
                <div className="pt-2">
                  <a
                    href={getWhatsAppLink("Olá, estou no site da AM FIT e gostaria de atendimento sobre atacado/revenda.", storeConfig.contact.whatsappNumber)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <PhoneCall size={15} />
                    <span>Falar no WhatsApp da Fábrica</span>
                    <span className="text-[9px] bg-emerald-800 px-1.5 py-0.2 rounded font-extrabold uppercase">ONLINE</span>
                  </a>
                </div>
              )}
            </div>

            {/* Rodapé do Drawer */}
            <div className="p-3 border-t border-zinc-100 bg-zinc-50 text-center">
              <p className="text-[10px] text-zinc-500 font-medium">
                AM FIT &bull; Moda Fitness Direto da Fábrica
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
