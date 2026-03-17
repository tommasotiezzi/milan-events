import { EventForm } from "@/components/events/EventForm";

export default function NewEventPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Nuovo evento</h1>
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <EventForm mode="create" />
      </div>
    </div>
  );
}
