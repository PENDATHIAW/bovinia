import type { Product } from "@/types/database";
import { CATEGORY_LABELS, type ProductCategory } from "@/types/database";

export interface ComparisonRow {
  label: string;
  values: Record<string, string>;
}

export const COMPARISON_PROBLEM: Record<string, string> = {
  wellness: "Fatigue, digestion, manque d'énergie au quotidien",
  bloom: "Grossesse, post-partum, besoin nutritionnel doux",
  period: "Confort du cycle, règles, ballonnements",
  pulse: "Sport, récupération, vitalité avant l'effort",
  calm: "Sommeil, stress du soir, détente",
};

export function buildComparisonRows(products: Product[]): ComparisonRow[] {
  const slugs = products.map((p) => p.slug);

  const row = (label: string, getter: (p: Product) => string): ComparisonRow => ({
    label,
    values: Object.fromEntries(products.map((p) => [p.slug, getter(p)])),
  });

  return [
    row("Problème ciblé", (p) => COMPARISON_PROBLEM[p.slug] ?? p.mission),
    row("Pour qui ?", (p) => p.target_audience),
    row("Moment idéal", (p) => p.usage_moment),
    row("Saveurs", (p) => p.dominant_flavors.join(", ")),
    row("Catégorie", (p) => CATEGORY_LABELS[p.category as ProductCategory] ?? p.category),
    row("Format", () => "500 g · ~30 portions"),
    row("Prix", (p) => (p.price ? `${p.price.toLocaleString("fr-FR")} FCFA` : "—")),
  ].filter((r) => slugs.every((s) => r.values[s]));
}
