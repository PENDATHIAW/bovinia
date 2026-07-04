import { Star } from "lucide-react";
import type { Testimonial } from "@/types/database";

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials.length) return null;

  return (
    <section className="section-padding bg-cream">
      <div className="container-bovinia">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-gold">
            Témoignages
          </p>
          <h2 className="mt-2 font-serif text-3xl text-forest md:text-4xl">
            Ils ont adopté le rituel BOVINIA
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote key={t.id} className="card-premium p-6">
              <div className="mb-3 flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-gold text-gold" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-foreground/80">
                &ldquo;{t.text}&rdquo;
              </p>
              <footer className="mt-4 border-t border-gold/10 pt-4">
                <p className="font-medium text-forest">{t.name}</p>
                <p className="text-xs text-foreground/50">
                  {t.city}
                  {t.product_name && ` · ${t.product_name}`}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
