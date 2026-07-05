import { GoldOrnament } from "./GoldOrnament";

export function BrandManifesto() {
  return (
    <section className="relative overflow-hidden bg-forest py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 pattern-dots opacity-30" />
      <div className="container-bovinia relative px-4 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold">Powered by Bone Broth</p>
        <GoldOrnament className="my-6" light />
        <blockquote className="mx-auto max-w-3xl font-serif text-2xl leading-snug text-ivory md:text-3xl lg:text-4xl">
          Des rituels gourmands qui nourrissent de l&apos;intérieur — fabriqués au Sénégal, pensés
          pour le monde.
        </blockquote>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-ivory/60">
          BOVINIA transforme le savoir-faire traditionnel du Bone Broth en nutrition fonctionnelle
          premium, traçable et accessible.
        </p>
      </div>
    </section>
  );
}
