import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/env";

export function DemoBanner() {
  if (isSupabaseConfigured()) return null;

  return (
    <div className="border-b border-forest/10 bg-forest px-4 py-2.5 text-center text-sm text-ivory/90">
      <span className="font-medium text-gold">Boutique BOVINIA</span>
      {" — "}
      Parcourez la gamme et passez commande. La confirmation s&apos;affiche directement sur le site.
      {" "}
      <Link href="/commander" className="underline underline-offset-2 hover:text-gold">
        Commander
      </Link>
    </div>
  );
}
