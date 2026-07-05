"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/types/database";
import {
  addPackToCart,
  addProductToCart,
  computeCartTotals,
  removeLine,
  updateLineQuantity,
  type CartLine,
} from "./cart";

const STORAGE_KEY = "bovinia-cart";

interface CartContextValue {
  cart: CartLine[];
  hydrated: boolean;
  itemCount: number;
  subtotal: number;
  shippingFee: number;
  total: number;
  addProduct: (product: Product, quantity?: number) => void;
  addPack: (packId: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeLine: (key: string) => void;
  clearCart: () => void;
  mergeLines: (lines: CartLine[]) => void;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toast: string | null;
}

const CartContext = createContext<CartContextValue | null>(null);

function loadCart(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCart(cart: CartLine[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setCart(loadCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveCart(cart);
  }, [cart, hydrated]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  const updateCart = useCallback((updater: (prev: CartLine[]) => CartLine[]) => {
    setCart(updater);
  }, []);

  const addProduct = useCallback(
    (product: Product, quantity = 1) => {
      updateCart((prev) => {
        let next = prev;
        for (let i = 0; i < quantity; i++) {
          next = addProductToCart(next, product);
        }
        return next;
      });
      setToast(
        quantity > 1
          ? `${quantity} × ${product.name} ajoutés au panier`
          : `${product.name} ajouté au panier`
      );
    },
    [updateCart]
  );

  const addPack = useCallback(
    (packId: string) => {
      updateCart((prev) => addPackToCart(prev, packId));
      setToast("Pack ajouté au panier");
    },
    [updateCart]
  );

  const handleUpdateQuantity = useCallback(
    (key: string, quantity: number) => {
      updateCart((prev) => updateLineQuantity(prev, key, quantity));
    },
    [updateCart]
  );

  const handleRemoveLine = useCallback(
    (key: string) => {
      updateCart((prev) => removeLine(prev, key));
    },
    [updateCart]
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const mergeLines = useCallback(
    (lines: CartLine[]) => {
      updateCart((prev) => {
        let next = [...prev];
        for (const line of lines) {
          if (line.type === "pack" && line.packId) {
            next = addPackToCart(next, line.packId);
          } else if (line.slug) {
            const existing = next.find((l) => l.key === line.key);
            if (!existing) next = [...next, line];
          }
        }
        return next;
      });
    },
    [updateCart]
  );

  const totals = useMemo(() => computeCartTotals(cart), [cart]);
  const itemCount = useMemo(
    () => cart.reduce((sum, line) => sum + line.quantity, 0),
    [cart]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      hydrated,
      itemCount,
      subtotal: totals.subtotal,
      shippingFee: totals.shippingFee,
      total: totals.total,
      addProduct,
      addPack,
      updateQuantity: handleUpdateQuantity,
      removeLine: handleRemoveLine,
      clearCart,
      mergeLines,
      isDrawerOpen,
      openDrawer: () => setIsDrawerOpen(true),
      closeDrawer: () => setIsDrawerOpen(false),
      toast,
    }),
    [
      cart,
      hydrated,
      itemCount,
      totals,
      addProduct,
      addPack,
      handleUpdateQuantity,
      handleRemoveLine,
      clearCart,
      mergeLines,
      isDrawerOpen,
      toast,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
