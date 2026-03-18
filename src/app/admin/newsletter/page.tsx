import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function NewsletterPage() {
  let signups: { id: string; email: string; created_at: string }[] = [];
  let error: unknown = null;

  try {
    const supabase = await createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error: fetchError } = await (supabase.from("newsletter_signups") as any)
      .select("id, email, created_at")
      .order("created_at", { ascending: false });
    if (fetchError) error = fetchError;
    else signups = data ?? [];
  } catch (e) {
    error = e;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Newsletter</h1>
          {!error && (
            <p className="text-sm text-gray-500 mt-0.5">
              {signups.length} iscritt{signups.length === 1 ? "o" : "i"}
            </p>
          )}
        </div>
      </div>

      {error ? (
        <div className="text-red-600 text-sm">Errore nel caricamento degli iscritti.</div>
      ) : signups.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center text-sm text-gray-400">
          Nessun iscritto ancora.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Iscritto il
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {signups.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{s.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">
                    {new Date(s.created_at).toLocaleDateString("it-IT", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
