import { ShieldCheck, Leaf, MapPin, Sparkles } from "lucide-react";

const ITEMS = [
  { icon: MapPin, label: "Fabriqué au Sénégal" },
  { icon: Leaf, label: "Ingrédients naturels" },
  { icon: ShieldCheck, label: "Sans sel ni sucres ajoutés" },
  { icon: Sparkles, label: "Riche en collagène" },
];

export function TrustBar() {
  return (
    <div className="border-y border-gold/20 bg-gradient-to-r from-cream/80 via-ivory to-cream/80 backdrop-blur-sm">
      <div className="container-bovinia px-4 py-3.5 sm:px-6 lg:px-8">
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2">
          {ITEMS.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-2 text-xs font-medium tracking-wide text-forest/85 sm:text-sm"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/25 bg-white/80">
                <Icon size={14} className="shrink-0 text-gold" />
              </span>
              {label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
