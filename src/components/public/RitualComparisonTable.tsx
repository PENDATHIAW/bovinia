import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/types/database";
import { ProductPotImage } from "./ProductPotImage";
import { AddToCartButton } from "./AddToCartButton";
import { buildComparisonRows } from "@/lib/data/productComparison";
import { cn } from "@/lib/utils";

export function RitualComparisonTable({ products }: { products: Product[] }) {
  const rows = buildComparisonRows(products);

  return (
    <div className="space-y-8">
      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-gold/20">
              <th className="sticky left-0 bg-ivory p-4 font-medium text-foreground/50" />
              {products.map((p) => (
                <th key={p.id} className="p-4 align-top">
                  <div className="mx-auto w-24">
                    <ProductPotImage product={p} size="sm" />
                  </div>
                  <p className="mt-3 font-serif text-lg text-forest">{p.name}</p>
                  <p className="mt-1 text-xs text-gold">{p.mission}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.label}
                className={cn(
                  "border-b border-gold/10",
                  i % 2 === 0 ? "bg-cream/30" : "bg-ivory"
                )}
              >
                <td className="sticky left-0 bg-inherit p-4 font-medium text-forest">
                  {row.label}
                </td>
                {products.map((p) => (
                  <td key={p.id} className="p-4 text-foreground/70 leading-relaxed">
                    {row.values[p.slug]}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="sticky left-0 bg-ivory p-4" />
              {products.map((p) => (
                <td key={p.id} className="p-4">
                  <div className="flex flex-col gap-2">
                    <Link href={`/produits/${p.slug}`} className="btn-secondary w-full text-center text-xs">
                      Voir
                      <ArrowRight size={12} />
                    </Link>
                    <AddToCartButton
                      product={p}
                      variant="gold"
                      size="sm"
                      className="w-full [&_button]:w-full"
                    />
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="grid gap-6 md:hidden">
        {products.map((p) => (
          <article key={p.id} className="card-premium overflow-hidden border-l-4 border-l-gold/50">
            <div className="flex gap-4 p-5">
              <div className="w-24 shrink-0">
                <ProductPotImage product={p} size="sm" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gold">{p.mission}</p>
                <Link href={`/produits/${p.slug}`}>
                  <h3 className="font-serif text-xl text-forest hover:text-gold">{p.name}</h3>
                </Link>
                <p className="mt-1 text-sm text-foreground/60">{p.dominant_flavors.join(" • ")}</p>
              </div>
            </div>
            <dl className="divide-y divide-gold/10 border-t border-gold/10 px-5">
              {rows.map((row) => (
                <div key={row.label} className="grid grid-cols-3 gap-2 py-3 text-sm">
                  <dt className="font-medium text-forest">{row.label}</dt>
                  <dd className="col-span-2 text-foreground/70">{row.values[p.slug]}</dd>
                </div>
              ))}
            </dl>
            <div className="flex gap-2 border-t border-gold/10 p-4">
              <Link href={`/produits/${p.slug}`} className="btn-secondary flex-1 text-center text-xs">
                Fiche produit
              </Link>
              <AddToCartButton product={p} variant="gold" size="sm" className="flex-1 [&_button]:w-full" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
