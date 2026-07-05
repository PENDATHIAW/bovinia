import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { ProductCatalog } from "@/components/public/ProductCatalog";
import { DiscoveryPacks } from "@/components/public/DiscoveryPacks";
import { getProducts } from "@/lib/data/queries";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Boutique — Nos rituels",
  description:
    "Commandez les 5 rituels nutritionnels BOVINIA : WELLNESS, BLOOM, PERIOD!, PULSE et CALM. Bone Broth premium fabriqué au Sénégal, livraison disponible.",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <section className="border-b border-gold/10 bg-cream/50">
        <div className="container-bovinia section-padding pb-10 pt-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-gold">Boutique</p>
            <h1 className="mt-2 font-serif text-4xl text-forest md:text-5xl">
              Nos rituels nutritionnels
            </h1>
            <p className="mt-4 text-foreground/70">
              5 formules disponibles dès maintenant — {formatPrice(15000)} le pot · 500 g · ~30
              portions.
            </p>
            <Link href="/commander" className="btn-primary mt-6 inline-flex">
              <ShoppingBag size={16} />
              Commander
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <div className="section-padding">
        <div className="container-bovinia">
          <ProductCatalog products={products} />
        </div>
      </div>

      <DiscoveryPacks products={products} />
    </>
  );
}
