import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/Badge";
import { formatDate, isPastEvent } from "@/lib/utils";
import { Event } from "@/types/event";
import { ArrowLeftIcon, CategoryIllustration, StarIcon } from "@/components/icons";

interface EventDetailPageProps {
  params: Promise<{ slug: string }>;
}

const categoryLabels: Record<string, string> = {
  music: "Musica",
  food: "Cibo",
  art: "Arte",
  sport: "Sport",
  culture: "Cultura",
  other: "Altro",
};

const categoryColours: Record<string, { bg: string; fg: string }> = {
  music:   { bg: "bg-violet-50", fg: "text-violet-400" },
  food:    { bg: "bg-amber-50",  fg: "text-amber-400"  },
  art:     { bg: "bg-pink-50",   fg: "text-pink-400"   },
  sport:   { bg: "bg-sky-50",    fg: "text-sky-400"    },
  culture: { bg: "bg-emerald-50",fg: "text-emerald-400"},
  other:   { bg: "bg-gray-100",  fg: "text-gray-400"   },
};

export async function generateMetadata({
  params,
}: EventDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const supabase = await createClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: eventRaw } = await (supabase.from("events") as any)
      .select("title, description, image_url")
      .eq("slug", slug)
      .eq("is_published", true)
      .single();

    const event = eventRaw as { title: string; description: string | null; image_url: string | null } | null;

    if (!event) return { title: "Evento non trovato — Milan Events" };

    return {
      title: `${event.title} — Milan Events`,
      description: event.description ?? undefined,
      openGraph: {
        title: event.title,
        description: event.description ?? undefined,
        images: event.image_url ? [{ url: event.image_url }] : [],
      },
    };
  } catch {
    return { title: "Evento non trovato — Milan Events" };
  }
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = await params;

  let typedEvent: Event;
  try {
    const supabase = await createClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: event, error } = await (supabase.from("events") as any)
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single();

    if (error || !event) notFound();

    typedEvent = event as Event;
  } catch {
    notFound();
  }

  const past = isPastEvent(typedEvent!);

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center px-6 py-3 lg:px-12">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-[14px] font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Tutti gli eventi
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-6 lg:px-12 space-y-4">
        {/* Hero card */}
        <div className="overflow-hidden rounded-3xl bg-white border border-black/[0.06] shadow-sm">
          {/* Hero image */}
          {typedEvent!.image_url ? (
            <div className="relative h-56 w-full sm:h-72 bg-gray-100">
              <Image
                src={typedEvent!.image_url}
                alt={typedEvent!.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 672px) 100vw, 672px"
                style={{ objectPosition: typedEvent!.image_position ?? "50% 50%" }}
              />
            </div>
          ) : (() => {
              const col = categoryColours[typedEvent!.category] ?? categoryColours.other;
              return (
                <div className={`flex h-32 items-center justify-center ${col.bg}`}>
                  <CategoryIllustration category={typedEvent!.category} className={`h-14 w-14 ${col.fg}`} />
                </div>
              );
            })()}

          {/* Detail */}
          <div className="p-6 space-y-4">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="category">
                {categoryLabels[typedEvent!.category] ?? typedEvent!.category}
              </Badge>
              {typedEvent!.is_sponsored && (
                <Badge variant="sponsored" className="inline-flex items-center gap-1">
                  <StarIcon filled className="h-3 w-3" />
                  Sponsorizzato
                </Badge>
              )}
              {typedEvent!.rsvp_required && <Badge variant="rsvp">RSVP Richiesto</Badge>}
              {past && <Badge>Concluso</Badge>}
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {typedEvent!.title}
            </h1>

            {/* Date & location */}
            <dl className="grid gap-3 sm:grid-cols-2 text-[14px]">
              <div className="rounded-xl bg-gray-50 px-4 py-3">
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1">
                  Data e ora
                </dt>
                <dd className="text-gray-800 font-medium">
                  {formatDate(typedEvent!.starts_at)}
                  {typedEvent!.ends_at && (
                    <span className="block text-gray-400 text-[13px] mt-0.5">
                      fino al {formatDate(typedEvent!.ends_at)}
                    </span>
                  )}
                </dd>
              </div>
              {typedEvent!.location && (
                <div className="rounded-xl bg-gray-50 px-4 py-3">
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    Luogo
                  </dt>
                  <dd className="text-gray-800 font-medium">{typedEvent!.location}</dd>
                </div>
              )}
            </dl>

            {/* CTA */}
            {typedEvent!.external_link && (
              <a
                href={typedEvent!.external_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center rounded-2xl bg-gray-900 py-3.5
                  text-[15px] font-semibold text-white hover:bg-gray-700 active:scale-[0.98]
                  transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              >
                {typedEvent!.rsvp_required ? "Prenota il tuo posto →" : "Scopri di più →"}
              </a>
            )}
          </div>
        </div>

        {/* Description card */}
        {typedEvent!.description && (
          <div className="rounded-3xl bg-white border border-black/[0.06] shadow-sm p-6">
            <h2 className="text-[13px] font-semibold uppercase tracking-wider text-gray-400 mb-3">
              Descrizione
            </h2>
            <p className="text-[15px] text-gray-700 leading-relaxed whitespace-pre-wrap">
              {typedEvent!.description}
            </p>
          </div>
        )}
      </main>

      <footer className="mt-16 border-t border-black/[0.06] bg-white py-6">
        <div className="mx-auto max-w-5xl px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[12px] text-gray-400">
            © {new Date().getFullYear()} Milan Events · Milano, Italia
          </p>
          <a href="mailto:ciao@milanevents.it" className="text-[12px] text-gray-400 hover:text-gray-600 transition-colors">
            ciao@milanevents.it
          </a>
        </div>
      </footer>
    </div>
  );
}
