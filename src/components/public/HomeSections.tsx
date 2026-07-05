import Link from "next/link";
import {
  Leaf,
  Droplets,
  Flame,
  Globe,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Heart,
  ShoppingBag,
  Check,
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
import { ASSETS } from "@/lib/data/assetPaths";
import { formatPrice } from "@/lib/utils";
import type { FAQ, Product, SiteSettings, Testimonial } from "@/types/database";

interface HomeSectionsProps {
  products: Product[];
  faqs: FAQ[];
  testimonials: Testimonial[];
  settings: SiteSettings;
}

const COMMITMENTS = [
  { icon: ShieldCheck, label: "Sans sel ajouté" },
  { icon: Heart, label: "Sans sucres ajoutés" },
  { icon: Sparkles, label: "Sans colorants artificiels" },
  { icon: Leaf, label: "Sans conservateurs artificiels" },
  { icon: Droplets, label: "Riche en collagène" },
  { icon: Globe, label: "Fabriqué au Sénégal" },
  { icon: Flame, label: "Ingrédients naturels sélectionnés" },
];

const CONSUMPTION = [
  { product: "WELLNESS", moment: "Le matin", methods: "Eau chaude, tiède ou fraîche · smoothie" },
  { product: "BLOOM", moment: "Matin ou après-midi", methods: "Chaud, lait ou smoothie" },
  { product: "PERIOD!", moment: "Matin ou soir", methods: "Eau chaude (tisane) ou fraîche" },
  { product: "PULSE", moment: "Matin ou avant l'effort", methods: "Chaud ou frais · sport" },
  { product: "CALM", moment: "Le soir", methods: "Eau chaude ou lait chaud" },
];

export function HomeSections({ products, faqs, testimonials, settings }: HomeSectionsProps) {
  return (
    <>
      {/* Hero */}
      <section className="gradient-hero pattern-dots relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-forest/10 blur-3xl" />
        </div>
        <div className="container-bovinia section-padding relative pb-12 md:pb-16">
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
                <Link href="/produits" className="btn-primary">
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

      <LifestyleMarquee />

      {/* Pourquoi BOVINIA */}
      <section className="section-padding">
        <div className="container-bovinia">
          <SectionHeader
            label="Notre mission"
            title="Pourquoi BOVINIA ?"
            description="Une réponse locale, premium et gourmande aux besoins nutritionnels du quotidien."
          />
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="card-premium border-t-4 border-t-forest/20 p-8 md:p-10">
              <h3 className="font-serif text-2xl text-forest">Le constat</h3>
              <ul className="mt-6 space-y-4">
                {[
                  "Peu de produits naturels premium en Afrique de l'Ouest",
                  "Sous-valorisation des os, pattes, tendons et carcasses",
                  "Besoin de boissons fonctionnelles naturelles et agréables",
                  "Dépendance aux compléments importés coûteux",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/70">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cream text-forest">
                      ·
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-premium border-t-4 border-t-gold p-8 md:p-10">
              <h3 className="font-serif text-2xl text-forest">La réponse BOVINIA</h3>
              <ul className="mt-6 space-y-4">
                {[
                  "Transformation locale et traçable",
                  "Bone Broth premium en poudre",
                  "Ingrédients naturels sélectionnés",
                  "5 rituels adaptés aux besoins du quotidien",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/70">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20">
                      <Check size={12} className="text-forest" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gamme */}
      <section className="section-padding surface-cream">
        <div className="container-bovinia">
          <SectionHeader
            label="Boutique"
            title="Notre gamme"
            description={`5 rituels disponibles — ${formatPrice(15000)} le pot · Bone Broth premium, fruits et plantes africains.`}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/quel-rituel" className="btn-secondary">
              Quel rituel pour moi ?
            </Link>
          </div>
        </div>
      </section>

      {/* Quel rituel */}
      <section className="section-padding">
        <div className="container-bovinia max-w-4xl">
          <RitualFinder products={products} />
        </div>
      </section>

      <BrandManifesto />

      {/* Bone Broth */}
      <section className="section-padding">
        <div className="container-bovinia">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="section-label">Notre base</p>
              <h2 className="mt-2 font-serif text-3xl text-forest md:text-4xl">
                Qu&apos;est-ce que le Bone Broth ?
              </h2>
              <p className="mt-6 leading-relaxed text-foreground/70">
                Le Bone Broth est un bouillon concentré puis déshydraté, issu d&apos;un mélange
                sélectionné de tissus conjonctifs de bœuf et de poulet — pattes, articulations,
                tendons et carcasses — naturellement riches en collagène, gélatine, acides aminés
                et protéines, sans sel ajouté.
              </p>
              <p className="mt-4 leading-relaxed text-foreground/70">
                BOVINIA transforme cette base en poudre premium, facile à utiliser et agréable à
                boire. L&apos;objectif : un rituel quotidien gourmand où le Bone Broth reste la base
                active, mais disparaît en bouche au profit des fruits et plantes africaines.
              </p>
              <Link href="/blog/quest-ce-que-le-bone-broth" className="btn-secondary mt-6 inline-flex text-sm">
                En savoir plus
                <ArrowRight size={14} />
              </Link>
            </div>
            <div className="gold-frame">
              <div className="gold-frame-inner">
                <OfficialAssetImage
                  src={ASSETS.heroRange}
                  alt="Gamme complète BOVINIA — 5 rituels nutritionnels"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Horizon Farm */}
      <section className="relative overflow-hidden bg-forest py-20 text-ivory md:py-28">
        <div className="pointer-events-none absolute inset-0 pattern-dots opacity-20" />
        <div className="container-bovinia relative">
          <SectionHeader
            label="Traçabilité"
            title="Chaîne de valeur Horizon Farm"
            description="De l'élevage à votre rituel quotidien — une chaîne maîtrisée et transparente."
            light
          />
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm md:gap-3 md:text-base">
            {["Horizon Farm", "Sélection", "Transformation", "BOVINIA", "Distribution", "Export"].map(
              (step, i, arr) => (
                <span key={step} className="flex items-center gap-2">
                  <span className="rounded-full border border-gold/40 bg-forest-light/30 px-4 py-2.5 font-medium backdrop-blur-sm">
                    {step}
                  </span>
                  {i < arr.length - 1 && (
                    <ArrowRight size={16} className="hidden text-gold sm:block" />
                  )}
                </span>
              )
            )}
          </div>
          <div className="mt-10 text-center">
            <Link href="/horizon-farm" className="btn-gold">
              Découvrir la chaîne de valeur
            </Link>
          </div>
        </div>
      </section>

      {/* Comment consommer */}
      <section className="section-padding">
        <div className="container-bovinia">
          <SectionHeader
            label="Mode d'emploi"
            title="Comment consommer ?"
            description="15–17 g par portion · ~30 portions par pot · 200 ml de liquide · tous les rituels se dégustent au chaud."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {CONSUMPTION.map((item, i) => (
              <div
                key={item.product}
                className="card-premium card-lift relative overflow-hidden p-5 pt-8"
              >
                <span className="absolute right-4 top-4 font-serif text-4xl text-gold/15">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-serif text-lg text-forest">{item.product}</p>
                <p className="mt-2 text-sm font-medium text-gold">{item.moment}</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/60">{item.methods}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagements */}
      <section className="section-padding surface-cream">
        <div className="container-bovinia">
          <SectionHeader title="Nos engagements" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {COMMITMENTS.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="card-premium flex items-center gap-4 p-5 transition-colors hover:bg-white"
              >
                <div className="rounded-full border border-gold/25 bg-cream p-3">
                  <Icon size={20} className="text-gold" />
                </div>
                <span className="text-sm font-medium text-forest">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DiscoveryPacks products={products} />

      {/* Commander */}
      <section id="commander" className="section-padding">
        <div className="container-bovinia">
          <div className="overflow-hidden rounded-[2rem] border border-gold/25 bg-gradient-to-br from-cream via-ivory to-cream shadow-lg">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 md:p-12 lg:p-14">
                <p className="section-label">Boutique</p>
                <h2 className="mt-2 font-serif text-3xl text-forest md:text-4xl">
                  Commandez vos rituels
                </h2>
                <p className="mt-4 leading-relaxed text-foreground/70">
                  Ajoutez au panier, renseignez votre livraison et confirmez — votre commande est
                  validée immédiatement sur le site.
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
                  <p className="mt-3 text-xs text-gold">
                    Livraison offerte dès {formatPrice(50000)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection testimonials={testimonials} />

      {/* FAQ */}
      <section className="section-padding surface-cream">
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
