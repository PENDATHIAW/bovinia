import type { Metadata } from "next";
import Link from "next/link";
import { ProductCatalog } from "@/components/public/ProductCatalog";
import { DiscoveryPacks } from "@/components/public/DiscoveryPacks";
import { RitualFinder } from "@/components/public/RitualFinder";
import { BoutiqueHero } from "@/components/public/BoutiqueHero";
import { getProducts } from "@/lib/data/queries";

export const metadata: Metadata = {
  title: "Boutique — Nos rituels",
  description:
    "Commandez les 5 rituels nutritionnels BOVINIA : WELLNESS, BLOOM, PERIOD!, PULSE et CALM. Bone Broth premium fabriqué au Sénégal, livraison disponible.",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <BoutiqueHero />

      <div className="section-padding pb-8 pt-10">
        <div className="container-bovinia max-w-4xl">
          <RitualFinder products={products} compact />
        </div>
      </div>

      <div className="section-padding surface-cream pt-0">
        <div className="container-bovinia">
          <ProductCatalog products={products} />
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/comparateur" className="btn-secondary text-sm">
              Comparer les rituels
            </Link>
            <Link href="/preparation" className="btn-secondary text-sm">
              Comment préparer
            </Link>
            <Link href="/quel-rituel" className="btn-secondary text-sm">
              Quel rituel pour moi ?
            </Link>
          </div>
        </div>
      </div>

      <DiscoveryPacks products={products} />
    </>
  );
}
