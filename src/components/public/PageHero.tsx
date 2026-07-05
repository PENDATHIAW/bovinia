import { GoldOrnament } from "./GoldOrnament";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  label: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export function PageHero({ label, title, description, children, className }: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-gold/15 bg-cream/40 pattern-dots",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 top-0 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-forest/5 blur-3xl" />
      </div>
      <div className="container-bovinia relative px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-label">{label}</p>
          <h1 className="mt-3 font-serif text-4xl text-forest md:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
            {title}
          </h1>
          <GoldOrnament className="my-6" />
          {description && (
            <p className="text-lg leading-relaxed text-foreground/70">{description}</p>
          )}
          {children && <div className="mt-8 flex flex-wrap justify-center gap-4">{children}</div>}
        </div>
      </div>
    </section>
  );
}
