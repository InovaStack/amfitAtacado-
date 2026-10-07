"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/data/products";
import { getActiveStoreConfig, STORE_CONFIG } from "@/config/store";

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

interface CartContextType {
  mode: "varejo" | "atacado";
  setMode: (mode: "varejo" | "atacado") => void;
  items: CartItem[];
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  addMultipleToCart: (itemsToAdd: { product: Product; size: string; color: string; quantity: number }[]) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  totalItems: number;
  subtotal: number;
  wholesaleMinTarget: number;
  isWholesaleQualified: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<"varejo" | "atacado">("varejo");
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load from local storage
  useEffect(() => {
    try {
      const savedItems = localStorage.getItem("am_fit_cart");
      if (savedItems) setItems(JSON.parse(savedItems));
      const savedMode = localStorage.getItem("am_fit_mode");
      if (savedMode === "atacado" || savedMode === "varejo") setMode(savedMode);
      const savedFavs = localStorage.getItem("am_fit_favs");
      if (savedFavs) setFavorites(JSON.parse(savedFavs));
    } catch {
      // ignore
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    try {
      localStorage.setItem("am_fit_cart", JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem("am_fit_mode", mode);
    } catch {
      // ignore
    }
  }, [mode]);

  useEffect(() => {
    try {
      localStorage.setItem("am_fit_favs", JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  const addToCart = (product: Product, size: string, color: string, quantity: number = 1) => {
    setItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size && item.color === color
      );
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += quantity;
        return copy;
      }
      return [...prev, { product, quantity, size, color }];
    });
    setIsCartOpen(true);
  };

  const addMultipleToCart = (
    itemsToAdd: { product: Product; size: string; color: string; quantity: number }[]
  ) => {
    if (!itemsToAdd.length) return;
    setItems((prev) => {
      let copy = [...prev];
      for (const item of itemsToAdd) {
        if (item.quantity <= 0) continue;
        const existingIdx = copy.findIndex(
          (cartItem) =>
            cartItem.product.id === item.product.id &&
            cartItem.size === item.size &&
            cartItem.color === item.color
        );
        if (existingIdx > -1) {
          copy[existingIdx] = {
            ...copy[existingIdx],
            quantity: copy[existingIdx].quantity + item.quantity,
          };
        } else {
          copy.push({
            product: item.product,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
          });
        }
      }
      return copy;
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    setItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.size === size && item.color === color)
      )
    );
  };

  const updateQuantity = (productId: string, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = items.reduce((acc, item) => {
    const unitPrice = mode === "atacado" ? item.product.wholesalePrice : item.product.retailPrice;
    return acc + unitPrice * item.quantity;
  }, 0);

  // Wholesale limits dynamically loaded from store config
  const currentConfig = getActiveStoreConfig();
  const wholesaleMinTarget = currentConfig.commercial?.minWholesaleOrderAmount || 300;
  const wholesaleMinPieces = currentConfig.commercial?.minWholesalePieces || 6;
  const isWholesaleQualified = mode === "atacado" ? (subtotal >= wholesaleMinTarget || totalItems >= wholesaleMinPieces) : true;

  return (
    <CartContext.Provider
      value={{
        mode,
        setMode,
        items,
        addToCart,
        addMultipleToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        quickViewProduct,
        setQuickViewProduct,
        favorites,
        toggleFavorite,
        totalItems,
        subtotal,
        wholesaleMinTarget,
        isWholesaleQualified,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
