"use client";

import { useState } from "react";
import { Event, EventCategory } from "@/types/event";
import { EventCard } from "./EventCard";
import { CalendarIcon, EmptyCalendarIllustration } from "@/components/icons";

interface EventGridProps {
  events: Event[];
}

const categories: { value: EventCategory | "all"; label: string }[] = [
  { value: "all", label: "Tutti" },
  { value: "music", label: "Musica" },
  { value: "food", label: "Cibo" },
  { value: "art", label: "Arte" },
  { value: "sport", label: "Sport" },
  { value: "culture", label: "Cultura" },
  { value: "other", label: "Altro" },
];

function toDateString(iso: string): string {
  return iso.slice(0, 10); // "YYYY-MM-DD"
}

export function EventGrid({ events }: EventGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | "all">("all");
  const [selectedDate, setSelectedDate] = useState<string>("");

  const filtered = events.filter((e) => {
    if (selectedCategory !== "all" && e.category !== selectedCategory) return false;
    if (selectedDate && toDateString(e.starts_at) !== selectedDate) return false;
    return true;
  });

  const hasFilters = selectedCategory !== "all" || selectedDate !== "";

  return (
    <div className="space-y-4">
      {/* Category pills */}
      <div className="flex flex-wrap gap-2 pb-1">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-150
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
              ${
                selectedCategory === cat.value
                  ? "bg-gray-900 text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-gray-400 hover:text-gray-900"
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Date filter */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 sm:flex-none">
          <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full sm:w-auto rounded-full border border-gray-200 bg-white pl-8 pr-4 py-1.5
              text-[13px] text-gray-700 shadow-sm focus:border-gray-400 focus:outline-none focus:ring-1
              focus:ring-gray-300 transition-colors"
          />
        </div>
        {hasFilters && (
          <button
            onClick={() => { setSelectedCategory("all"); setSelectedDate(""); }}
            className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-[12px]
              font-medium text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors"
          >
            Azzera filtri
          </button>
        )}
      </div>

      {/* Event list */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <EmptyCalendarIllustration className="h-28 w-28 mb-4" />
          <p className="text-gray-400 text-[15px]">Nessun evento trovato.</p>
          {hasFilters && (
            <button
              onClick={() => { setSelectedCategory("all"); setSelectedDate(""); }}
              className="mt-3 text-[13px] text-blue-600 hover:underline"
            >
              Rimuovi i filtri
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
