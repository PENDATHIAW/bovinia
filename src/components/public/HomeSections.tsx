import Link from "next/link";
import {
  Leaf,
  ArrowRight,
  Heart,
  ShoppingBag,
  Sparkles,
  MapPin,
} from "lucide-react";
import { ProductCard } from "./ProductCard";
import { FAQAccordion } from "./FAQAccordion";
import { TestimonialsSection } from "./TestimonialsSection";
import { DiscoveryPacks } from "./DiscoveryPacks";
import { HeroShowcase } from "./HeroShowcase";
import { RitualFinder } from "./RitualFinder";
import { OfficialAssetImage } from "./OfficialAssetImage";
import { SectionHeader } from "./SectionHeader";
import { LifestyleMarquee } from "./LifestyleMarquee";
import { BrandManifesto } from "./BrandManifesto";
import { BoneBrothEducation } from "./BoneBrothEducation";
import { SectionAnchorNav } from "./SectionAnchorNav";
import { ConversionStrip } from "./ConversionStrip";
import { ASSETS } from "@/lib/data/assetPaths";
import { formatPrice } from "@/lib/utils";
import type { FAQ, Product, SiteSettings, Testimonial } from "@/types/database";

const HOME_ANCHORS = [
  { id: "gamme", label: "Gamme" },
  { id: "packs", label: "Packs" },
  { id: "quiz", label: "Quel rituel ?" },
  { id: "bone-broth", label: "Bone Broth" },
  { id: "commander", label: "Commander" },
  { id: "temoignages", label: "Avis" },
  { id: "faq", label: "FAQ" },
];

const ESSENTIALS = [
  { icon: Sparkles, title: "Bone Broth premium", desc: "Base active riche en collagène naturel." },
  { icon: MapPin, title: "Fabriqué au Sénégal", desc: "Transformation locale et traçable." },
  { icon: Heart, title: "5 rituels ciblés", desc: "Une formule pour chaque moment de vie." },
  { icon: Leaf, title: "Sans compromis", desc: "Sans sel, sucres ni colorants ajoutés." },
];

interface HomeSectionsProps {
  products: Product[];
  faqs: FAQ[];
  testimonials: Testimonial[];
  settings: SiteSettings;
  marqueeImages?: { src: string; alt: string }[];
}

export function HomeSections({
  products,
  faqs,
  testimonials,
  settings,
  marqueeImages = [],
}: HomeSectionsProps) {
  return (
    <>
      {/* Hero */}
      <section className="gradient-hero pattern-dots relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-forest/10 blur-3xl" />
        </div>
        <div className="container-bovinia section-padding relative pb-10 md:pb-14">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="animate-fade-in-up">
              <p className="section-label">Nutrition fonctionnelle · Sénégal</p>
              <h1 className="mt-4 font-serif text-4xl leading-[1.08] text-forest md:text-5xl lg:text-[3.35rem]">
                {settings.hero_title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-foreground/70">
                {settings.hero_subtitle}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  { label: "15 000 FCFA", sub: "le pot" },
                  { label: "500 g", sub: "~30 portions" },
                  { label: "5 rituels", sub: "disponibles" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-gold/30 bg-white/75 px-5 py-3 shadow-sm backdrop-blur-sm"
                  >
                    <p className="font-serif text-lg text-forest">{stat.label}</p>
                    <p className="text-xs text-foreground/50">{stat.sub}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="#gamme" className="btn-primary">
                  {settings.hero_cta_primary}
                  <ArrowRight size={16} />
                </Link>
                <Link href="/commander" className="btn-gold">
                  <ShoppingBag size={16} />
                  {settings.hero_cta_secondary}
                </Link>
              </div>
            </div>

            <HeroShowcase products={products} />
          </div>
        </div>
      </section>

      <LifestyleMarquee extraItems={marqueeImages} />
      <ConversionStrip />
      <SectionAnchorNav links={HOME_ANCHORS} />

      {/* Essentiels — lecture rapide */}
      <section className="border-b border-gold/10 py-10">
        <div className="container-bovinia">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ESSENTIALS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-3 rounded-2xl border border-gold/15 bg-ivory/80 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-cream">
                  <Icon size={18} className="text-gold" />
                </div>
                <div>
                  <p className="text-sm font-medium text-forest">{title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-foreground/55">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gamme — priorité n°1 */}
      <section id="gamme" className="section-padding surface-cream scroll-mt-36">
        <div className="container-bovinia">
          <SectionHeader
            label="Boutique"
            title="Choisissez votre rituel"
            description={`5 formules — ${formatPrice(15000)} le pot · Ajoutez au panier en un clic.`}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/comparateur" className="btn-secondary text-sm">
              Comparer les rituels
            </Link>
            <Link href="/preparation" className="btn-secondary text-sm">
              Comment préparer
            </Link>
            <Link href="/quel-rituel" className="btn-secondary text-sm">
              Quel rituel pour moi ?
            </Link>
          </div>
        </div>
      </section>

      {/* Packs — priorité n°2 */}
      <div id="packs" className="scroll-mt-36">
        <DiscoveryPacks products={products} />
      </div>

      {/* Quiz */}
      <section id="quiz" className="section-padding scroll-mt-36">
        <div className="container-bovinia max-w-4xl">
          <RitualFinder products={products} />
        </div>
      </section>

      {/* Commander */}
      <section id="commander" className="section-padding scroll-mt-36">
        <div className="container-bovinia">
          <div className="overflow-hidden rounded-[2rem] border border-gold/25 bg-gradient-to-br from-cream via-ivory to-cream shadow-lg">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 md:p-12 lg:p-14">
                <p className="section-label">Boutique</p>
                <h2 className="mt-2 font-serif text-3xl text-forest md:text-4xl">
                  Prêt à commander ?
                </h2>
                <p className="mt-4 leading-relaxed text-foreground/70">
                  Panier persistant, livraison au Sénégal, paiement Wave, Orange Money ou à la
                  livraison.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/commander" className="btn-gold">
                    Commander maintenant
                    <ArrowRight size={16} />
                  </Link>
                  <Link href="/livraison" className="btn-secondary">
                    Infos livraison
                  </Link>
                </div>
              </div>
              <div className="relative hidden min-h-[280px] lg:block">
                <OfficialAssetImage
                  src={ASSETS.lifestyle.wellnessOffice}
                  alt="Rituel BOVINIA au quotidien"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/20 to-transparent" />
                <div className="absolute bottom-8 right-8 rounded-2xl border border-gold/30 bg-ivory/95 p-6 text-center shadow-xl backdrop-blur-sm">
                  <p className="font-serif text-3xl text-forest">{formatPrice(15000)}</p>
                  <p className="mt-1 text-sm text-foreground/60">le pot · 500 g</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BrandManifesto />

      {/* Bone Broth — éducation */}
      <section id="bone-broth" className="section-padding scroll-mt-36">
        <div className="container-bovinia">
          <BoneBrothEducation />
        </div>
      </section>

      <div id="temoignages" className="scroll-mt-36">
        <TestimonialsSection testimonials={testimonials} showDisclaimer />
      </div>

      <section id="faq" className="section-padding surface-cream scroll-mt-36">
        <div className="container-bovinia">
          <SectionHeader title="Questions fréquentes" />
          <div className="mx-auto max-w-3xl">
            <FAQAccordion faqs={faqs} />
          </div>
        </div>
      </section>
    </>
  );
}
