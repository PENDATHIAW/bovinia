import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RitualComparisonTable } from "@/components/public/RitualComparisonTable";
import { PageHero } from "@/components/public/PageHero";
import { getProducts } from "@/lib/data/queries";

export const metadata: Metadata = {
  title: "Comparer les rituels",
  description:
    "Tableau comparatif des 5 rituels BOVINIA — WELLNESS, BLOOM, PERIOD!, PULSE et CALM. Trouvez la formule adaptée à vos besoins.",
};

export default async function ComparateurPage() {
  const products = await getProducts();

  return (
    <>
      <PageHero
        label="Guide d'achat"
        title="Comparer les rituels"
        description="Chaque formule cible un besoin précis — digestion, grossesse, cycle, sport ou sommeil. Trouvez le vôtre en un coup d'œil."
      >
        <Link href="/quel-rituel" className="btn-gold">
          Quiz personnalisé
        </Link>
        <Link href="/preparation" className="btn-secondary">
          Comment préparer
        </Link>
      </PageHero>

      <div className="section-padding">
        <div className="container-bovinia">
          <RitualComparisonTable products={products} />

          <div className="mt-12 rounded-2xl border border-gold/25 bg-cream/50 p-8 text-center">
            <p className="font-serif text-xl text-forest">Vous hésitez encore ?</p>
            <p className="mt-2 text-sm text-foreground/60">
              Répondez à 3 questions et découvrez le rituel fait pour vous.
            </p>
            <Link href="/quel-rituel" className="btn-primary mt-6 inline-flex">
              Faire le quiz
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
