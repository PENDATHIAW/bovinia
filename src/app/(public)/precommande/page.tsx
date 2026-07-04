import type { Metadata } from "next";
import { PreorderForm } from "@/components/public/PreorderForm";
import { getProducts } from "@/lib/data/queries";

export const metadata: Metadata = {
  title: "Précommande",
  description:
    "Inscrivez-vous à la waitlist BOVINIA et soyez informé(e) du lancement de nos 5 rituels nutritionnels.",
};

export default async function PrecommandePage({
  searchParams,
}: {
  searchParams: Promise<{ produit?: string; pack?: string }>;
}) {
  const { produit, pack } = await searchParams;
  const products = await getProducts();

  return (
    <div className="section-padding">
      <div className="container-bovinia max-w-3xl">
        <div className="mx-auto mb-12 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-gold">Waitlist</p>
          <h1 className="mt-2 font-serif text-4xl text-forest md:text-5xl">Précommander</h1>
          <p className="mt-4 text-foreground/70">
            Rejoignez la liste d&apos;attente — rituels à 15 000 FCFA · packs à partir de 28 000 FCFA.
          </p>
        </div>

        <div className="card-premium p-6 md:p-10">
          <PreorderForm products={products} defaultProduct={produit} defaultPack={pack} />
        </div>
      </div>
    </div>
  );
}
