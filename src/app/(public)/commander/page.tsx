import type { Metadata } from "next";
import Link from "next/link";
import { CheckoutFlow } from "@/components/public/CheckoutFlow";
import { PageHero } from "@/components/public/PageHero";
import { getProducts } from "@/lib/data/queries";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Commander",
  description:
    "Commandez vos rituels BOVINIA — 5 formules disponibles, livraison au Sénégal. Bone Broth premium fabriqué localement.",
};

export default async function CommanderPage({
  searchParams,
}: {
  searchParams: Promise<{ produit?: string; pack?: string }>;
}) {
  const { produit, pack } = await searchParams;
  const products = await getProducts();

  return (
    <>
      <PageHero
        label="Boutique"
        title="Commander"
        description={`${formatPrice(15000)} le pot · packs dès ${formatPrice(28000)} · Wave, Orange Money ou livraison.`}
      >
        <Link href="/livraison" className="btn-secondary text-sm">
          Infos livraison
        </Link>
      </PageHero>

      <div className="section-padding pt-10">
        <div className="container-bovinia max-w-3xl">
          <div className="card-premium overflow-hidden border-l-4 border-l-gold/50 p-6 shadow-lg md:p-10">
            <CheckoutFlow products={products} defaultProduct={produit} defaultPack={pack} />
          </div>
        </div>
      </div>
    </>
  );
}
