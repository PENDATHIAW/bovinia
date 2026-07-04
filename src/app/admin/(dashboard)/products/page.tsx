import Link from "next/link";
import { getAdminProducts } from "@/lib/data/queries";
import { formatPrice } from "@/lib/utils";
import { CATEGORY_LABELS } from "@/types/database";
import { Pencil } from "lucide-react";

export default async function AdminProductsPage() {
  const products = await getAdminProducts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-forest">Produits</h1>
          <p className="mt-1 text-sm text-gray-500">{products.length} produit(s)</p>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Nom</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Mission</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Catégorie</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Prix</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Stock</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Statut</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{p.name}</td>
                <td className="px-4 py-3 text-gray-600">{p.mission}</td>
                <td className="px-4 py-3 text-gray-600">{CATEGORY_LABELS[p.category]}</td>
                <td className="px-4 py-3">{p.price ? formatPrice(p.price) : "—"}</td>
                <td className="px-4 py-3">{p.stock}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-cream px-2 py-1 text-xs">{p.status}</span>
                </td>
                <td className="px-4 py-3">
                  <Link href={`/admin/products/${p.slug}`} className="inline-flex items-center gap-1 text-forest hover:underline">
                    <Pencil size={14} />
                    Modifier
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
