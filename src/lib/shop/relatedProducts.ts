import type { Product } from "@/types/database";

const RELATED_BY_SLUG: Record<string, string[]> = {
  wellness: ["calm", "pulse"],
  bloom: ["wellness", "calm"],
  period: ["calm", "wellness"],
  pulse: ["wellness", "period"],
  calm: ["wellness", "period"],
};

export function getRelatedProducts(product: Product, allProducts: Product[]): Product[] {
  const slugs = RELATED_BY_SLUG[product.slug] ?? [];
  return slugs
    .map((slug) => allProducts.find((p) => p.slug === slug))
    .filter((p): p is Product => Boolean(p));
}
