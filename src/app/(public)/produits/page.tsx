import type { Metadata } from "next";
import { ProductCatalog } from "@/components/public/ProductCatalog";
import { DiscoveryPacks } from "@/components/public/DiscoveryPacks";
import { RitualFinder } from "@/components/public/RitualFinder";
import { PageHero } from "@/components/public/PageHero";
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
      <PageHero
        label="Boutique"
        title="Nos rituels nutritionnels"
        description={`5 formules premium — ${formatPrice(15000)} le pot · 500 g · ~30 portions · Bone Broth fabriqué au Sénégal.`}
      />

      <div className="section-padding pb-8 pt-10">
        <div className="container-bovinia max-w-4xl">
          <RitualFinder products={products} compact />
        </div>
      </div>

      <div className="section-padding surface-cream pt-0">
        <div className="container-bovinia">
          <ProductCatalog products={products} />
        </div>
      </div>

      <DiscoveryPacks products={products} />
    </>
  );
}
