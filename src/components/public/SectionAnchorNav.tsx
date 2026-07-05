"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface AnchorLink {
  id: string;
  label: string;
}

interface SectionAnchorNavProps {
  links: AnchorLink[];
  className?: string;
}

export function SectionAnchorNav({ links, className }: SectionAnchorNavProps) {
  const [active, setActive] = useState(links[0]?.id ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [links]);

  return (
    <nav
      className={cn(
        "sticky top-[4.5rem] z-30 border-b border-gold/15 bg-ivory/95 backdrop-blur-md",
        className
      )}
      aria-label="Navigation de page"
    >
      <div className="container-bovinia overflow-x-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex min-w-max gap-1 py-3">
          {links.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-medium transition-colors sm:text-sm",
                  active === id
                    ? "bg-forest text-ivory"
                    : "text-forest/70 hover:bg-cream hover:text-forest"
                )}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
