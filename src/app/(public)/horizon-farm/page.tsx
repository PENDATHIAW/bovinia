import type { Metadata } from "next";
import { ArrowRight, Recycle, Shield, TrendingUp, Globe, Leaf } from "lucide-react";

export const metadata: Metadata = {
  title: "Horizon Farm & Chaîne de valeur",
  description:
    "De l'élevage à l'export : découvrez la chaîne de valeur BOVINIA en partenariat avec Horizon Farm.",
};

const STEPS = [
  { title: "Horizon Farm", desc: "Élevage responsable et sélection rigoureuse des animaux." },
  { title: "Matières premières", desc: "Os, tendons, articulations et carcasses valorisés." },
  { title: "Transformation", desc: "Bone Broth premium transformé en poudre moderne." },
  { title: "Produits BOVINIA", desc: "5 rituels nutritionnels gourmands et traçables." },
  { title: "Marché local", desc: "Distribution au Sénégal et en Afrique de l'Ouest." },
  { title: "Export", desc: "Ambition internationale pour une marque exportable." },
];

const VALUES = [
  { icon: Recycle, title: "Réduction du gaspillage", desc: "Valorisation des parties sous-utilisées." },
  { icon: Shield, title: "Qualité & traçabilité", desc: "Maîtrise de bout en bout de la chaîne." },
  { icon: TrendingUp, title: "Création de valeur locale", desc: "Emplois et richesse au Sénégal." },
  { icon: Leaf, title: "Ingrédients naturels", desc: "Sélection rigoureuse, sans compromis." },
  { icon: Globe, title: "Distribution & export", desc: "Vision locale avec ambition internationale." },
];

export default function HorizonFarmPage() {
  return (
    <div className="section-padding">
      <div className="container-bovinia">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-gold">Traçabilité</p>
          <h1 className="mt-2 font-serif text-4xl text-forest md:text-5xl">
            Horizon Farm & Chaîne de valeur
          </h1>
          <p className="mt-4 text-foreground/70">
            De l&apos;élevage à votre rituel quotidien, une chaîne maîtrisée et transparente.
          </p>
        </div>

        <div className="mb-16 overflow-x-auto">
          <div className="flex min-w-max items-center justify-center gap-2 px-4 md:gap-4">
            {STEPS.map((step, i) => (
              <div key={step.title} className="flex items-center gap-2">
                <div className="card-premium w-40 p-4 text-center md:w-48">
                  <p className="font-serif text-sm text-forest md:text-base">{step.title}</p>
                  <p className="mt-2 text-xs text-foreground/60">{step.desc}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <ArrowRight size={20} className="shrink-0 text-gold" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card-premium p-6">
              <div className="mb-4 inline-flex rounded-full bg-forest/10 p-3">
                <Icon size={24} className="text-forest" />
              </div>
              <h2 className="font-serif text-xl text-forest">{title}</h2>
              <p className="mt-2 text-sm text-foreground/70">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 card-premium p-8 text-center">
          <h2 className="font-serif text-2xl text-forest">Une vision circulaire</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-foreground/70">
            Horizon Farm et BOVINIA partagent une même vision : transformer les ressources locales
            en produits premium, réduire le gaspillage alimentaire, créer de la valeur économique
            au Sénégal et bâtir une marque prête pour l&apos;export international.
          </p>
        </div>
      </div>
    </div>
  );
}
