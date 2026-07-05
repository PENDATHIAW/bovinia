"use client";

import { useCart } from "@/lib/shop/CartContext";
import { FREE_SHIPPING_MIN } from "@/lib/shop/cart";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ShippingProgressProps {
  className?: string;
  compact?: boolean;
}

export function ShippingProgress({ className, compact = false }: ShippingProgressProps) {
  const { subtotal, shippingFee } = useCart();

  if (subtotal === 0) return null;

  const progress = Math.min(100, (subtotal / FREE_SHIPPING_MIN) * 100);
  const remaining = FREE_SHIPPING_MIN - subtotal;
  const isFree = shippingFee === 0 && subtotal > 0;

  return (
    <div className={cn("rounded-xl border border-gold/20 bg-cream/60 p-4", className)}>
      {isFree ? (
        <p className="text-sm font-medium text-forest">
          Livraison offerte — votre commande dépasse {formatPrice(FREE_SHIPPING_MIN)}
        </p>
      ) : (
        <p className="text-sm text-foreground/70">
          Plus que{" "}
          <span className="font-medium text-forest">{formatPrice(remaining)}</span> pour la
          livraison offerte
        </p>
      )}
      {!compact && (
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-ivory">
          <div
            className="h-full rounded-full bg-gold transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      <p className="mt-2 text-xs text-foreground/50">
        Frais de livraison : {isFree ? "offerts" : formatPrice(2000)} · Dakar et régions
      </p>
    </div>
  );
}
