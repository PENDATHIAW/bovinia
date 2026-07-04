"use client";

import { useState } from "react";
import { ProductCard } from "@/components/public/ProductCard";
import { cn } from "@/lib/utils";
import type { Product, ProductCategory } from "@/types/database";
import { CATEGORY_LABELS } from "@/types/database";

const FILTERS: { value: ProductCategory | "all"; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "bien-etre", label: "Bien-être" },
  { value: "grossesse", label: "Grossesse" },
  { value: "cycle-feminin", label: "Cycle féminin" },
  { value: "sport", label: "Sport" },
  { value: "sommeil", label: "Sommeil" },
];

export function ProductCatalog({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<ProductCategory | "all">("all");

  const filtered =
    filter === "all" ? products : products.filter((p) => p.category === filter);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-all",
              filter === f.value
                ? "bg-forest text-ivory"
                : "border border-forest/20 text-forest hover:bg-cream"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}
