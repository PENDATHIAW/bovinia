import Link from "next/link";
import {
  Flame,
  Globe2,
  Leaf,
  Sparkles,
  TrendingUp,
  Heart,
} from "lucide-react";
import { BONE_BROTH_INTRO } from "@/lib/data/boneBrothCopy";
import { ASSETS } from "@/lib/data/assetPaths";
import { OfficialAssetImage } from "./OfficialAssetImage";

const BENEFITS = [
  {
    icon: Sparkles,
    title: "Collagène & gélatine naturels",
    desc: "Issus des tissus conjonctifs (os, tendons, articulations) longuement mijotés — soutien des tissus du corps.",
  },
  {
    icon: Leaf,
    title: "Acides aminés & minéraux",
    desc: "Glycine, proline, glutamine… des nutriments que l'organisme utilise au quotidien pour se reconstruire.",
  },
  {
    icon: Heart,
    title: "Confort digestif",
    desc: "Traditionnellement consommé chaud, le bouillon d'os accompagne une alimentation équilibrée et réconfortante.",
  },
  {
    icon: Flame,
    title: "Valorisation locale",
    desc: "Au Sénégal, nous transformons des ressources d'élevage (os, carcasses) autrement sous-utilisées en nutrition premium.",
  },
];

export function BoneBrothEducation({
  compact = false,
  skipIntro = false,
}: {
  compact?: boolean;
  skipIntro?: boolean;
}) {
  return (
    <div className={compact ? "space-y-10" : "space-y-16"}>
      {!skipIntro && (
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="gold-frame order-2 lg:order-1">
            <div className="gold-frame-inner">
              <OfficialAssetImage
                src={ASSETS.heroRange}
                alt="Gamme BOVINIA au Bone Broth"
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="section-label">{BONE_BROTH_INTRO.label}</p>
            <h2 className="mt-2 font-serif text-3xl text-forest md:text-4xl">
              {BONE_BROTH_INTRO.title}
            </h2>
            {BONE_BROTH_INTRO.paragraphs.map((paragraph, i) => (
              <p key={i} className="mt-4 leading-relaxed text-foreground/70">
                {i === 0 ? (
                  <>
                    Le <strong className="font-medium text-forest">Bone Broth</strong> — le bouillon
                    d&apos;os — est une préparation traditionnelle obtenue en faisant mijoter
                    longuement des os, tendons et articulations de bœuf. Cette cuisson lente extrait
                    naturellement le{" "}
                    <strong className="font-medium text-forest">collagène</strong>, la{" "}
                    <strong className="font-medium text-forest">gélatine</strong>, des{" "}
                    <strong className="font-medium text-forest">acides aminés</strong> et des{" "}
                    <strong className="font-medium text-forest">minéraux</strong>.
                  </>
                ) : (
                  <>
                    <strong className="font-medium text-forest">
                      Au Sénégal, peu de gens connaissent encore le Bone Broth
                    </strong>{" "}
                    sous cette forme moderne et premium. BOVINIA est pionnière : nous le transformons
                    en poudre pratique, puis l&apos;associons à des{" "}
                    <strong className="font-medium text-forest">fruits et plantes africains</strong>{" "}
                    (baobab, kinkeliba, bissap, gingembre…) pour des rituels gourmands, agréables à
                    boire chaud ou frais.
                  </>
                )}
              </p>
            ))}
          </div>
        </div>
      )}

      {skipIntro && (
        <div className="text-center">
          <p className="section-label">{BONE_BROTH_INTRO.label}</p>
          <h2 className="mt-2 font-serif text-3xl text-forest md:text-4xl">
            {BONE_BROTH_INTRO.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-foreground/70">
            Découvrez pourquoi le bouillon d&apos;os est au cœur de chaque rituel BOVINIA — et
            pourquoi il fait sensation dans le monde entier.
          </p>
        </div>
      )}

      {/* TikTok & engouement */}
      <div className="card-premium border-l-4 border-l-gold/60 p-8 md:p-10">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
            <TrendingUp size={22} />
          </div>
          <div>
            <h3 className="font-serif text-2xl text-forest">
              L&apos;engouement mondial — et pourquoi nous l&apos;avons proposé
            </h3>
            <p className="mt-4 leading-relaxed text-foreground/70">
              Sur <strong className="font-medium text-forest">TikTok</strong>, Instagram et les
              réseaux bien-être, le Bone Broth est devenu un phénomène : des millions de personnes
              partagent leur rituel matinal, leurs recettes, leurs sensations de légèreté et de
              vitalité. Aux États-Unis et en Europe, c&apos;est déjà un incontournable de la
              nutrition fonctionnelle.
            </p>
            <p className="mt-4 leading-relaxed text-foreground/70">
              Nous avons vu cet engouement et nous nous sommes demandé :{" "}
              <em>pourquoi le Sénégal n&apos;aurait-il pas sa propre version, fabriquée localement,
              avec nos fruits et nos plantes ?</em> BOVINIA est née de cette conviction — apporter
              au pays une alternative naturelle et premium aux compléments alimentaires importés,
              tout en valorisant l&apos;élevage local via{" "}
              <Link href="/horizon-farm" className="font-medium text-gold hover:underline">
                Horizon Farm
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Bienfaits */}
      <div>
        <p className="section-label text-center">Bienfaits</p>
        <h3 className="mt-2 text-center font-serif text-2xl text-forest md:text-3xl">
          Ce que le Bone Broth apporte à l&apos;organisme
        </h3>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-foreground/60">
          Aliment traditionnel — pas un médicament. Il accompagne une alimentation variée et un mode
          de vie équilibré.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {BENEFITS.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-gold/20 bg-ivory p-6 shadow-sm"
            >
              <Icon size={22} className="text-gold" />
              <h4 className="mt-3 font-serif text-lg text-forest">{title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-foreground/65">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Fruits + plantes */}
      <div className="rounded-[2rem] border border-gold/25 bg-gradient-to-br from-cream/80 to-ivory p-8 md:p-12">
        <div className="flex items-start gap-4">
          <Globe2 size={28} className="shrink-0 text-gold" />
          <div>
            <h3 className="font-serif text-2xl text-forest">
              Bone Broth + fruits &amp; plantes africains
            </h3>
            <p className="mt-4 leading-relaxed text-foreground/70">
              Chez BOVINIA, le Bone Broth n&apos;est jamais seul : chaque rituel marie cette base
              riche à des ingrédients que vous connaissez —{" "}
              <strong className="font-medium text-forest">ananas, mangue, bissap, baobab,
              kinkeliba, gingembre, camomille, verveine, cannelle, vanille…</strong> Les fruits
              dominent en bouche : c&apos;est gourmand, familier, et facile à adopter au quotidien.
            </p>
            <p className="mt-4 leading-relaxed text-foreground/70">
              Cinq formules ciblent des besoins différents — énergie matinale, maternité, confort du
              cycle, sport, sommeil — mais une seule base : le Bone Broth premium fabriqué au
              Sénégal.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/blog/quest-ce-que-le-bone-broth" className="btn-secondary text-sm">
                Lire le guide complet
              </Link>
              <Link href="/comparateur" className="btn-primary text-sm">
                Comparer les rituels
              </Link>
              <Link href="/quel-rituel" className="text-sm font-medium text-gold hover:underline">
                Quiz : quel rituel pour moi ?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
