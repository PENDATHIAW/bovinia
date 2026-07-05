/** Chemins publics des visuels officiels BOVINIA (fichiers dans /public/assets). */
export const ASSETS = {
  logo: "/assets/logo/bovinia-logo.png",
  logoIcon: "/assets/logo/bovinia-logo-icon.png",
  heroRange: "/assets/hero/gamme-5-pots.webp",
  contact: "/assets/contact/contact.webp",
  products: {
    wellness: "/assets/products/wellness.png",
    bloom: "/assets/products/bloom.png",
    period: "/assets/products/period.png",
    pulse: "/assets/products/pulse.png",
    calm: "/assets/products/calm.png",
  },
  lifestyle: {
    wellness: "/assets/lifestyle/wellness.png",
    wellnessOffice: "/assets/lifestyle/wellness-office.webp",
    bloom: "/assets/lifestyle/bloom.png",
    period: "/assets/lifestyle/period.png",
    pulse: "/assets/lifestyle/pulse.png",
    calm: "/assets/lifestyle/calm.png",
  },
} as const;

/** Extensions acceptées par fichier (premier existant servi côté client). */
export function assetUrl(basePath: string): string {
  return basePath;
}
