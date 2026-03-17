import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { EventGrid } from "@/components/events/EventGrid";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { Event } from "@/types/event";

export const revalidate = 60;

export default async function HomePage() {
  let typedEvents: Event[] = [];
  let error: unknown = null;

  try {
    const supabase = await createClient();
    const { data: events, error: fetchError } = await supabase
      .from("events")
      .select("*")
      .eq("is_published", true)
      .order("is_sponsored", { ascending: false })
      .order("starts_at", { ascending: true });
    if (fetchError) error = fetchError;
    else typedEvents = (events ?? []) as Event[];
  } catch {
    error = true;
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* Navigation bar */}
      <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-tight text-gray-900">Milan Events</span>
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

      {/* Newsletter */}
      <NewsletterSignup />

      {/* Footer */}
      <footer className="mt-8 border-t border-black/[0.06] bg-white">
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {/* Brand */}
            <div className="space-y-2">
              <p className="text-[14px] font-semibold text-gray-900">Milan Events</p>
              <p className="text-[13px] text-gray-500 leading-relaxed">
                La bacheca comunitaria degli eventi di Milano. Aggiornata ogni giorno.
              </p>
            </div>

            {/* Links */}
            <div className="space-y-2">
              <p className="text-[12px] font-semibold uppercase tracking-wider text-gray-400">Esplora</p>
              <ul className="space-y-1.5 text-[13px] text-gray-600">
                <li><Link href="/" className="hover:text-gray-900 transition-colors">Tutti gli eventi</Link></li>
                <li><Link href="/" className="hover:text-gray-900 transition-colors">Musica</Link></li>
                <li><Link href="/" className="hover:text-gray-900 transition-colors">Food &amp; Drink</Link></li>
                <li><Link href="/" className="hover:text-gray-900 transition-colors">Arte &amp; Cultura</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-2">
              <p className="text-[12px] font-semibold uppercase tracking-wider text-gray-400">Contatti</p>
              <ul className="space-y-1.5 text-[13px] text-gray-600">
                <li>
                  <a
                    href="mailto:ciao@milanevents.it"
                    className="hover:text-gray-900 transition-colors"
                  >
                    ciao@milanevents.it
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/milanevents"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-900 transition-colors"
                  >
                    @milanevents
                  </a>
                </li>
                <li>
                  <a href="/admin" className="hover:text-gray-900 transition-colors">
                    Area organizzatori
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-black/[0.04] pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-[12px] text-gray-400">
              © {new Date().getFullYear()} Milan Events · Milano, Italia
            </p>
            <p className="text-[12px] text-gray-400">
              Vuoi pubblicare un evento?{" "}
              <a href="mailto:ciao@milanevents.it" className="hover:text-gray-600 underline underline-offset-2">
                Scrivici
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
