import { Star, BadgeCheck } from "lucide-react";
import type { Testimonial } from "@/types/database";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

interface ProductTestimonialsProps {
  productName: string;
  testimonials: Testimonial[];
  showDisclaimer?: boolean;
}

export function ProductTestimonials({
  productName,
  testimonials,
  showDisclaimer = true,
}: ProductTestimonialsProps) {
  if (!testimonials.length) return null;

  return (
    <section id="avis" className="mt-16 scroll-mt-36 border-t border-gold/15 pt-12">
      <div className="mb-8">
        <p className="section-label">Témoignages</p>
        <h2 className="section-title">Ce qu&apos;en disent nos clientes et clients</h2>
        <p className="mt-3 max-w-2xl text-sm text-foreground/60">
          Retours sur {productName} — routines réelles, goûts et moments de consommation.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <blockquote
            key={t.id}
            className="card-premium flex flex-col border-t-2 border-t-gold/40 p-5"
          >
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/25 bg-cream font-serif text-xs text-forest">
                {initials(t.name)}
              </div>
              <div>
                <p className="text-sm font-medium text-forest">{t.name}</p>
                <p className="flex items-center gap-1 text-[10px] uppercase tracking-wide text-gold">
                  <BadgeCheck size={11} />
                  {t.city}
                </p>
              </div>
            </div>
            <div className="mb-2 flex gap-0.5">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={13} className="fill-gold text-gold" />
              ))}
            </div>
            <p className="flex-1 text-sm leading-relaxed text-foreground/80">
              &ldquo;{t.text}&rdquo;
            </p>
          </blockquote>
        ))}
      </div>

      {showDisclaimer && (
        <p className="mt-6 text-center text-xs text-foreground/45">
          Témoignages illustratifs en attendant vos retours authentiques — remplaceables à tout
          moment depuis l&apos;administration.
        </p>
      )}
    </section>
  );
}
