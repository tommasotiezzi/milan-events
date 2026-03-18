import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { EventForm } from "@/components/events/EventForm";

interface EditEventPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditEventPage({ params }: EditEventPageProps) {
  const { id } = await params;

  let event;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .single();
    if (error || !data) notFound();
    event = data;
  } catch {
    notFound();
  }

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Modifica evento</h1>
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <EventForm mode="edit" event={event} />
      </div>
    </div>
  );
}
