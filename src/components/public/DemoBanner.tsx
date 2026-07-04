import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/env";

export function DemoBanner() {
  if (isSupabaseConfigured()) return null;

  return (
    <div className="border-b border-gold/30 bg-gold/10 px-4 py-2.5 text-center text-sm text-forest">
      <span className="font-medium">Mode démo</span>
      {" — "}
      Site consultable sans base de données. Les formulaires ne sont pas enregistrés.
      {" "}
      <Link href="/admin" className="underline underline-offset-2 hover:text-gold">
        Aperçu admin
      </Link>
    </div>
  );
}
