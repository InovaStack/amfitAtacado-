"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid, Building2, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();
  const { isAuthenticated, openAuthModal } = useAuth();

  // Esconder a barra inferior dentro do painel administrativo
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const isHome = pathname === "/";
  const isCatalogo = pathname === "/catalogo";
  const isAtacado = pathname === "/lista-atacado";
  const isConta = pathname === "/conta";

  return (
    <nav
      aria-label="Navegação Inferior Mobile"
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-lg border-t border-zinc-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom)]"
    >
      <div className="grid grid-cols-5 h-16 max-w-md mx-auto items-center px-1">
        
        {/* 1. Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center h-full py-1 transition-colors ${
            isHome ? "text-am-magenta font-black" : "text-zinc-500 hover:text-zinc-900 font-semibold"
          }`}
        >
          <Home size={20} className={isHome ? "stroke-[2.5]" : "stroke-2"} />
          <span className="text-[10px] tracking-tight mt-1">Início</span>
        </Link>

        {/* 2. Catálogo */}
        <Link
          href="/catalogo"
          className={`flex flex-col items-center justify-center h-full py-1 transition-colors ${
            isCatalogo ? "text-am-magenta font-black" : "text-zinc-500 hover:text-zinc-900 font-semibold"
          }`}
        >
          <Grid size={20} className={isCatalogo ? "stroke-[2.5]" : "stroke-2"} />
          <span className="text-[10px] tracking-tight mt-1">Catálogo</span>
        </Link>

        {/* 3. Atacado B2B */}
        <Link
          href="/lista-atacado"
          className={`flex flex-col items-center justify-center h-full py-1 transition-colors relative ${
            isAtacado ? "text-am-magenta font-black" : "text-zinc-500 hover:text-zinc-900 font-semibold"
          }`}
        >
          <Building2 size={20} className={isAtacado ? "stroke-[2.5]" : "stroke-2"} />
          <span className="text-[10px] tracking-tight mt-1">Atacado</span>
          <span className="absolute top-1.5 right-2 px-1 py-0.2 bg-purple-600 text-[8px] font-black text-white rounded-full">
            B2B
          </span>
        </Link>

        {/* 4. Sacola (Abre CartDrawer) */}
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center h-full py-1 text-zinc-500 hover:text-am-magenta font-semibold relative transition-colors"
          aria-label="Abrir Sacola de Compras"
        >
          <div className="relative">
            <ShoppingBag size={20} className="stroke-2" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-am-magenta text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs ring-2 ring-white animate-pulse">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-1">Sacola</span>
        </button>

        {/* 5. Conta / Login */}
        {isAuthenticated ? (
          <Link
            href="/conta"
            className={`flex flex-col items-center justify-center h-full py-1 transition-colors ${
              isConta ? "text-am-magenta font-black" : "text-zinc-500 hover:text-zinc-900 font-semibold"
            }`}
          >
            <User size={20} className={isConta ? "stroke-[2.5]" : "stroke-2"} />
            <span className="text-[10px] tracking-tight mt-1">Conta</span>
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => openAuthModal("varejo", "login")}
            className="flex flex-col items-center justify-center h-full py-1 text-zinc-500 hover:text-am-magenta font-semibold transition-colors"
          >
            <User size={20} className="stroke-2" />
            <span className="text-[10px] tracking-tight mt-1">Entrar</span>
          </button>
        )}

      </div>
    </nav>
  );
};
