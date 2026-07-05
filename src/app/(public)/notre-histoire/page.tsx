import type { Metadata } from "next";
import Link from "next/link";
import { OfficialAssetImage } from "@/components/public/OfficialAssetImage";
import { ASSETS } from "@/lib/data/assetPaths";

export const metadata: Metadata = {
  title: "Notre histoire",
  description:
    "Découvrez l'histoire de BOVINIA, marque sénégalaise de nutrition fonctionnelle powered by Bone Broth.",
};

export default function NotreHistoirePage() {
  return (
    <div className="section-padding">
      <div className="container-bovinia max-w-4xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-gold">Storytelling</p>
          <h1 className="mt-2 font-serif text-4xl text-forest md:text-5xl">Notre histoire</h1>
        </div>

        <div className="mb-12 overflow-hidden rounded-3xl border border-gold/20">
          <OfficialAssetImage
            src={ASSETS.heroRange}
            alt="Gamme BOVINIA — 5 rituels nutritionnels"
            width={1200}
            height={700}
            className="w-full object-cover"
            priority
          />
        </div>

        <div className="prose-bovinia space-y-8">
          <section className="card-premium border-l-4 border-l-gold/50 p-8">
            <h2 className="font-serif text-2xl text-forest">La naissance du projet</h2>
            <p className="mt-4 leading-relaxed text-foreground/70">
              BOVINIA est née d&apos;une conviction simple : l&apos;Afrique de l&apos;Ouest possède
              des ressources nutritionnelles exceptionnelles, trop souvent sous-valorisées. Face au
              manque de produits naturels premium locaux et à la dépendance aux compléments importés,
              nous avons voulu créer une marque qui transforme le savoir-faire traditionnel en
              rituels modernes et gourmands.
            </p>
          </section>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-gold/15">
              <OfficialAssetImage
                src={ASSETS.lifestyle.wellnessOffice}
                alt="Rituel WELLNESS au bureau"
                width={600}
                height={450}
                className="h-48 w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-2xl border border-gold/15">
              <OfficialAssetImage
                src={ASSETS.lifestyle.bloom}
                alt="Rituel BLOOM"
                width={600}
                height={450}
                className="h-48 w-full object-cover"
              />
            </div>
          </div>

          <section className="card-premium border-l-4 border-l-gold/50 p-8">
            <h2 className="font-serif text-2xl text-forest">Horizon Farm, notre ancrage</h2>
            <p className="mt-4 leading-relaxed text-foreground/70">
              Horizon Farm est au cœur de notre chaîne de valeur. De l&apos;élevage à la sélection
              des matières premières, en passant par la transformation, ce partenariat nous permet
              de garantir qualité, traçabilité et valorisation des ressources locales — os, tendons,
              articulations et carcasses qui autrement seraient gaspillés.
            </p>
            <Link href="/horizon-farm" className="btn-secondary mt-4 inline-flex">
              Découvrir Horizon Farm
            </Link>
          </section>

          <section className="card-premium border-l-4 border-l-gold/50 p-8">
            <h2 className="font-serif text-2xl text-forest">Transformation locale</h2>
            <p className="mt-4 leading-relaxed text-foreground/70">
              Nous transformons le Bone Broth — bouillon traditionnel riche en collagène et acides
              aminés — en poudre premium, facile à intégrer au quotidien. Cinq rituels gourmands,
              fabriqués au Sénégal, avec des ingrédients naturels sélectionnés.
            </p>
          </section>

          <section className="card-premium border-l-4 border-l-gold/50 p-8">
            <h2 className="font-serif text-2xl text-forest">Ambition sénégalaise, vision internationale</h2>
            <p className="mt-4 leading-relaxed text-foreground/70">
              BOVINIA est une marque sénégalaise avec une ambition africaine et internationale.
              Nous visons les pharmacies, grandes surfaces et marchés d&apos;export, en portant
              fièrement une nutrition fonctionnelle premium, ancrée localement et pensée pour
              le monde entier.
            </p>
          </section>

          <section className="card-premium border border-gold/30 bg-cream/40 p-8">
            <h2 className="font-serif text-2xl text-forest">L&apos;écosystème : Horizon Farm, BOVINIA & Tallow & Go</h2>
            <blockquote className="mt-6 border-l-4 border-gold pl-6 font-serif text-lg italic text-forest/90">
              Des os naît BOVINIA. Du suif naît Tallow &amp; Go. De la ferme naît une industrie
              naturelle qui valorise l&apos;animal et les plantes avec intelligence.
            </blockquote>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-gold/15 bg-ivory p-4">
                <p className="font-serif text-forest">Horizon Farm</p>
                <p className="mt-1 text-xs text-foreground/60">Production, traçabilité, élevage</p>
              </div>
              <div className="rounded-xl border border-gold/40 bg-ivory p-4 ring-1 ring-gold/20">
                <p className="font-serif text-forest">BOVINIA</p>
                <p className="mt-1 text-xs text-foreground/60">Nutrition de l&apos;intérieur — Bone Broth</p>
              </div>
              <div className="rounded-xl border border-gold/15 bg-ivory p-4">
                <p className="font-serif text-forest">Tallow &amp; Go</p>
                <p className="mt-1 text-xs text-foreground/60">Soin du corps de l&apos;extérieur — suif purifié</p>
              </div>
            </div>
            <p className="mt-6 leading-relaxed text-foreground/70">
              Tallow &amp; Go prolongera la vision BOVINIA : valoriser chaque ressource de l&apos;élevage
              local. Là où BOVINIA nourrit de l&apos;intérieur avec le Bone Broth, Tallow &amp; Go
              accompagnera la peau avec des soins naturels à base de suif de bœuf purifié, huiles et
              beurres végétaux — une marque sœur, complémentaire et exportable.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
