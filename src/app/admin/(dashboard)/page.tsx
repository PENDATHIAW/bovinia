import { getAdminStats } from "@/lib/data/admin-queries";
import { formatPrice } from "@/lib/utils";
import { ClipboardList, Mail, Package, TrendingUp, Users, FileText } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const stats = await getAdminStats();

  const cards = [
    { label: "Commandes clients", value: stats.preorders, icon: ClipboardList, href: "/admin/preorders", color: "text-blue-600" },
    { label: "Messages", value: stats.contacts, icon: Mail, href: "/admin/contacts", color: "text-green-600" },
    { label: "Newsletter", value: stats.newsletter, icon: Users, href: "/admin/newsletter", color: "text-purple-600" },
    { label: "Produits", value: stats.products, icon: Package, href: "/admin/products", color: "text-forest" },
    { label: "Articles", value: stats.blogPosts, icon: FileText, href: "/admin/blog", color: "text-orange-600" },
    { label: "CA estimé", value: formatPrice(stats.revenue), icon: TrendingUp, href: "/admin/orders", color: "text-gold" },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl text-forest">Dashboard</h1>
      <p className="mt-1 text-sm text-gray-500">Vue d&apos;ensemble BOVINIA</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ label, value, icon: Icon, href, color }) => (
          <Link key={label} href={href} className="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
              </div>
              <Icon className={color} size={28} />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="font-serif text-lg text-forest">Produits les plus demandés</h2>
          {stats.topProducts.length === 0 ? (
            <p className="mt-4 text-sm text-gray-500">Aucune commande pour le moment.</p>
          ) : (
            <ul className="mt-4 space-y-2">
              {stats.topProducts.map((p) => (
                <li key={p.name} className="flex justify-between text-sm">
                  <span>{p.name}</span>
                  <span className="font-medium">{p.count}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="font-serif text-lg text-forest">Villes les plus actives</h2>
          {stats.topCities.length === 0 ? (
            <p className="mt-4 text-sm text-gray-500">Aucune donnée disponible.</p>
          ) : (
            <ul className="mt-4 space-y-2">
              {stats.topCities.map((c) => (
                <li key={c.city} className="flex justify-between text-sm">
                  <span>{c.city}</span>
                  <span className="font-medium">{c.count}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
