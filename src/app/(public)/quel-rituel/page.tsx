import type { Metadata } from "next";
import { RitualFinder } from "@/components/public/RitualFinder";
import { PageHero } from "@/components/public/PageHero";
import { getProducts } from "@/lib/data/queries";

export const metadata: Metadata = {
  title: "Quel rituel pour moi ?",
  description:
    "Trouvez le rituel BOVINIA adapté à vos besoins — WELLNESS, BLOOM, PERIOD!, PULSE ou CALM.",
};

export default async function QuelRituelPage() {
  const products = await getProducts();

  return (
    <>
      <PageHero
        label="Guide personnalisé"
        title="Quel rituel pour moi ?"
        description="3 questions pour découvrir le rituel BOVINIA fait pour vous."
      />
      <div className="section-padding pt-10">
        <div className="container-bovinia max-w-3xl">
          <RitualFinder products={products} />
        </div>
      </div>
    </>
  );
}
