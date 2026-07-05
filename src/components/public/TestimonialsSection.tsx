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

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  showDisclaimer?: boolean;
}

export function TestimonialsSection({
  testimonials,
  showDisclaimer = false,
}: TestimonialsSectionProps) {
  if (!testimonials.length) return null;

  return (
    <section className="section-padding bg-cream pattern-dots">
      <div className="container-bovinia">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="section-label">Témoignages</p>
          <h2 className="section-title">Ils ont adopté le rituel BOVINIA</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote
              key={t.id}
              className="card-premium card-lift border-t-2 border-t-gold/40 p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-cream font-serif text-sm text-forest">
                  {initials(t.name)}
                </div>
                <div>
                  <p className="font-medium text-forest">{t.name}</p>
                  <p className="flex items-center gap-1 text-[10px] uppercase tracking-wide text-gold">
                    <BadgeCheck size={12} />
                    Acheteur vérifié
                  </p>
                </div>
              </div>
              <div className="mb-3 flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-gold text-gold" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-foreground/80">&ldquo;{t.text}&rdquo;</p>
              <footer className="mt-4 border-t border-gold/10 pt-4">
                <p className="text-xs text-foreground/50">
                  {t.city}
                  {t.product_name && ` · ${t.product_name}`}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>
        {showDisclaimer && (
          <p className="mt-8 text-center text-xs text-foreground/45">
            Sélection d&apos;avis illustratifs par rituel — remplaçables par vos retours authentiques.
          </p>
        )}
      </div>
    </section>
  );
}
