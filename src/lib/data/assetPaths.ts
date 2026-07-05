/**
 * Mapping des visuels officiels BOVINIA (fichiers uploadés dans public/assets/logo/).
 * Généré à partir des captures UUID — ne pas recréer en code.
 */
export const ASSETS = {
  logo: "/assets/logo/1E8C3793-1C36-4FB3-8A32-3E510719EDAB.png",
  logoIcon: "/assets/logo/1E8C3793-1C36-4FB3-8A32-3E510719EDAB.png",
  heroRange: "/assets/logo/B730BCA1-B6E7-41A2-A6E7-AAB9330A4C07.png",
  products: {
    wellness: "/assets/logo/2F591EDD-AAD1-4F19-BF28-A9111B4201D2.png",
    bloom: "/assets/logo/70D3599F-6EA8-4B3D-9BAB-D731EDF1C8EB.png",
    period: "/assets/logo/7356386B-FAB6-4AD5-95E7-BEE9D76A6BB2.png",
    pulse: "/assets/logo/B77F36A7-4660-479D-9264-017220DAA82B.png",
    calm: "/assets/logo/F5D170C8-7583-469A-9DDB-DD96D4580F5F.png",
  },
  lifestyle: {
    wellnessOffice: "/assets/logo/FCE578D3-1050-4CE5-A04B-691516438CEF.png",
    wellnessFresh: "/assets/logo/5FC18661-AE54-4EE8-AAA4-35B765402892.png",
    bloom: "/assets/logo/1DC7FA8F-528A-4E0C-B305-BAEABF338AAF.png",
    period: "/assets/logo/953966F8-0291-4DAE-AB2C-660FC273DFA8.png",
    pulse: "/assets/logo/9D3BCCE0-2DDC-4EB1-A1A8-644331D6277D.png",
    calm: "/assets/logo/881482F3-6A78-4651-91CE-E5EB07E0380E.png",
  },
} as const;

/** Bloque toute image contenant des formules détaillées (confidentiel). */
export function isBlockedAsset(path: string): boolean {
  const lower = path.toLowerCase();
  return lower.includes("formulas-chart") || lower.includes("formule");
}
