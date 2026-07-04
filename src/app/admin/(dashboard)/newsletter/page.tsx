import { getAdminNewsletter } from "@/lib/data/admin-queries";
import { formatDate } from "@/lib/utils";

export default async function AdminNewsletterPage() {
  const subscribers = await getAdminNewsletter();

  const csvContent = subscribers.length
    ? "email,nom,telephone,source,date\n" +
      subscribers.map((s: Record<string, unknown>) =>
        `${s.email},${s.full_name || ""},${s.phone || ""},${s.source},${s.created_at}`
      ).join("\n")
    : "";

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-forest">Newsletter</h1>
          <p className="mt-1 text-sm text-gray-500">{subscribers.length} inscrit(s)</p>
        </div>
        {subscribers.length > 0 && (
          <a
            href={`data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`}
            download="bovinia-newsletter.csv"
            className="btn-secondary text-sm"
          >
            Exporter CSV
          </a>
        )}
      </div>

      {subscribers.length === 0 ? (
        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500">
          Aucun inscrit pour le moment.
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Nom</th>
                <th className="px-4 py-3 text-left">Téléphone</th>
                <th className="px-4 py-3 text-left">Source</th>
                <th className="px-4 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s: Record<string, unknown>) => (
                <tr key={s.id as string} className="border-b border-gray-100">
                  <td className="px-4 py-3">{s.email as string}</td>
                  <td className="px-4 py-3">{(s.full_name as string) || "—"}</td>
                  <td className="px-4 py-3">{(s.phone as string) || "—"}</td>
                  <td className="px-4 py-3">{s.source as string}</td>
                  <td className="px-4 py-3">{formatDate(s.created_at as string)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
