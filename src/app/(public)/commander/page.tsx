import type { Metadata } from "next";
import { OrderForm } from "@/components/public/OrderForm";
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
    <div className="section-padding">
      <div className="container-bovinia max-w-3xl">
        <div className="mx-auto mb-12 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-gold">Boutique</p>
          <h1 className="mt-2 font-serif text-4xl text-forest md:text-5xl">Commander</h1>
          <p className="mt-4 text-foreground/70">
            Tous nos rituels sont disponibles — {formatPrice(15000)} le pot · packs à partir de{" "}
            {formatPrice(28000)}.
          </p>
          <p className="mt-2 text-sm text-foreground/50">
            Paiement Wave, Orange Money ou à la livraison — confirmation par WhatsApp.
          </p>
        </div>

        <div className="card-premium p-6 md:p-10">
          <OrderForm products={products} defaultProduct={produit} defaultPack={pack} />
        </div>
      </div>
    </div>
  );
}
