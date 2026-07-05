import { getAdminOrders } from "@/lib/data/admin-queries";
import { OrdersTable } from "@/components/admin/OrdersTable";

export default async function AdminOrdersPage() {
  const { orders, itemsByOrder } = await getAdminOrders();

  return (
    <div>
      <h1 className="font-serif text-3xl text-forest">Commandes</h1>
      <p className="mt-1 text-sm text-gray-500">
        {orders.length} commande(s) passée(s) sur le site — confirmation immédiate + email
        récapitulatif.
      </p>
      <OrdersTable orders={orders} itemsByOrder={itemsByOrder} />
    </div>
  );
}
