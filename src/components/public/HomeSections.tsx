import Link from "next/link";
import Image from "next/image";
import {
  Leaf,
  Droplets,
  Flame,
  Globe,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Heart,
} from "lucide-react";
import { ProductCard } from "./ProductCard";
import { FAQAccordion } from "./FAQAccordion";
import { TestimonialsSection } from "./TestimonialsSection";
import { PreorderForm } from "./PreorderForm";
import { DiscoveryPacks } from "./DiscoveryPacks";
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
  { product: "WELLNESS", methods: "Eau fraîche, eau tiède ou smoothie léger" },
  { product: "BLOOM", methods: "Lait, lait végétal, smoothie ou milkshake" },
  { product: "PERIOD!", methods: "Eau chaude ou fraîche" },
  { product: "PULSE", methods: "Eau fraîche, smoothie, avant/après sport" },
  { product: "CALM", methods: "Eau chaude, lait ou lait végétal le soir" },
];

export function HomeSections({ products, faqs, testimonials, settings }: HomeSectionsProps) {
  return (
    <>
      {/* Hero */}
      <section className="gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-gold" />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-forest" />
        </div>
        <div className="container-bovinia section-padding relative">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="animate-fade-in-up">
              <p className="text-sm font-medium uppercase tracking-widest text-gold">
                Nutrition fonctionnelle · Sénégal
              </p>
              <h1 className="mt-4 font-serif text-4xl leading-tight text-forest md:text-5xl lg:text-6xl">
                {settings.hero_title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-foreground/70">
                {settings.hero_subtitle}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/produits" className="btn-primary">
                  {settings.hero_cta_primary}
                  <ArrowRight size={16} />
                </Link>
                <Link href="/precommande" className="btn-secondary">
                  {settings.hero_cta_secondary}
                </Link>
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="flex flex-wrap items-end justify-center gap-2 sm:gap-3">
                {products.map((p) => (
                  <Link
                    key={p.id}
                    href={`/produits/${p.slug}`}
                    className="transition-transform hover:-translate-y-2"
                  >
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt={p.name}
                        width={100}
                        height={130}
                        className="h-24 w-auto object-contain drop-shadow-lg sm:h-32"
                      />
                    ) : null}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi BOVINIA */}
      <section className="section-padding">
        <div className="container-bovinia">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-gold">Notre mission</p>
            <h2 className="mt-2 font-serif text-3xl text-forest md:text-4xl">Pourquoi BOVINIA ?</h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="card-premium p-8">
              <h3 className="font-serif text-xl text-forest">Le constat</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/70">
                <li>• Peu de produits naturels premium en Afrique de l&apos;Ouest</li>
                <li>• Sous-valorisation des os, pattes, tendons et carcasses</li>
                <li>• Besoin de boissons fonctionnelles naturelles et agréables</li>
                <li>• Dépendance aux compléments importés coûteux</li>
              </ul>
            </div>
            <div className="card-premium border-forest/20 p-8">
              <h3 className="font-serif text-xl text-forest">La réponse BOVINIA</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/70">
                <li>• Transformation locale et traçable</li>
                <li>• Bone Broth premium en poudre</li>
                <li>• Ingrédients naturels sélectionnés</li>
                <li>• 5 rituels adaptés aux besoins du quotidien</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gamme */}
      <section className="section-padding bg-cream">
        <div className="container-bovinia">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-gold">5 rituels</p>
            <h2 className="mt-2 font-serif text-3xl text-forest md:text-4xl">Notre gamme</h2>
            <p className="mt-4 text-foreground/70">
              5 formules uniques pour accompagner votre corps au quotidien.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Bone Broth */}
      <section className="section-padding">
        <div className="container-bovinia">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-gold">Notre base</p>
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
            </div>
            <div className="card-premium flex items-center justify-center p-12">
              <div className="text-center">
                <Droplets size={64} className="mx-auto text-gold" />
                <p className="mt-4 font-serif text-2xl text-forest">Collagène naturel</p>
                <p className="mt-2 text-sm text-foreground/60">Acides aminés · Gélatine · Minéraux</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Horizon Farm */}
      <section className="section-padding bg-forest text-ivory">
        <div className="container-bovinia">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-gold">Traçabilité</p>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl">Chaîne de valeur Horizon Farm</h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm md:gap-4 md:text-base">
            {["Horizon Farm", "Sélection", "Transformation", "BOVINIA", "Distribution", "Export"].map(
              (step, i, arr) => (
                <span key={step} className="flex items-center gap-2">
                  <span className="rounded-full border border-gold/40 px-4 py-2 font-medium">{step}</span>
                  {i < arr.length - 1 && <ArrowRight size={16} className="text-gold hidden sm:block" />}
                </span>
              )
            )}
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-ivory/70">
            Horizon Farm permet à BOVINIA de mieux maîtriser la qualité, la traçabilité et la
            valorisation des ressources animales et agricoles locales.
          </p>
          <div className="mt-8 text-center">
            <Link href="/horizon-farm" className="btn-gold">
              Découvrir la chaîne de valeur
            </Link>
          </div>
        </div>
      </section>

      {/* Comment consommer */}
      <section className="section-padding">
        <div className="container-bovinia">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-gold">Mode d&apos;emploi</p>
            <h2 className="mt-2 font-serif text-3xl text-forest md:text-4xl">Comment consommer ?</h2>
            <p className="mt-4 text-foreground/70">
              15–17 g par portion · ~30 portions par pot · 200 ml de liquide · Mélangez et savourez
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CONSUMPTION.map((item) => (
              <div key={item.product} className="card-premium p-5">
                <p className="font-serif text-lg text-forest">{item.product}</p>
                <p className="mt-1 text-sm text-foreground/60">{item.methods}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagements */}
      <section className="section-padding bg-cream">
        <div className="container-bovinia">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="font-serif text-3xl text-forest md:text-4xl">Nos engagements</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COMMITMENTS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-4 card-premium p-5">
                <div className="rounded-full bg-forest/10 p-3">
                  <Icon size={20} className="text-forest" />
                </div>
                <span className="text-sm font-medium text-forest">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DiscoveryPacks products={products} />

      {/* Précommande */}
      <section id="precommande" className="section-padding">
        <div className="container-bovinia">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-gold">Lancement</p>
              <h2 className="mt-2 font-serif text-3xl text-forest md:text-4xl">
                Soyez parmi les premiers
              </h2>
              <p className="mt-4 leading-relaxed text-foreground/70">
                Inscrivez-vous à notre waitlist pour être informé(e) du lancement et bénéficier
                d&apos;un accès prioritaire aux 5 rituels BOVINIA.
              </p>
            </div>
            <div className="card-premium p-6 md:p-8">
              <PreorderForm products={products} compact />
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection testimonials={testimonials} />

      {/* FAQ */}
      <section className="section-padding">
        <div className="container-bovinia">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="font-serif text-3xl text-forest md:text-4xl">Questions fréquentes</h2>
          </div>
          <div className="mx-auto max-w-3xl">
            <FAQAccordion faqs={faqs} />
          </div>
        </div>
      </section>
    </>
  );
}
