"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/shop/CartContext";
import type { Product } from "@/types/database";
import { isProductOrderable } from "@/lib/product-availability";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  product: Product;
  variant?: "primary" | "secondary" | "gold";
  size?: "sm" | "md";
  showQuantity?: boolean;
  openDrawerOnAdd?: boolean;
  className?: string;
}

export function AddToCartButton({
  product,
  variant = "primary",
  size = "md",
  showQuantity = false,
  openDrawerOnAdd = true,
  className,
}: AddToCartButtonProps) {
  const { addProduct, openDrawer } = useCart();
  const [quantity, setQuantity] = useState(1);
  const orderable = isProductOrderable(product.status);

  if (!orderable || !product.price) return null;

  const btnClass =
    variant === "gold"
      ? "btn-gold"
      : variant === "secondary"
        ? "btn-secondary"
        : "btn-primary";

  const sizeClass = size === "sm" ? "text-xs px-4 py-2" : "";

  function handleAdd() {
    addProduct(product, quantity);
    if (openDrawerOnAdd) openDrawer();
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {showQuantity && (
        <div className="flex items-center rounded-full border border-forest/20 bg-ivory">
          <button
            type="button"
            className="p-2.5 text-forest hover:bg-cream rounded-l-full"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Diminuer"
          >
            <Minus size={14} />
          </button>
          <span className="min-w-[2rem] text-center text-sm font-medium">{quantity}</span>
          <button
            type="button"
            className="p-2.5 text-forest hover:bg-cream rounded-r-full"
            onClick={() => setQuantity((q) => Math.min(20, q + 1))}
            aria-label="Augmenter"
          >
            <Plus size={14} />
          </button>
        </div>
      )}
      <button
        type="button"
        className={cn(btnClass, sizeClass, "flex-1 sm:flex-none")}
        onClick={handleAdd}
      >
        <ShoppingBag size={16} />
        Ajouter au panier
      </button>
    </div>
  );
}
