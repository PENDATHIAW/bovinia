import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BOVINIA — Nutrition fonctionnelle powered by Bone Broth",
    template: "%s | BOVINIA",
  },
  description:
    "BOVINIA transforme le Bone Broth en rituels nutritionnels gourmands. 5 formules premium fabriquées au Sénégal pour accompagner votre bien-être.",
  keywords: [
    "BOVINIA",
    "Bone Broth Sénégal",
    "bouillon d'os",
    "nutrition fonctionnelle",
    "collagène naturel",
    "bien-être naturel",
    "poudre nutritionnelle",
    "complément naturel Sénégal",
  ],
  openGraph: {
    title: "BOVINIA — Nutrition fonctionnelle powered by Bone Broth",
    description:
      "5 rituels nutritionnels premium à base de Bone Broth, fabriqués au Sénégal.",
    type: "website",
    locale: "fr_FR",
    siteName: "BOVINIA",
    images: ["/assets/logo/bovinia-logo.png"],
  },
  icons: {
    icon: "/assets/logo/bovinia-logo-icon.png",
    apple: "/assets/logo/bovinia-logo-icon.png",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${dmSans.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
