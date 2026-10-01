"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  Percent, 
  CreditCard, 
  Building2, 
  UserCheck, 
  ChevronRight,
  PhoneCall,
  User,
  Lock,
  Sparkles
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

interface NavbarProps {
  onSearch?: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const { mode, setMode, totalItems, setIsCartOpen, favorites } = useCart();
  const { 
    user, 
    isAuthenticated, 
    openAuthModal, 
    requireWholesaleApproval, 
    isWholesaleApproved 
  } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
    const element = document.getElementById("destaques");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSetMode = (targetMode: "varejo" | "atacado") => {
    if (
      targetMode === "atacado" && 
      requireWholesaleApproval && 
      (!user || user.accountType !== "atacado" || user.wholesaleStatus !== "approved")
    ) {
      openAuthModal("atacado", "login");
      return;
    }
    setMode(targetMode);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-am-gray-200 transition-all duration-200">
      {/* Top Banner Bar */}
      <div className="bg-am-black text-white text-[11px] sm:text-xs py-2 px-4 sm:px-6 lg:px-8 xl:px-10 transition-colors border-b border-zinc-900/60">
        <div className="w-full max-w-[1720px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4">
          <div className="flex items-center gap-2 font-medium text-zinc-300 text-[11px] sm:text-xs">
            <CreditCard size={13} className="text-am-magenta shrink-0" />
            <span>Parcelamento em até <strong className="text-white font-semibold">6x sem juros</strong> no cartão</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 font-semibold tracking-wider text-[11px]">
            {isAuthenticated && user ? (
              <Link 
                href="/conta" 
                className="text-zinc-300 hover:text-white transition-colors hidden sm:inline-flex items-center gap-1.5"
              >
                <User size={12} className="text-am-magenta" />
                <span>Olá, <strong className="text-white">{user.name.split(" ")[0]}</strong> ({user.accountType === "atacado" ? "Atacado" : "Varejo"})</span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal("varejo", "login")}
                className="text-zinc-300 hover:text-white transition-colors hidden sm:inline-flex items-center gap-1.5"
              >
                <User size={12} className="text-am-magenta" />
                <span>Entrar ou Cadastrar-se</span>
              </button>
            )}
            <span className="hidden sm:inline text-zinc-700">•</span>
            <a 
              href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20as%20pe%C3%A7as%20da%20AM%20FIT"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors group"
            >
              <PhoneCall size={12} className="text-am-magenta group-hover:scale-110 transition-transform" />
              <span>Televendas / Atacado WhatsApp</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">ONLINE</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex items-center justify-between h-20 gap-4 lg:gap-6 xl:gap-8">
          
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

          {/* Navigation Links Desktop - Centralizado e bem distribuído */}
          <nav className="hidden lg:flex items-center justify-center gap-1 xl:gap-2 flex-1 max-w-3xl mx-auto text-[13px] xl:text-sm font-semibold tracking-wide text-zinc-700">
            <Link 
              href="/" 
              className="px-3 py-1.5 rounded-lg hover:text-am-magenta hover:bg-zinc-100 transition-all"
            >
              Início
            </Link>
            <Link 
              href="/catalogo" 
              className="px-3 py-1.5 rounded-lg text-zinc-950 hover:text-am-magenta hover:bg-zinc-100 font-bold transition-all"
            >
              Catálogo
            </Link>
            <Link 
              href="/catalogo?categoria=feminino" 
              className="px-3 py-1.5 rounded-lg hover:text-am-magenta hover:bg-zinc-100 transition-all"
            >
              Feminino
            </Link>
            <Link 
              href="/catalogo?categoria=masculino" 
              className="px-3 py-1.5 rounded-lg hover:text-am-magenta hover:bg-zinc-100 transition-all"
            >
              Masculino
            </Link>
            <Link 
              href="/catalogo?categoria=infantil" 
              className="px-3 py-1.5 rounded-lg hover:text-am-magenta hover:bg-zinc-100 transition-all"
            >
              Infantil
            </Link>
            <Link 
              href="/catalogo?categoria=promocoes" 
              className="px-3 py-1.5 rounded-lg text-am-magenta hover:text-am-magenta-dark hover:bg-pink-50/70 font-bold inline-flex items-center gap-1.5 transition-all"
            >
              <Percent size={13} className="animate-pulse" />
              Promoções
              <span className="text-[10px] font-black uppercase px-1.5 py-0.2 bg-am-magenta text-white rounded-full">OFF</span>
            </Link>
            <Link 
              href="/lista-atacado" 
              className="px-3 py-1.5 rounded-lg text-am-magenta hover:bg-pink-50 font-bold transition-all flex items-center gap-1.5 border border-am-magenta/30 shadow-2xs"
            >
              <Sparkles size={13} />
              <span>Lista de Compra</span>
              <span className="text-[9px] font-black uppercase px-1.5 py-0.2 bg-am-magenta text-white rounded">GRADE</span>
            </Link>
            <Link 
              href="/#atacado" 
              className="px-3 py-1.5 rounded-lg hover:text-am-magenta hover:bg-zinc-100 transition-all"
            >
              Atacado
            </Link>
            <Link 
              href="/#contato" 
              className="hidden xl:inline-block px-3 py-1.5 rounded-lg hover:text-am-magenta hover:bg-zinc-100 transition-all"
            >
              Contato
            </Link>
          </nav>

