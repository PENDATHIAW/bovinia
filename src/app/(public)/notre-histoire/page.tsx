import type { Metadata } from "next";
import Link from "next/link";

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

        <div className="prose-bovinia space-y-8">
          <section className="card-premium p-8">
            <h2 className="font-serif text-2xl text-forest">La naissance du projet</h2>
            <p className="mt-4 leading-relaxed text-foreground/70">
              BOVINIA est née d&apos;une conviction simple : l&apos;Afrique de l&apos;Ouest possède
              des ressources nutritionnelles exceptionnelles, trop souvent sous-valorisées. Face au
              manque de produits naturels premium locaux et à la dépendance aux compléments importés,
              nous avons voulu créer une marque qui transforme le savoir-faire traditionnel en
              rituels modernes et gourmands.
            </p>
          </section>

          <section className="card-premium p-8">
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

          <section className="card-premium p-8">
            <h2 className="font-serif text-2xl text-forest">Transformation locale</h2>
            <p className="mt-4 leading-relaxed text-foreground/70">
              Nous transformons le Bone Broth — bouillon traditionnel riche en collagène et acides
              aminés — en poudre premium, facile à intégrer au quotidien. Cinq rituels gourmands,
              fabriqués au Sénégal, avec des ingrédients naturels sélectionnés.
            </p>
          </section>

          <section className="card-premium p-8">
            <h2 className="font-serif text-2xl text-forest">Ambition sénégalaise, vision internationale</h2>
            <p className="mt-4 leading-relaxed text-foreground/70">
              BOVINIA est une marque sénégalaise avec une ambition africaine et internationale.
              Nous visons les pharmacies, grandes surfaces et marchés d&apos;export, en portant
              fièrement une nutrition fonctionnelle premium, ancrée localement et pensée pour
              le monde entier.
            </p>
          </section>

          <section className="card-premium border-gold/30 p-8">
            <h2 className="font-serif text-2xl text-forest">Et demain : Tallow & Go</h2>
            <p className="mt-4 leading-relaxed text-foreground/70">
              L&apos;écosystème BOVINIA s&apos;étendra prochainement avec Tallow & Go, une extension
              naturelle de notre vision de valorisation des ressources animales et agricoles locales.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
