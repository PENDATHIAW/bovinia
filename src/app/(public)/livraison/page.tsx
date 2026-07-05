import type { Metadata } from "next";
import Link from "next/link";
import { Truck, Clock, MapPin, Package } from "lucide-react";
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

export default function LivraisonPage() {
  return (
    <div className="section-padding">
      <div className="container-bovinia max-w-4xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-gold">Logistique</p>
          <h1 className="mt-2 font-serif text-4xl text-forest md:text-5xl">Livraison</h1>
          <p className="mt-4 text-foreground/70">
            Nous livrons partout au Sénégal. Frais de {formatPrice(SHIPPING_FEE)}, offerts dès{" "}
            {formatPrice(FREE_SHIPPING_MIN)}.
          </p>
        </div>

        <div className="mb-12 grid gap-6 sm:grid-cols-2">
          <div className="card-premium border-l-4 border-l-gold/50 p-6">
            <Truck size={24} className="text-gold" />
            <h2 className="mt-4 font-serif text-xl text-forest">Frais de livraison</h2>
            <p className="mt-2 text-sm text-foreground/70">
              {formatPrice(SHIPPING_FEE)} par commande. Livraison offerte à partir de{" "}
              {formatPrice(FREE_SHIPPING_MIN)}.
            </p>
          </div>
          <div className="card-premium border-l-4 border-l-gold/50 p-6">
            <Clock size={24} className="text-gold" />
            <h2 className="mt-4 font-serif text-xl text-forest">Préparation</h2>
            <p className="mt-2 text-sm text-foreground/70">
              Votre commande est préparée sous 24 à 48 h après confirmation du paiement (ou
              immédiatement pour le paiement à la livraison).
            </p>
          </div>
          <div className="card-premium border-l-4 border-l-gold/50 p-6">
            <MapPin size={24} className="text-gold" />
            <h2 className="mt-4 font-serif text-xl text-forest">Zones couvertes</h2>
            <p className="mt-2 text-sm text-foreground/70">
              Dakar, banlieue et toutes les régions du Sénégal. Contactez-nous pour les zones
              spécifiques.
            </p>
          </div>
          <div className="card-premium border-l-4 border-l-gold/50 p-6">
            <Package size={24} className="text-gold" />
            <h2 className="mt-4 font-serif text-xl text-forest">Emballage</h2>
            <p className="mt-2 text-sm text-foreground/70">
              Chaque pot est protégé pour préserver la qualité de vos rituels nutritionnels pendant
              le transport.
            </p>
          </div>
        </div>

        <div className="card-premium overflow-hidden">
          <div className="border-b border-gold/15 bg-cream/50 px-6 py-4">
            <h2 className="font-serif text-xl text-forest">Délais par zone</h2>
          </div>
          <div className="divide-y divide-gold/10">
            {ZONES.map((z) => (
              <div key={z.zone} className="grid gap-2 px-6 py-5 sm:grid-cols-3">
                <p className="font-medium text-forest">{z.zone}</p>
                <p className="text-sm text-gold">{z.delay}</p>
                <p className="text-sm text-foreground/60 sm:col-span-1">{z.note}</p>
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
  );
}
