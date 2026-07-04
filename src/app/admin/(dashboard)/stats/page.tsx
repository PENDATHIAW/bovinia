import { getAnalyticsSummary, getAdminStats } from "@/lib/data/admin-queries";

export default async function AdminStatsPage() {
  const [analytics, stats] = await Promise.all([
    getAnalyticsSummary(),
    getAdminStats(),
  ]);

  const conversionRate =
    analytics.pageViews > 0
      ? ((stats.preorders / analytics.pageViews) * 100).toFixed(1)
      : "0";

  return (
    <div>
      <h1 className="font-serif text-3xl text-forest">Statistiques</h1>
      <p className="mt-1 text-sm text-gray-500">Analyse du trafic et conversions</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <p className="text-sm text-gray-500">Vues pages</p>
          <p className="mt-1 text-3xl font-bold text-forest">{analytics.pageViews}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <p className="text-sm text-gray-500">Clics WhatsApp</p>
          <p className="mt-1 text-3xl font-bold text-forest">{analytics.whatsappClicks}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <p className="text-sm text-gray-500">Vues produits</p>
          <p className="mt-1 text-3xl font-bold text-forest">{analytics.productViews}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <p className="text-sm text-gray-500">Taux conversion</p>
          <p className="mt-1 text-3xl font-bold text-forest">{conversionRate}%</p>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="font-serif text-lg text-forest">Précommandes par produit</h2>
        {stats.topProducts.length === 0 ? (
          <p className="mt-4 text-sm text-gray-500">Pas encore de données.</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {stats.topProducts.map((p) => (
              <li key={p.name} className="flex justify-between text-sm">
                <span>{p.name}</span>
                <span className="font-medium">{p.count} précommande(s)</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
