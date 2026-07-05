import type { Metadata } from "next";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { PreparationGuide } from "@/components/public/PreparationGuide";
import { PageHero } from "@/components/public/PageHero";
import { getProducts } from "@/lib/data/queries";

export const metadata: Metadata = {
  title: "Comment préparer",
  description:
    "Guide de préparation BOVINIA — dosage, eau chaude ou fraîche, et mode d'emploi pour chaque rituel au Bone Broth.",
};

export default async function PreparationPage() {
  const products = await getProducts();

  return (
    <>
      <PageHero
        label="Mode d'emploi"
        title="Comment préparer votre rituel"
        description="15–17 g dans 200 ml de liquide · ~30 portions par pot · chaud recommandé, frais possible selon la formule."
      >
        <Link href="/produits" className="btn-gold">
          <ShoppingBag size={16} />
          Voir la boutique
        </Link>
        <Link href="/comparateur" className="btn-secondary">
          Comparer les rituels
        </Link>
      </PageHero>

      <div className="section-padding">
        <div className="container-bovinia max-w-5xl">
          <PreparationGuide products={products} />
        </div>
      </div>
    </>
  );
}
