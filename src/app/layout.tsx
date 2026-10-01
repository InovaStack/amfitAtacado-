import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/CartDrawer";
import { QuickViewModal } from "@/components/QuickViewModal";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { AuthModal } from "@/components/AuthModal";
import { AdminProvider } from "@/context/AdminContext";

export const metadata: Metadata = {
  title: "AM FIT - Moda Fitness Atacado & Varejo | Direto da Fábrica",
  description:
    "Loja online oficial da AM FIT. Moda fitness feminina de alta compressão, zero transparência, conjuntos, calças, tops e linha sem costura. Atacado com margens de até 120% e varejo exclusivo.",
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
      <body className="min-h-screen bg-white text-zinc-900 antialiased selection:bg-am-magenta selection:text-white">
        <AdminProvider>
          <AuthProvider>
            <CartProvider>
              {children}
              <CartDrawer />
              <QuickViewModal />
              <FloatingWhatsApp />
              <AuthModal />
            </CartProvider>
          </AuthProvider>
        </AdminProvider>
      </body>
    </html>
  );
}
