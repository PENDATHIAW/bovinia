/**
 * Chemins des visuels officiels BOVINIA — dossier public/assets/products/
 */
export const ASSETS = {
  logo: "/assets/products/brand/logo.png",
  logoIcon: "/assets/products/brand/logo.png",
  heroRange: "/assets/products/brand/hero-gamme.png",
  products: {
    wellness: "/assets/products/pots/wellness.png",
    bloom: "/assets/products/pots/bloom.png",
    period: "/assets/products/pots/period.png",
    pulse: "/assets/products/pots/pulse.png",
    calm: "/assets/products/pots/calm.png",
  },
  lifestyle: {
    wellnessOffice: "/assets/products/lifestyle/wellness-bureau.png",
    wellnessFresh: "/assets/products/lifestyle/wellness-cuisine.png",
    bloom: "/assets/products/lifestyle/bloom-grossesse.png",
    period: "/assets/products/lifestyle/period-rituel.png",
    pulse: "/assets/products/lifestyle/pulse-sport.png",
    calm: "/assets/products/lifestyle/calm-soir.png",
  },
} as const;

/** Bloque toute image contenant des formules détaillées (confidentiel). */
export function isBlockedAsset(path: string): boolean {
  const lower = path.toLowerCase();
  return lower.includes("formulas-chart") || lower.includes("formule");
}
