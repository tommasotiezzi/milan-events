"use client";

import { useState } from "react";
import { Event, EventCategory } from "@/types/event";
import { EventCard } from "./EventCard";

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

export function EventGrid({ events }: EventGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | "all">("all");

  const filtered =
    selectedCategory === "all"
      ? events
      : events.filter((e) => e.category === selectedCategory);

  return (
    <div className="space-y-4">
      {/* Category pills — Apple SF Symbols style */}
      <div className="flex flex-wrap gap-2 pb-2">
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

      {/* Event list */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <span className="text-5xl mb-4">🗓</span>
          <p className="text-gray-400 text-[15px]">
            Nessun evento trovato in questa categoria.
          </p>
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
