import { createClient } from "@/lib/supabase/server";
import { EventGrid } from "@/components/events/EventGrid";
import { Event } from "@/types/event";

export const revalidate = 60;

export default async function HomePage() {
  const supabase = await createClient();

  const { data: events, error } = await supabase
    .from("events")
    .select("*")
    .eq("is_published", true)
    .order("is_sponsored", { ascending: false })
    .order("starts_at", { ascending: true });

  const typedEvents = (events ?? []) as Event[];

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* Navigation bar — Apple style */}
      <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-tight text-gray-900">
              Milan Events
            </span>
          </div>
          <span className="text-[13px] text-gray-400">Milano, Italia</span>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
        {error ? (
          <div className="rounded-2xl bg-red-50 border border-red-100 p-6 text-center text-[14px] text-red-500">
            Errore nel caricamento degli eventi. Riprova più tardi.
          </div>
        ) : (
          <EventGrid events={typedEvents} />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-black/[0.06] bg-white/60 py-6">
        <div className="mx-auto max-w-2xl px-4 text-center text-[12px] text-gray-400 sm:px-6">
          Milan Events · Bacheca comunitaria di eventi · Milano
        </div>
      </footer>
    </div>
  );
}
