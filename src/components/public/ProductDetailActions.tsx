"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import type { Product } from "@/types/database";
import { AddToCartButton } from "./AddToCartButton";
import { isProductOrderable } from "@/lib/product-availability";

interface ProductDetailActionsProps {
  product: Product;
  whatsappUrl: string;
}

export function ProductDetailActions({ product, whatsappUrl }: ProductDetailActionsProps) {
  const orderable = isProductOrderable(product.status);

  return (
    <>
      <div className="mt-8 hidden flex-wrap gap-3 md:flex">
        {orderable && (
          <AddToCartButton product={product} variant="gold" showQuantity openDrawerOnAdd />
        )}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          <MessageCircle size={16} />
          Poser une question
        </a>
      </div>

      {orderable && (
        <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-gold/20 bg-ivory/95 p-4 shadow-lg backdrop-blur-md md:hidden">
          <div className="container-bovinia flex items-center gap-3">
            <AddToCartButton
              product={product}
              variant="gold"
              size="sm"
              openDrawerOnAdd
              className="flex-1 [&_button]:w-full"
            />
            <Link href="/commander" className="btn-secondary shrink-0 text-xs">
              Commander
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
