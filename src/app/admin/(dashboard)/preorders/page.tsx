import { getAdminPreorders } from "@/lib/data/admin-queries";
import { PreordersTable } from "@/components/admin/PreordersTable";

export default async function AdminPreordersPage() {
  const preorders = await getAdminPreorders();

  return (
    <div>
      <h1 className="font-serif text-3xl text-forest">Commandes clients</h1>
      <p className="mt-1 text-sm text-gray-500">{preorders.length} commande(s) reçue(s)</p>
      <PreordersTable preorders={preorders} />
    </div>
  );
}
