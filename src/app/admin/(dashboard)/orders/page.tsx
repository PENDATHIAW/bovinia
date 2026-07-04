import { getAdminOrders } from "@/lib/data/admin-queries";
import { formatDate, formatPrice } from "@/lib/utils";

export default async function AdminOrdersPage() {
  const orders = await getAdminOrders();

  return (
    <div>
      <h1 className="font-serif text-3xl text-forest">Commandes</h1>
      <p className="mt-1 text-sm text-gray-500">
        Structure e-commerce prête — paiement Wave, Orange Money, carte et livraison à venir.
      </p>

      {orders.length === 0 ? (
        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500">
          Aucune commande pour le moment. Les commandes apparaîtront ici lors de l&apos;activation du paiement.
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Client</th>
                <th className="px-4 py-3 text-left">Total</th>
                <th className="px-4 py-3 text-left">Paiement</th>
                <th className="px-4 py-3 text-left">Livraison</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o: Record<string, unknown>) => (
                <tr key={o.id as string} className="border-b border-gray-100">
                  <td className="px-4 py-3">{formatDate(o.created_at as string)}</td>
                  <td className="px-4 py-3">{o.customer_name as string}</td>
                  <td className="px-4 py-3">{formatPrice(o.total as number)}</td>
                  <td className="px-4 py-3">{o.payment_status as string}</td>
                  <td className="px-4 py-3">{o.delivery_status as string}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
