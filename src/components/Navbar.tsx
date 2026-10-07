"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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
  CreditCard,
  User,
  LogOut,
  SlidersHorizontal,
  Package,
  ShieldCheck,
  Clock,
  ArrowRight
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useAdmin } from "@/context/AdminContext";
import { getWhatsAppLink } from "@/config/store";

interface NavbarProps {
  onSearch?: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const { mode, setMode, totalItems, setIsCartOpen, favorites } = useCart();
  const { user, isAuthenticated, logout, openAuthModal, isWholesaleApproved, isWholesalePending } = useAuth();
  const { storeConfig } = useAdmin();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
    const element = document.getElementById("destaques");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSetMode = (targetMode: "varejo" | "atacado") => {
    setMode(targetMode);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-am-gray-200 transition-all duration-200">
      {/* Top Banner Bar */}
      <div className="bg-am-black text-white text-[11px] sm:text-xs py-2 px-4 sm:px-6 lg:px-8 xl:px-10 transition-colors border-b border-zinc-900/60">
        <div className="w-full max-w-[1720px] mx-auto flex flex-col md:flex-row items-center justify-between gap-1.5 sm:gap-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-4 font-semibold text-zinc-300 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-amber-300">
              <span>✨</span>
              <span>Lucre 100% com nossos produtos</span>
            </span>
            <span className="text-zinc-600 hidden sm:inline">&bull;</span>
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

          <div className="flex items-center gap-3 sm:gap-4 font-semibold tracking-wider text-[11px]">
            {/* Quick wholesale or retail account helper */}
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
                <span>Televendas / Atacado WhatsApp</span>
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

      {/* Main Navbar */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex items-center justify-between h-20 gap-3 lg:gap-6 xl:gap-8">
          
          {/* Logo AM FIT - Canto esquerdo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-36 h-12 sm:w-44 sm:h-14 bg-black rounded-xl p-1.5 shadow-sm overflow-hidden flex items-center justify-center border border-zinc-800 transition-all duration-300 group-hover:border-am-magenta/50 group-hover:shadow-md">
              <Image
                src="/logo.jpg"
                alt="AM FIT Atacado e Varejo"
                fill
                sizes="(max-width: 768px) 150px, 180px"
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Navigation Links Desktop */}
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

          {/* Actions & Wholesale Toggle - Lado direito */}
          <div className="flex items-center gap-2 sm:gap-2.5 lg:gap-3 shrink-0">
            
            {/* Wholesale / Retail Selector Switch */}
            <div className="bg-zinc-100 p-1 rounded-full border border-zinc-200/90 flex items-center shadow-inner">
              <button
                type="button"
                onClick={() => handleSetMode("varejo")}
                className={`px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  mode === "varejo"
                    ? "bg-white text-zinc-900 shadow-xs"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
                title="Modo Varejo: sem valor mínimo"
              >
                <UserCheck size={13} className={mode === "varejo" ? "text-am-magenta" : ""} />
                <span className="hidden sm:inline">Varejo</span>
              </button>
              <button
                type="button"
                onClick={() => handleSetMode("atacado")}
                className={`px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  mode === "atacado"
                    ? "bg-am-magenta text-white shadow-magenta-sm"
                    : "text-zinc-500 hover:text-am-magenta"
                }`}
                title="Modo Atacado: preço direto de fábrica"
              >
                <Building2 size={13} />
                <span className="hidden sm:inline">Atacado</span>
              </button>
            </div>

            {/* Separador vertical sutil */}
            <div className="hidden sm:block h-6 w-px bg-zinc-200" />

            {/* Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all ${
                searchOpen
                  ? "bg-am-magenta text-white"
                  : "text-zinc-700 hover:text-am-magenta hover:bg-zinc-100"
              }`}
              aria-label="Buscar produtos"
            >
              <Search size={18} />
            </button>

            {/* Wishlist button */}
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

            {/* USER LOGIN / ACCOUNT BUTTON WITH DROPDOWN */}
            <div className="relative" ref={dropdownRef}>
              {!isAuthenticated ? (
                <button
                  type="button"
                  onClick={() => openAuthModal("varejo", "login")}
                  className="h-10 px-3 sm:px-3.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 transition-all rounded-full flex items-center gap-1.5 sm:gap-2 text-xs font-bold border border-zinc-200/80 group"
                  aria-label="Entrar ou Cadastrar"
                >
                  <User size={16} className="text-zinc-600 group-hover:text-am-magenta transition-colors" />
                  <span className="hidden md:inline">Entrar</span>
                </button>
              ) : (
                <div>
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="h-10 px-2.5 sm:px-3.5 bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-am-magenta text-zinc-900 transition-all rounded-full flex items-center gap-2 text-xs font-bold shadow-2xs"
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

                  {/* Dropdown Menu */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-zinc-200 py-2 z-50 animate-fadeIn">
                      {/* User Info Header */}
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

                      {/* Dropdown Links */}
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

                      {/* Mode switch & Logout */}
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

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="h-10 px-3.5 bg-zinc-950 hover:bg-am-magenta text-white transition-all rounded-full flex items-center gap-2 shadow-xs group"
              aria-label="Carrinho de Compras"
            >
              <ShoppingBag size={18} className="group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold bg-am-magenta group-hover:bg-zinc-950 text-white px-2 py-0.5 rounded-full min-w-5 text-center transition-colors">
                {totalItems}
              </span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-zinc-900 hover:text-am-magenta hover:bg-zinc-100 transition-colors"
              aria-label="Abrir Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Collapsible Search Bar */}
        {searchOpen && (
          <div className="py-4 border-t border-zinc-100 bg-white/95">
            <div className="max-w-2xl mx-auto px-4">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Busque por leggings, tops, conjuntos, sem costura..."
                  className="w-full py-2.5 sm:py-3 pl-11 pr-24 sm:pr-28 text-sm bg-zinc-50 border border-zinc-300 rounded-full focus:outline-hidden focus:border-am-magenta focus:ring-2 focus:ring-am-magenta/20 transition-all text-zinc-900 shadow-inner"
                  autoFocus
                />
                <Search size={18} className="absolute left-4 text-zinc-400" />
                <button
                  type="submit"
                  className="absolute right-2 px-4 py-1.5 sm:py-2 bg-am-magenta text-white text-xs font-bold rounded-full hover:bg-pink-600 transition-colors"
                >
                  Buscar
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-am-gray-200 px-4 py-6 shadow-xl animate-fadeIn space-y-4">
          
          {/* Mobile User Status / Login Banner */}
          {!isAuthenticated ? (
            <div className="p-4 rounded-2xl bg-zinc-900 text-white space-y-3">
              <div>
                <span className="text-[10px] font-black uppercase text-am-magenta tracking-wider">Área do Cliente</span>
                <h4 className="text-sm font-black">Entre ou cadastre-se</h4>
                <p className="text-xs text-zinc-300 mt-0.5">
                  Acesse preços de atacado direto de fábrica ou compre no varejo.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal("varejo", "login");
                  }}
                  className="py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold rounded-xl transition-all"
                >
                  Entrar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal("atacado", "register");
                  }}
                  className="py-2.5 bg-am-magenta hover:bg-pink-600 text-white text-xs font-black rounded-xl transition-all"
                >
                  Cadastrar
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-black text-zinc-900">{user?.name}</h4>
                  <p className="text-[11px] text-zinc-500">{user?.email}</p>
                </div>
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                  user?.accountType === "atacado" ? "bg-am-magenta text-white" : "bg-zinc-200 text-zinc-800"
                }`}>
                  {user?.accountType}
                </span>
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-zinc-200">
                <Link
                  href="/conta"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-2 text-center text-xs font-bold bg-zinc-900 text-white rounded-xl"
                >
                  Minha Conta
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl"
                >
                  Sair
                </button>
              </div>
            </div>
          )}

          {/* Mobile Pricing Mode Switcher */}
          <div className="p-3 rounded-2xl bg-am-gray-50 border border-am-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-zinc-700">Tabela de Preço Ativa:</span>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-zinc-200 text-zinc-700">
                {mode === "atacado" ? "Atacado (Revenda)" : "Varejo (Final)"}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  handleSetMode("varejo");
                  setMobileMenuOpen(false);
                }}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  mode === "varejo"
                    ? "bg-am-black text-white shadow-xs"
                    : "bg-white text-zinc-700 border border-zinc-200"
                }`}
              >
                Varejo
              </button>
              <button
                type="button"
                onClick={() => {
                  handleSetMode("atacado");
                  setMobileMenuOpen(false);
                }}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  mode === "atacado"
                    ? "bg-am-magenta text-white shadow-xs"
                    : "bg-white text-zinc-700 border border-zinc-200"
                }`}
              >
                Atacado (Fábrica)
              </button>
            </div>
          </div>

          {/* Links list */}
          <div className="flex flex-col space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg font-semibold text-zinc-800 hover:bg-am-gray-100 flex items-center justify-between"
            >
              <span>Início</span>
              <ChevronRight size={16} className="text-zinc-400" />
            </Link>
            <Link
              href="/catalogo"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg font-black text-am-magenta hover:bg-am-magenta-light flex items-center justify-between"
            >
              <span>Ver Catálogo Completo</span>
              <ChevronRight size={16} className="text-zinc-400" />
            </Link>
            <Link
              href="/lista-atacado"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg font-black text-white bg-gradient-to-r from-am-magenta to-pink-600 flex items-center justify-between shadow-xs"
            >
              <span>Grade Rápida Atacado (P/M/G/GG)</span>
              <span className="text-[10px] bg-white text-am-magenta px-2 py-0.5 rounded-full font-black uppercase">B2B</span>
            </Link>
            <Link
              href="/conta"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg font-semibold text-zinc-800 hover:bg-am-gray-100 flex items-center justify-between"
            >
              <span>Minha Conta & Pedidos</span>
              <ChevronRight size={16} className="text-zinc-400" />
            </Link>
            <Link
              href="/#contato"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg font-semibold text-zinc-800 hover:bg-am-gray-100 flex items-center justify-between"
            >
              <span>Fale Conosco</span>
              <ChevronRight size={16} className="text-zinc-400" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
