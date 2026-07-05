import type { Metadata } from "next";
import Link from "next/link";
import { Truck, Clock, MapPin, Package } from "lucide-react";
import { PageHero } from "@/components/public/PageHero";
import { formatPrice } from "@/lib/utils";
import { FREE_SHIPPING_MIN, SHIPPING_FEE } from "@/lib/shop/cart";

export const metadata: Metadata = {
  title: "Livraison",
  description:
    "Livraison BOVINIA au Sénégal — Dakar et régions. Frais de livraison, délais et conditions.",
};

const ZONES = [
  {
    zone: "Dakar & banlieue",
    delay: "2 à 5 jours ouvrés",
    note: "Livraison à domicile ou point de rendez-vous convenu.",
  },
  {
    zone: "Thiès, Saint-Louis, Mbour",
    delay: "5 à 7 jours ouvrés",
    note: "Expédition par transporteur partenaire.",
  },
  {
    zone: "Autres régions",
    delay: "5 à 10 jours ouvrés",
    note: "Nous vous confirmons les modalités lors de la commande.",
  },
];

const FEATURES = [
  { icon: Truck, title: "Frais de livraison", desc: `${formatPrice(SHIPPING_FEE)} par commande. Offerte dès ${formatPrice(FREE_SHIPPING_MIN)}.` },
  { icon: Clock, title: "Préparation", desc: "Préparation sous 24 à 48 h après confirmation du paiement." },
  { icon: MapPin, title: "Zones couvertes", desc: "Dakar, banlieue et toutes les régions du Sénégal." },
  { icon: Package, title: "Emballage", desc: "Chaque pot est protégé pour préserver la qualité en transit." },
];

export default function LivraisonPage() {
  return (
    <>
      <PageHero
        label="Logistique"
        title="Livraison"
        description={`Nous livrons partout au Sénégal. Frais de ${formatPrice(SHIPPING_FEE)}, offerts dès ${formatPrice(FREE_SHIPPING_MIN)}.`}
      />

      <div className="section-padding">
        <div className="container-bovinia max-w-4xl">
          <div className="mb-12 grid gap-5 sm:grid-cols-2">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card-premium card-lift border-l-4 border-l-gold/40 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 bg-cream">
                  <Icon size={20} className="text-gold" />
                </div>
                <h2 className="mt-4 font-serif text-xl text-forest">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">{desc}</p>
              </div>
            ))}
          </div>

          <div className="card-premium overflow-hidden">
            <div className="border-b border-gold/15 bg-cream/60 px-6 py-5">
              <h2 className="font-serif text-xl text-forest">Délais par zone</h2>
            </div>
            <div className="divide-y divide-gold/10">
              {ZONES.map((z) => (
                <div key={z.zone} className="grid gap-2 px-6 py-5 transition-colors hover:bg-cream/30 sm:grid-cols-3">
                  <p className="font-medium text-forest">{z.zone}</p>
                  <p className="text-sm font-medium text-gold">{z.delay}</p>
                  <p className="text-sm text-foreground/60">{z.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/commander" className="btn-gold">
              Passer commande
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
