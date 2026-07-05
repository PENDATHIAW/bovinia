"use client";

import { Flame, Snowflake } from "lucide-react";
import {
  CONSUMPTION_BY_SLUG,
  HOT_CONSUMPTION_NOTE,
  RATING_LABELS,
  RATING_STARS,
  UNIVERSAL_PREPARATION,
  type ConsumptionOption,
} from "@/lib/data/consumption";

interface ProductConsumptionGuideProps {
  slug: string;
}

function StarRow({ count }: { count: number }) {
  return (
    <span className="inline-flex gap-0.5 text-gold" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < count ? "opacity-100" : "opacity-20"}>
          ★
        </span>
      ))}
    </span>
  );
}

export function ProductConsumptionGuide({ slug }: ProductConsumptionGuideProps) {
  const options: ConsumptionOption[] =
    CONSUMPTION_BY_SLUG[slug] ?? CONSUMPTION_BY_SLUG.wellness;

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-gold/30 bg-gold/10 p-5">
        <div className="flex items-start gap-3">
          <Flame className="mt-0.5 shrink-0 text-forest" size={22} />
          <div>
            <h2 className="font-serif text-lg text-forest">Consommation au chaud</h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground/75">
              {HOT_CONSUMPTION_NOTE}
            </p>
          </div>
        </div>
      </div>

      <div className="card-premium p-6">
        <h2 className="font-serif text-xl text-forest">Comment le déguster ?</h2>
        <p className="mt-1 text-sm text-foreground/60">
          {UNIVERSAL_PREPARATION.portion} · {UNIVERSAL_PREPARATION.liquid} ·{" "}
          {UNIVERSAL_PREPARATION.portionsPerPot}
        </p>

        <ol className="mt-4 space-y-2 border-b border-forest/10 pb-6 text-sm text-foreground/75">
          {UNIVERSAL_PREPARATION.steps.map((step, i) => (
            <li key={step} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest text-xs font-medium text-ivory">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>

        <div className="mt-6 space-y-3">
          {options.map((opt) => (
            <div
              key={opt.method}
              className="flex items-center justify-between gap-4 rounded-xl bg-cream/80 px-4 py-3"
            >
              <span className="flex items-center gap-2 text-sm font-medium text-forest">
                {opt.method.toLowerCase().includes("chaud") ||
                opt.method.toLowerCase().includes("chaude") ? (
                  <Flame size={16} className="text-gold" />
                ) : opt.method.toLowerCase().includes("frais") ? (
                  <Snowflake size={16} className="text-forest/50" />
                ) : null}
                {opt.method}
              </span>
              <div className="flex items-center gap-2 text-right">
                <StarRow count={RATING_STARS[opt.rating]} />
                <span className="text-xs text-foreground/50">{RATING_LABELS[opt.rating]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
