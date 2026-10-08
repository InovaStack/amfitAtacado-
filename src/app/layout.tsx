import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/CartDrawer";
import { QuickViewModal } from "@/components/QuickViewModal";
import { AdminProvider } from "@/context/AdminContext";
import { AuthModal } from "@/components/AuthModal";
import { MobileBottomNav } from "@/components/MobileBottomNav";

export const metadata: Metadata = {
  title: "AM FIT - Moda Fitness Atacado & Varejo | Direto da Fábrica",
  description:
    "Loja online oficial da AM FIT. Moda fitness feminina de alta performance e direto da fábrica. Lucre 100% com nossos produtos no atacado, exclusivo para revendedores, ou compre no varejo com preço especial.",
  keywords: [
    "AM FIT",
    "moda fitness atacado",
    "roupas de academia atacado",
    "legging empina bumbum",
    "top fitness atacado",
    "conjuntos fitness atacado",
    "revender roupas fitness",
    "fabricante fitness brasil",
  ],
  icons: {
    icon: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="min-h-screen bg-white text-zinc-900 antialiased selection:bg-am-magenta selection:text-white pb-16 lg:pb-0">
        <AdminProvider>
          <AuthProvider>
            <CartProvider>
              {children}
              <CartDrawer />
              <QuickViewModal />
              <AuthModal />
              <MobileBottomNav />
            </CartProvider>
          </AuthProvider>
        </AdminProvider>
      </body>
    </html>
  );
}
