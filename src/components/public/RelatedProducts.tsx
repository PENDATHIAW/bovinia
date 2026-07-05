"use client";

import Link from "next/link";
import type { Product } from "@/types/database";
import { ProductCard } from "./ProductCard";

interface RelatedProductsProps {
  products: Product[];
  currentSlug: string;
}

export function RelatedProducts({ products, currentSlug }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="mt-16 border-t border-gold/15 pt-12">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-widest text-gold">Votre routine</p>
        <h2 className="mt-2 font-serif text-2xl text-forest md:text-3xl">
          Complétez votre rituel
        </h2>
        <p className="mt-2 text-sm text-foreground/60">
          Ces rituels se marient naturellement avec {currentSlug.toUpperCase()}.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link href="/quel-rituel" className="btn-secondary text-sm">
          Pas sûr ? Faire le quiz
        </Link>
      </div>
    </section>
  );
}
