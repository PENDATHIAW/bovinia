import Link from "next/link";
import { Logo } from "@/components/public/Logo";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { isSupabaseConfigured } from "@/lib/env";

export default function AdminLoginPage() {
  const demoMode = !isSupabaseConfigured();

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo size="lg" />
        </div>
        <div className="rounded-2xl border border-gold/20 bg-white p-8 shadow-sm">
          <h1 className="font-serif text-2xl text-forest">Connexion admin</h1>
          <p className="mt-1 text-sm text-foreground/60">Accédez au CMS BOVINIA</p>

          {demoMode && (
            <div className="mt-4 rounded-lg border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-forest">
              <p className="font-medium">Mode démo — sans base de données</p>
              <p className="mt-1 text-foreground/70">
                La connexion est désactivée. Consultez l&apos;interface admin directement :
              </p>
              <Link
                href="/admin"
                className="mt-2 inline-block font-medium underline underline-offset-2 hover:text-gold"
              >
                Ouvrir le dashboard →
              </Link>
            </div>
          )}

          {!demoMode && <AdminLoginForm />}
        </div>
      </div>
    </div>
  );
}
