import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
};

export default function MentionsLegalesPage() {
  return (
    <div className="section-padding">
      <div className="container-bovinia max-w-3xl prose-bovinia">
        <h1 className="font-serif text-4xl text-forest">Mentions légales</h1>
        <p className="mt-6 text-foreground/70">
          Éditeur du site : BOVINIA — Nutrition fonctionnelle powered by Bone Broth.
        </p>
        <p className="text-foreground/70">
          Siège social : Dakar, Sénégal. Contact : contact@bovinia.sn
        </p>
        <h2 className="mt-8 font-serif text-2xl text-forest">Hébergement</h2>
        <p className="text-foreground/70">
          Ce site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
        </p>
        <h2 className="mt-8 font-serif text-2xl text-forest">Propriété intellectuelle</h2>
        <p className="text-foreground/70">
          L&apos;ensemble du contenu de ce site (textes, images, logos, marques) est la propriété
          exclusive de BOVINIA et est protégé par les lois en vigueur.
        </p>
        <h2 className="mt-8 font-serif text-2xl text-forest">Avertissement</h2>
        <p className="text-foreground/70">
          Les produits BOVINIA sont des aliments fonctionnels. Ils ne sont pas des médicaments et ne
          remplacent pas un avis médical professionnel.
        </p>
      </div>
    </div>
  );
}