          {/* Actions & Wholesale Toggle - Lado direito */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-3.5 shrink-0">
            
            {/* Wholesale / Retail Selector Switch */}
            <div className="bg-zinc-100 p-1 rounded-full border border-zinc-200/90 flex items-center shadow-inner">
              <button
                type="button"
                onClick={() => handleSetMode("varejo")}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  mode === "varejo"
                    ? "bg-white text-zinc-900 shadow-sm"
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
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
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

            {/* User Account / Profile Button */}
            {isAuthenticated && user ? (
              <Link
                href="/conta"
                className="flex items-center gap-2 pl-1.5 pr-2.5 sm:pr-3 py-1 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 rounded-full transition-colors group shrink-0"
                title="Minha Conta e Pedidos"
              >
                <div className="w-7 h-7 rounded-full bg-am-black text-white flex items-center justify-center font-black text-xs shadow-xs">
                  {user.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-[11px] font-bold text-zinc-900 leading-tight truncate max-w-[85px]">
                    {user.name.split(" ")[0]}
                  </span>
                  <span className={`text-[9px] font-black uppercase leading-none ${
                    user.accountType === "atacado" ? "text-am-magenta" : "text-zinc-500"
                  }`}>
                    {user.accountType === "atacado" ? "Atacado" : "Varejo"}
                  </span>
                </div>
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal("varejo", "login")}
                className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-700 hover:text-am-magenta hover:bg-zinc-100 transition-colors"
                aria-label="Entrar na conta"
                title="Entrar ou Cadastrar"
              >
                <User size={19} />
              </button>
            )}

            {/* Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                searchOpen
                  ? "bg-am-magenta text-white"
                  : "text-zinc-700 hover:text-am-magenta hover:bg-zinc-100"
              }`}
              aria-label="Buscar produtos"
            >
              <Search size={19} />
            </button>

            {/* Wishlist button */}
            <a
              href="#destaques"
              className="w-10 h-10 rounded-full items-center justify-center text-zinc-700 hover:text-am-magenta hover:bg-zinc-100 transition-colors relative hidden sm:flex"
              aria-label="Favoritos"
            >
              <Heart size={19} />
              {favorites.length > 0 && (
                <span className="absolute top-1 right-1 bg-am-magenta text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold ring-2 ring-white">
                  {favorites.length}
                </span>
              )}
            </a>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="h-10 px-3 sm:px-3.5 bg-zinc-950 hover:bg-am-magenta text-white transition-all rounded-full flex items-center gap-2 shadow-sm group"
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
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-zinc-900 hover:text-am-magenta hover:bg-zinc-100 transition-colors"
              aria-label="Abrir Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Collapsible Search Bar */}
        {searchOpen && (
          <div className="py-4 border-t border-zinc-100 bg-white/95 animate-fadeIn">
            <div className="max-w-2xl mx-auto px-4">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Busque por leggings, tops, conjuntos, sem costura..."
                  className="w-full py-2.5 sm:py-3 pl-11 pr-24 sm:pr-28 text-sm bg-zinc-50 border border-zinc-300 rounded-full focus:outline-none focus:border-am-magenta focus:ring-2 focus:ring-am-magenta/20 transition-all text-zinc-900 shadow-inner"
                  autoFocus
                />
                <Search size={18} className="absolute left-4 text-zinc-400" />
                <button
                  type="submit"
                  className="absolute right-1.5 px-4 sm:px-5 py-1.5 sm:py-2 bg-am-magenta hover:bg-am-magenta-hover text-white rounded-full text-xs font-bold transition-all shadow-sm"
                >
                  Buscar
                </button>
              </form>

              {/* Sugestões rápidas de busca */}
              <div className="flex items-center gap-2 mt-2.5 text-xs text-zinc-500 justify-center flex-wrap">
                <span className="font-medium text-zinc-400">Populares:</span>
                {["Conjunto Sem Costura", "Legging Empina Bumbum", "Top Nadador", "Shorts Suplex"].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setSearchQuery(tag);
                      if (onSearch) onSearch(tag);
                      const el = document.getElementById("destaques");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-2.5 py-0.5 rounded-full bg-zinc-100 hover:bg-pink-50 hover:text-am-magenta transition-colors text-[11px]"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-am-gray-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          {/* Mobile Profile Card */}
          <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-2xl mb-2">
            {isAuthenticated && user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-am-black text-white flex items-center justify-center font-black text-xs">
                    {user.name[0]}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs text-zinc-900 leading-tight">{user.name}</h4>
                    <span className="text-[10px] text-zinc-500 capitalize">{user.accountType}</span>
                  </div>
                </div>
                <Link
                  href="/conta"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-1.5 bg-am-magenta text-white font-bold text-xs rounded-xl"
                >
                  Minha Conta
                </Link>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-xs text-zinc-900">Acesse sua Conta</h4>
                  <p className="text-[10px] text-zinc-500">Pedidos, rastreio e condições</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal("varejo", "login");
                  }}
                  className="px-3.5 py-1.5 bg-am-black text-white font-bold text-xs rounded-xl hover:bg-am-magenta transition-colors"
                >
                  Entrar
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg font-semibold text-zinc-800 hover:bg-am-gray-100 flex items-center justify-between"
            >
              <span>Início</span>
              <ChevronRight size={16} className="text-zinc-400" />
            </Link>
            <Link
              href="/catalogo"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg font-black text-am-magenta hover:bg-am-magenta-light flex items-center justify-between"
            >
              <span>Ver Catálogo Completo</span>
              <span className="text-xs bg-am-magenta text-white px-2 py-0.5 rounded-full font-bold">Novo</span>
            </Link>
            <Link
              href="/lista-atacado"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg font-black text-white bg-gradient-to-r from-am-magenta to-pink-600 flex items-center justify-between shadow-xs"
            >
              <span>Grade Rápida Atacado (P/M/G/GG)</span>
              <span className="text-[10px] bg-white text-am-magenta px-2 py-0.5 rounded-full font-black uppercase">B2B</span>
            </Link>
            <Link
              href="/catalogo?categoria=feminino"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg font-semibold text-zinc-800 hover:bg-am-gray-100 flex items-center justify-between pl-6"
            >
              <span>• Moda Feminina</span>
              <ChevronRight size={16} className="text-zinc-400" />
            </Link>
            <Link
              href="/catalogo?categoria=masculino"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg font-semibold text-zinc-800 hover:bg-am-gray-100 flex items-center justify-between pl-6"
            >
              <span>• Moda Masculina</span>
              <ChevronRight size={16} className="text-zinc-400" />
            </Link>
            <Link
              href="/catalogo?categoria=infantil"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg font-semibold text-zinc-800 hover:bg-am-gray-100 flex items-center justify-between pl-6"
            >
              <span>• Moda Infantil Kids</span>
              <ChevronRight size={16} className="text-zinc-400" />
            </Link>
            <Link
              href="/#categorias"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg font-semibold text-zinc-800 hover:bg-am-gray-100 flex items-center justify-between"
            >
              <span>Categorias</span>
              <ChevronRight size={16} className="text-zinc-400" />
            </Link>
            <Link
              href="/#destaques"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg font-semibold text-zinc-800 hover:bg-am-gray-100 flex items-center justify-between"
            >
              <span>Destaques da Loja</span>
              <ChevronRight size={16} className="text-zinc-400" />
            </Link>
            <Link
              href="/#novidades"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg font-semibold text-zinc-800 hover:bg-am-gray-100 flex items-center justify-between"
            >
              <span>Novidades</span>
              <ChevronRight size={16} className="text-zinc-400" />
            </Link>
            <Link
              href="/#mais-vendidos"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg font-semibold text-zinc-800 hover:bg-am-gray-100 flex items-center justify-between"
            >
              <span>Mais Vendidos</span>
              <ChevronRight size={16} className="text-zinc-400" />
            </Link>
            <Link
              href="/catalogo?categoria=promocoes"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg font-bold text-am-magenta hover:bg-am-magenta-light flex items-center justify-between"
            >
              <span>Promoções Exclusivas</span>
              <span className="text-xs bg-am-magenta text-white px-2 py-0.5 rounded-full font-bold">OFF</span>
            </Link>
            <Link
              href="/#atacado"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg font-bold text-zinc-900 hover:bg-am-gray-100 flex items-center justify-between"
            >
              <span>Comprar no Atacado</span>
              <span className="text-xs bg-zinc-900 text-white px-2 py-0.5 rounded-full font-bold">Fábrica</span>
            </Link>
            <Link
              href="/#varejo"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg font-semibold text-zinc-800 hover:bg-am-gray-100 flex items-center justify-between"
            >
              <span>Comprar no Varejo</span>
              <ChevronRight size={16} className="text-zinc-400" />
            </Link>
            <Link
              href="/#contato"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg font-semibold text-zinc-800 hover:bg-am-gray-100 flex items-center justify-between"
            >
              <span>Informações de Contato</span>
              <ChevronRight size={16} className="text-zinc-400" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
