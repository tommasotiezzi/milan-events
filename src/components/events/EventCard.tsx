import Image from "next/image";
import Link from "next/link";
import { Event } from "@/types/event";
import { Badge } from "@/components/ui/Badge";
import { formatDate, isPastEvent } from "@/lib/utils";
import {
  CategoryIllustration,
  LocationPinIcon,
  StarIcon,
} from "@/components/icons";

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

const categoryColours: Record<string, { bg: string; fg: string }> = {
  music:   { bg: "bg-violet-50",  fg: "text-violet-400"  },
  food:    { bg: "bg-amber-50",   fg: "text-amber-400"   },
  art:     { bg: "bg-pink-50",    fg: "text-pink-400"    },
  sport:   { bg: "bg-sky-50",     fg: "text-sky-400"     },
  culture: { bg: "bg-emerald-50", fg: "text-emerald-400" },
  other:   { bg: "bg-gray-100",   fg: "text-gray-400"    },
};

const ctaClass = `shrink-0 rounded-full px-3.5 py-1.5 text-[12px] font-semibold
  active:scale-95 transition-all duration-150
  focus:outline-none focus:ring-2 focus:ring-offset-2`;

export function EventCard({ event }: EventCardProps) {
  const past = isPastEvent(event);
  const colours = categoryColours[event.category] ?? categoryColours.other;

  const cta = event.external_link ? (
    <a
      href={event.external_link}
      target="_blank"
      rel="noopener noreferrer"
      className={`${ctaClass} bg-gray-900 text-white hover:bg-gray-700 focus:ring-gray-900`}
    >
      {event.rsvp_required ? "RSVP" : "Info"}
    </a>
  ) : (
    <Link
      href={`/events/${event.slug}`}
      className={`${ctaClass} border border-gray-200 text-gray-700 hover:border-gray-400 hover:text-gray-900 focus:ring-gray-400`}
    >
      Dettagli
    </Link>
  );

  return (
    <article
      className={`group flex items-start gap-4 rounded-2xl bg-white px-5 py-4
        border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200
        transition-all duration-200 ease-out ${past ? "opacity-50" : ""}`}
    >
      {/* Thumbnail */}
      <Link
        href={`/events/${event.slug}`}
        className={`shrink-0 relative h-[72px] w-[72px] overflow-hidden rounded-[14px] ${colours.bg}`}
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
          <div className="flex h-full w-full items-center justify-center">
            <CategoryIllustration category={event.category} className={`h-8 w-8 ${colours.fg}`} />
          </div>
        )}
        {event.is_sponsored && (
          <div className="absolute inset-0 ring-2 ring-amber-400 ring-inset rounded-[14px]" />
        )}
      </Link>

      {/* Main content */}
      <div className="flex flex-1 flex-col min-w-0 gap-1.5">

        {/* Title + date */}
        <div className="min-w-0">
          <Link href={`/events/${event.slug}`}>
            <h2 className="text-[15px] font-semibold text-gray-900 leading-snug truncate group-hover:text-blue-600 transition-colors">
              {event.title}
            </h2>
          </Link>
          <time
            dateTime={event.starts_at}
            className="text-[12px] text-gray-400 font-medium tabular-nums"
          >
            {formatDate(event.starts_at, false)}
          </time>
        </div>

        {/* Optional description */}
        {event.description && (
          <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-1">
            {event.description}
          </p>
        )}

        {/* Bottom row: badges + button */}
        <div className="flex items-center justify-between gap-2 mt-0.5">
          <div className="flex flex-wrap items-center gap-1.5 min-w-0">
            <Badge variant="category" className="text-[11px]">
              {categoryLabels[event.category] ?? event.category}
            </Badge>
            {event.is_sponsored && (
              <Badge variant="sponsored" className="inline-flex items-center gap-1 text-[11px]">
                <StarIcon filled className="h-2.5 w-2.5" />
                <span className="hidden sm:inline">Sponsorizzato</span>
              </Badge>
            )}
            {event.rsvp_required && (
              <Badge variant="rsvp" className="text-[11px]">RSVP</Badge>
            )}
            {event.location && (
              <span className="hidden sm:flex items-center gap-0.5 text-[12px] text-gray-400">
                <LocationPinIcon className="h-3 w-3 shrink-0" />
                <span className="truncate max-w-[160px]">{event.location}</span>
              </span>
            )}
          </div>
          {cta}
        </div>

        {/* Location on mobile (below badges) */}
        {event.location && (
          <span className="flex sm:hidden items-center gap-0.5 text-[12px] text-gray-400">
            <LocationPinIcon className="h-3 w-3 shrink-0" />
            <span className="truncate">{event.location}</span>
          </span>
        )}

      </div>
    </article>
  );
}
