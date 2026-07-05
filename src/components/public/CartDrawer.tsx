"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/lib/shop/CartContext";
import { formatPrice } from "@/lib/utils";
import { ShippingProgress } from "./ShippingProgress";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const {
    cart,
    hydrated,
    itemCount,
    subtotal,
    total,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeLine,
    toast,
  } = useCart();

  if (!hydrated) return null;

  return (
    <>
      {toast && (
        <div className="fixed bottom-24 left-1/2 z-[60] -translate-x-1/2 rounded-full border border-gold/30 bg-forest px-5 py-2.5 text-sm text-ivory shadow-lg md:bottom-8">
          {toast}
        </div>
      )}

      <div
        className={cn(
          "fixed inset-0 z-50 bg-forest/40 backdrop-blur-sm transition-opacity",
          isDrawerOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={closeDrawer}
        aria-hidden={!isDrawerOpen}
      />

      <aside
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-ivory shadow-2xl transition-transform duration-300",
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        )}
        aria-label="Panier"
        aria-hidden={!isDrawerOpen}
      >
        <div className="flex items-center justify-between border-b border-gold/15 px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-gold" />
            <h2 className="font-serif text-xl text-forest">Votre panier</h2>
            {itemCount > 0 && (
              <span className="rounded-full bg-forest px-2 py-0.5 text-xs text-ivory">
                {itemCount}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            className="rounded-lg p-2 text-forest hover:bg-cream"
            aria-label="Fermer le panier"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag size={40} className="text-forest/20" />
              <p className="mt-4 text-sm text-foreground/60">Votre panier est vide.</p>
              <Link href="/produits" className="btn-secondary mt-6" onClick={closeDrawer}>
                Découvrir la gamme
              </Link>
            </div>
          ) : (
            <ul className="space-y-3">
              {cart.map((line) => (
                <li
                  key={line.key}
                  className="rounded-xl border border-gold/15 bg-white p-4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-forest">{line.name}</p>
                      <p className="text-xs text-foreground/50">
                        {formatPrice(line.unitPrice)} / unité
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeLine(line.key)}
                      className="rounded-lg p-1.5 text-foreground/40 hover:bg-cream hover:text-forest"
                      aria-label="Retirer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center rounded-lg border border-forest/15">
                      <button
                        type="button"
                        className="p-2 text-forest hover:bg-cream"
                        onClick={() => updateQuantity(line.key, line.quantity - 1)}
                        aria-label="Diminuer"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="min-w-[2rem] text-center text-sm">{line.quantity}</span>
                      <button
                        type="button"
                        className="p-2 text-forest hover:bg-cream"
                        onClick={() => updateQuantity(line.key, line.quantity + 1)}
                        aria-label="Augmenter"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <span className="font-medium text-forest">
                      {formatPrice(line.unitPrice * line.quantity)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-gold/15 px-5 py-4">
            <ShippingProgress compact className="mb-4" />
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-foreground/70">
                <span>Sous-total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between font-medium text-forest">
                <span>Total estimé</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <Link
              href="/commander"
              className="btn-gold mt-4 w-full"
              onClick={closeDrawer}
            >
              Commander
            </Link>
            <button
              type="button"
              className="btn-secondary mt-2 w-full"
              onClick={closeDrawer}
            >
              Continuer mes achats
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
