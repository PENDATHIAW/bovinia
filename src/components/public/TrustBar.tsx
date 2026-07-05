import { ShieldCheck, Leaf, MapPin, Sparkles } from "lucide-react";

const ITEMS = [
  { icon: MapPin, label: "Fabriqué au Sénégal" },
  { icon: Leaf, label: "Ingrédients naturels" },
  { icon: ShieldCheck, label: "Sans sel ni sucres ajoutés" },
  { icon: Sparkles, label: "Riche en collagène" },
];

export function TrustBar() {
  return (
    <div className="border-y border-gold/15 bg-white/60 backdrop-blur-sm">
      <div className="container-bovinia px-4 py-4 sm:px-6 lg:px-8">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {ITEMS.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2 text-xs font-medium text-forest/80 sm:text-sm">
              <Icon size={16} className="shrink-0 text-gold" />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
