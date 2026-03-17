import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Event } from "@/types/event";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { DeleteEventButton } from "./DeleteEventButton";
import { TogglePublishedButton } from "./TogglePublishedButton";

export const dynamic = "force-dynamic";

const categoryLabels: Record<string, string> = {
  music: "Musica",
  food: "Cibo",
  art: "Arte",
  sport: "Sport",
  culture: "Cultura",
  other: "Altro",
};

export default async function AdminPage() {
  let events: Event[] | null = null;
  let error: unknown = null;

  try {
    const supabase = await createClient();
    const { data, error: fetchError } = await supabase
      .from("events")
      .select("*")
      .order("starts_at", { ascending: true });
    if (fetchError) error = fetchError;
    else events = data;
  } catch (e) {
    error = e;
  }

  if (error) {
    return (
      <div className="text-red-600">
        Errore nel caricamento degli eventi.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Gestione eventi</h1>
        <Link href="/admin/events/new">
          <Button>+ Nuovo evento</Button>
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Titolo
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Categoria
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Data inizio
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Sponsorizzato
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Pubblicato
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                Azioni
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {events && events.length > 0 ? (
              events.map((event: Event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 max-w-xs truncate">
                    {event.title}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    <Badge variant="category">
                      {categoryLabels[event.category] ?? event.category}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">
                    {formatDate(event.starts_at, false)}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {event.is_sponsored ? (
                      <Badge variant="sponsored">Sì</Badge>
                    ) : (
                      <span className="text-gray-400">No</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <TogglePublishedButton
                      id={event.id}
                      isPublished={event.is_published}
                    />
                  </td>
                  <td className="px-4 py-3 text-right text-sm space-x-2">
                    <Link href={`/admin/events/${event.id}`}>
                      <Button variant="secondary" size="sm">
                        Modifica
                      </Button>
                    </Link>
                    <DeleteEventButton
                      id={event.id}
                      imageUrl={event.image_url}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-sm text-gray-400"
                >
                  Nessun evento trovato.{" "}
                  <Link
                    href="/admin/events/new"
                    className="text-blue-600 hover:underline"
                  >
                    Crea il primo evento
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
