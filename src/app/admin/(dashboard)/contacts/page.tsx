import { getAdminContacts } from "@/lib/data/admin-queries";
import { formatDate } from "@/lib/utils";
import { MarkReadButton } from "@/components/admin/MarkReadButton";

export default async function AdminContactsPage() {
  const contacts = await getAdminContacts();

  return (
    <div>
      <h1 className="font-serif text-3xl text-forest">Messages contact</h1>
      <p className="mt-1 text-sm text-gray-500">{contacts.length} message(s)</p>

      {contacts.length === 0 ? (
        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500">
          Aucun message pour le moment.
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {contacts.map((c: Record<string, unknown>) => (
            <div
              key={c.id as string}
              className={`rounded-xl border bg-white p-6 ${c.is_read ? "border-gray-200" : "border-forest/30"}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{c.full_name as string}</p>
                  <p className="text-sm text-gray-500">{c.email as string} · {c.phone as string}</p>
                </div>
                <span className="text-xs text-gray-400">{formatDate(c.created_at as string)}</span>
              </div>
              <p className="mt-2 font-medium text-forest">{c.subject as string}</p>
              <p className="mt-2 text-sm text-gray-600">{c.message as string}</p>
              {!c.is_read && <MarkReadButton id={c.id as string} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
