"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { PRODUCT_COLORS } from "@/types/database";
import type { Product } from "@/types/database";
import { ProductImage } from "./ProductImage";
import { ProductPotPlaceholder } from "./ProductPotPlaceholder";

export function HeroShowcase({ products }: { products: Product[] }) {
  return (
    <div className="relative mx-auto flex max-w-md items-end justify-center gap-1 sm:max-w-lg sm:gap-2 lg:max-w-none">
      {products.map((product, i) => {
        const colors = PRODUCT_COLORS[product.color_theme] ?? PRODUCT_COLORS.wellness;
        const rotation = (i - 2) * 4;
        const yOffset = Math.abs(i - 2) * 4;

        return (
          <Link
            key={product.id}
            href={`/produits/${product.slug}`}
            className={cn(
              "group relative transition-all duration-300 hover:-translate-y-3 hover:z-10",
              i === 2 && "z-[2] scale-105"
            )}
            style={{
              transform: `rotate(${rotation}deg) translateY(${yOffset}px)`,
            }}
          >
            <div
              className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 transition-shadow group-hover:shadow-xl"
              style={{ width: i === 2 ? 108 : 88 }}
            >
              <ProductImage
                src={product.image}
                alt={product.name}
                width={108}
                height={140}
                className="h-auto w-full object-contain"
                fallback={
                  <div className="overflow-hidden" style={{ width: i === 2 ? 108 : 88 }}>
                    <ProductPotPlaceholder
                      name={product.name}
                      mission={product.mission}
                      colorTheme={product.color_theme}
                      size="sm"
                      className="!h-36 !rounded-none sm:!h-40"
                    />
                  </div>
                }
              />
            </div>
            <span
              className="absolute -bottom-1 left-1/2 h-1 w-3/4 -translate-x-1/2 rounded-full opacity-20 blur-sm transition-opacity group-hover:opacity-30"
              style={{ backgroundColor: colors.accent }}
            />
          </Link>
        );
      })}
    </div>
  );
}
