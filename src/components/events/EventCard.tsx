import Image from "next/image";
import Link from "next/link";
import { Event } from "@/types/event";
import { Badge } from "@/components/ui/Badge";
import { formatDate, isPastEvent } from "@/lib/utils";

interface EventCardProps {
  event: Event;
}

const categoryLabels: Record<string, string> = {
  music: "Musica",
  food: "Cibo",
  art: "Arte",
  sport: "Sport",
  culture: "Cultura",
  other: "Altro",
};

export function EventCard({ event }: EventCardProps) {
  const past = isPastEvent(event);

  return (
    <article
      className={`group flex items-start gap-4 rounded-2xl bg-white px-5 py-4
        border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200
        transition-all duration-200 ease-out
        ${past ? "opacity-50" : ""}`}
    >
      {/* Thumbnail — square, rounded corners, left */}
      <Link
        href={`/events/${event.slug}`}
        className="shrink-0 relative h-[72px] w-[72px] overflow-hidden rounded-[14px] bg-gray-100"
        tabIndex={-1}
      >
        {event.image_url ? (
          <Image
            src={event.image_url}
            alt={event.title}
            fill
            className="object-cover"
            sizes="72px"
            style={{ objectPosition: event.image_position ?? "50% 50%" }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-2xl select-none">
            {categoryEmoji[event.category] ?? "📅"}
          </div>
        )}
        {event.is_sponsored && (
          <div className="absolute inset-0 ring-2 ring-amber-400 ring-inset rounded-[14px]" />
        )}
      </Link>

      {/* Main content */}
      <div className="flex flex-1 flex-col min-w-0 gap-1">
        {/* Top row: title + badges */}
        <div className="flex items-start justify-between gap-3">
          <Link href={`/events/${event.slug}`} className="flex-1 min-w-0">
            <h2 className="text-[15px] font-semibold text-gray-900 leading-snug truncate group-hover:text-blue-600 transition-colors">
              {event.title}
            </h2>
          </Link>

          {/* RSVP / external link button */}
          {event.external_link ? (
            <a
              href={event.external_link}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-full bg-gray-900 px-3.5 py-1.5 text-[12px] font-semibold
                text-white hover:bg-gray-700 active:scale-95 transition-all duration-150
                focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            >
              {event.rsvp_required ? "RSVP" : "Info"}
            </a>
          ) : (
            <Link
              href={`/events/${event.slug}`}
              className="shrink-0 rounded-full border border-gray-200 px-3.5 py-1.5 text-[12px]
                font-semibold text-gray-700 hover:border-gray-400 hover:text-gray-900
                active:scale-95 transition-all duration-150
                focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              Dettagli
            </Link>
          )}
        </div>

        {/* Description */}
        {event.description && (
          <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2 pr-1">
            {event.description}
          </p>
        )}

        {/* Bottom row: location + date */}
        <div className="flex items-end justify-between mt-1 gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant="category" className="text-[11px]">
              {categoryLabels[event.category] ?? event.category}
            </Badge>
            {event.is_sponsored && (
              <Badge variant="sponsored" className="text-[11px]">★ Sponsorizzato</Badge>
            )}
            {event.rsvp_required && (
              <Badge variant="rsvp" className="text-[11px]">RSVP</Badge>
            )}
            {event.location && (
              <span className="text-[12px] text-gray-400 flex items-center gap-0.5">
                <span className="text-[10px]">📍</span>
                <span className="truncate max-w-[140px]">{event.location}</span>
              </span>
            )}
          </div>
          <time
            dateTime={event.starts_at}
            className="shrink-0 text-[12px] text-gray-400 font-medium tabular-nums"
          >
            {formatDate(event.starts_at, false)}
          </time>
        </div>
      </div>
    </article>
  );
}

const categoryEmoji: Record<string, string> = {
  music: "🎵",
  food: "🍽",
  art: "🎨",
  sport: "⚽",
  culture: "🏛",
  other: "📅",
};
