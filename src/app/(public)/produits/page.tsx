import type { Metadata } from "next";
import { ProductCatalog } from "@/components/public/ProductCatalog";
import { DiscoveryPacks } from "@/components/public/DiscoveryPacks";
import { getProducts } from "@/lib/data/queries";

export const metadata: Metadata = {
  title: "Nos rituels",
  description:
    "Découvrez les 5 rituels nutritionnels BOVINIA : WELLNESS, BLOOM, PERIOD!, PULSE et CALM. Bone Broth premium fabriqué au Sénégal.",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="section-padding">
      <div className="container-bovinia">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-gold">Catalogue</p>
          <h1 className="mt-2 font-serif text-4xl text-forest">Nos rituels nutritionnels</h1>
          <p className="mt-4 text-foreground/70">
            5 formules uniques, une seule base : le Bone Broth premium.
          </p>
        </div>
        <ProductCatalog products={products} />
      </div>
      <DiscoveryPacks products={products} />
    </div>
  );
}
