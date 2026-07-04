import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="section-padding">
      <div className="container-bovinia max-w-3xl prose-bovinia">
        <h1 className="font-serif text-4xl text-forest">Politique de confidentialité</h1>
        <p className="mt-6 text-foreground/70">
          BOVINIA s&apos;engage à protéger vos données personnelles conformément à la réglementation
          applicable.
        </p>
        <h2 className="mt-8 font-serif text-2xl text-forest">Données collectées</h2>
        <p className="text-foreground/70">
          Nous collectons les données que vous nous transmettez volontairement via nos formulaires
          (contact, précommande, newsletter) : nom, email, téléphone, ville et préférences.
        </p>
        <h2 className="mt-8 font-serif text-2xl text-forest">Utilisation des données</h2>
        <p className="text-foreground/70">
          Vos données sont utilisées pour répondre à vos demandes, gérer les précommandes,
          vous informer du lancement et améliorer nos services. Elles ne sont pas vendues à des tiers.
        </p>
        <h2 className="mt-8 font-serif text-2xl text-forest">Vos droits</h2>
        <p className="text-foreground/70">
          Vous pouvez demander l&apos;accès, la rectification ou la suppression de vos données en
          contactant contact@bovinia.sn.
        </p>
        <h2 className="mt-8 font-serif text-2xl text-forest">Cookies</h2>
        <p className="text-foreground/70">
          Ce site peut utiliser des cookies techniques nécessaires à son fonctionnement et des
          outils d&apos;analyse pour améliorer l&apos;expérience utilisateur.
        </p>
      </div>
    </div>
  );
}
