/** Chemins publics des visuels officiels BOVINIA — fichiers dans /public/assets uniquement. */
export const ASSETS = {
  logo: "/assets/logo/bovinia-logo.png",
  logoIcon: "/assets/logo/bovinia-logo-icon.png",
  heroRange: "/assets/brand/hero-range.jpg",
  products: {
    wellness: "/assets/products/wellness.png",
    bloom: "/assets/products/bloom.png",
    period: "/assets/products/period.png",
    pulse: "/assets/products/pulse.png",
    calm: "/assets/products/calm.png",
  },
  lifestyle: {
    wellnessOffice: "/assets/lifestyle/wellness-office.jpg",
    wellnessFresh: "/assets/lifestyle/wellness-fresh.jpg",
    bloom: "/assets/lifestyle/bloom.jpg",
    period: "/assets/lifestyle/period.jpg",
    pulse: "/assets/lifestyle/pulse.jpg",
    calm: "/assets/lifestyle/calm.jpg",
  },
} as const;

/** Bloque toute image contenant des formules détaillées (confidentiel). */
export function isBlockedAsset(path: string): boolean {
  return path.includes("formulas-chart") || path.includes("formule");
}
