import type { Metadata } from "next";
import { RitualFinder } from "@/components/public/RitualFinder";
import { getProducts } from "@/lib/data/queries";

export const metadata: Metadata = {
  title: "Quel rituel pour moi ?",
  description:
    "Trouvez le rituel BOVINIA adapté à vos besoins — WELLNESS, BLOOM, PERIOD!, PULSE ou CALM.",
};

export default async function QuelRituelPage() {
  const products = await getProducts();

  return (
    <div className="section-padding">
      <div className="container-bovinia max-w-3xl">
        <RitualFinder products={products} />
      </div>
    </div>
  );
}
