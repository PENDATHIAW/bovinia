import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Recycle, Shield, TrendingUp, Globe, Leaf } from "lucide-react";
import { OfficialAssetImage } from "@/components/public/OfficialAssetImage";
import { PageHero } from "@/components/public/PageHero";
import { ASSETS } from "@/lib/data/assetPaths";

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

const LIFESTYLE_STRIPS = [
  { src: ASSETS.lifestyle.wellnessFresh, alt: "WELLNESS en cuisine" },
  { src: ASSETS.lifestyle.pulse, alt: "PULSE rituel sport" },
  { src: ASSETS.lifestyle.calm, alt: "CALM rituel du soir" },
];

export default function HorizonFarmPage() {
  return (
    <>
      <PageHero
        label="Traçabilité"
        title="Horizon Farm & Chaîne de valeur"
        description="De l'élevage à votre rituel quotidien — une chaîne maîtrisée et transparente."
      />

      <div className="section-padding pt-10">
      <div className="container-bovinia">

        <div className="mb-12 grid gap-4 sm:grid-cols-3">
          {LIFESTYLE_STRIPS.map((img) => (
            <div key={img.src} className="overflow-hidden rounded-2xl border border-gold/15">
              <OfficialAssetImage
                src={img.src}
                alt={img.alt}
                width={500}
                height={350}
                className="h-44 w-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="mb-16 overflow-x-auto">
          <div className="flex min-w-max items-center justify-center gap-2 px-4 md:gap-4">
            {STEPS.map((step, i) => (
              <div key={step.title} className="flex items-center gap-2">
                <div className="card-premium w-40 border-l-2 border-l-gold/40 p-4 text-center md:w-48">
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
            <div key={title} className="card-premium border-l-4 border-l-gold/30 p-6">
              <div className="mb-4 inline-flex rounded-full border border-gold/20 bg-cream p-3">
                <Icon size={24} className="text-gold" />
              </div>
              <h2 className="font-serif text-xl text-forest">{title}</h2>
              <p className="mt-2 text-sm text-foreground/70">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 card-premium border border-gold/25 p-8 text-center">
          <h2 className="font-serif text-2xl text-forest">Une vision circulaire</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-foreground/70">
            Horizon Farm et BOVINIA partagent une même vision : transformer les ressources locales
            en produits premium, réduire le gaspillage alimentaire, créer de la valeur économique
            au Sénégal et bâtir une marque prête pour l&apos;export international.
          </p>
          <Link href="/produits" className="btn-gold mt-6 inline-flex">
            Découvrir la gamme
          </Link>
        </div>
      </div>
      </div>
    </>
  );
}
