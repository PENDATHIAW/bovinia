"use client";

import { CartProvider } from "@/lib/shop/CartContext";
import { CartDrawer } from "./CartDrawer";

export function PublicProviders({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
    </CartProvider>
  );
}
