"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Event, EventCategory } from "@/types/event";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { createClient } from "@/lib/supabase/client";
import { generateSlug, generateUniqueSlug } from "@/lib/utils";

interface EventFormProps {
  event?: Event;
  mode: "create" | "edit";
}

const categoryOptions: { value: EventCategory; label: string }[] = [
  { value: "music", label: "Musica" },
  { value: "food", label: "Cibo" },
  { value: "art", label: "Arte" },
  { value: "sport", label: "Sport" },
  { value: "culture", label: "Cultura" },
  { value: "other", label: "Altro" },
];

function toLocalDatetimeValue(iso: string | null | undefined): string {
  if (!iso) return "";
  // Convert ISO string to local datetime-local input value
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function EventForm({ event, mode }: EventFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    event?.image_url ?? null
  );

  const [form, setForm] = useState({
    title: event?.title ?? "",
    description: event?.description ?? "",
    external_link: event?.external_link ?? "",
    starts_at: toLocalDatetimeValue(event?.starts_at),
    ends_at: toLocalDatetimeValue(event?.ends_at),
    location: event?.location ?? "",
    category: (event?.category ?? "other") as EventCategory,
    is_sponsored: event?.is_sponsored ?? false,
    rsvp_required: event?.rsvp_required ?? false,
    is_published: event?.is_published ?? false,
    image_url: event?.image_url ?? "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const target = e.target as HTMLInputElement;
    const value =
      target.type === "checkbox" ? target.checked : target.value;
    setForm((prev) => ({ ...prev, [target.name]: value }));
  }

  async function handleImageUpload(file: File): Promise<string | null> {
    const ext = file.name.split(".").pop();
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;

    const { data, error } = await supabase.storage
      .from("event-images")
      .upload(filename, file, { upsert: false });

    if (error) {
      console.error("Image upload error:", error);
      return null;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("event-images").getPublicUrl(data.path);

    return publicUrl;
  }

  async function handleDeleteOldImage(url: string) {
    // Extract path from public URL
    const parts = url.split("/event-images/");
    if (parts.length < 2) return;
    const path = parts[1];
    await supabase.storage.from("event-images").remove([path]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let imageUrl = form.image_url;

      // Handle image upload
      const fileInput = fileInputRef.current;
      if (fileInput?.files?.[0]) {
        const file = fileInput.files[0];
        // Delete old image if editing and has one
        if (mode === "edit" && event?.image_url) {
          await handleDeleteOldImage(event.image_url);
        }
        const uploaded = await handleImageUpload(file);
        if (uploaded) {
          imageUrl = uploaded;
        }
      }

      if (mode === "create") {
        // Generate slug
        const baseSlug = generateSlug(form.title);
        // Check if slug exists
        const { data: existing } = await supabase
          .from("events")
          .select("id")
          .eq("slug", baseSlug)
          .maybeSingle();

        const slug = existing ? generateUniqueSlug(form.title) : baseSlug;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error: insertError } = await (supabase.from("events") as any).insert({
          title: form.title,
          slug,
          description: form.description || null,
          image_url: imageUrl || null,
          external_link: form.external_link || null,
          starts_at: new Date(form.starts_at).toISOString(),
          ends_at: form.ends_at
            ? new Date(form.ends_at).toISOString()
            : null,
          location: form.location || null,
          category: form.category,
          is_sponsored: form.is_sponsored,
          rsvp_required: form.rsvp_required,
          is_published: form.is_published,
        });

        if (insertError) throw insertError;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error: updateError } = await (supabase.from("events") as any)
          .update({
            title: form.title,
            description: form.description || null,
            image_url: imageUrl || null,
            external_link: form.external_link || null,
            starts_at: new Date(form.starts_at).toISOString(),
            ends_at: form.ends_at
              ? new Date(form.ends_at).toISOString()
              : null,
            location: form.location || null,
            category: form.category,
            is_sponsored: form.is_sponsored,
            rsvp_required: form.rsvp_required,
            is_published: form.is_published,
            updated_at: new Date().toISOString(),
          })
          .eq("id", event!.id);

        if (updateError) throw updateError;
      }

      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Si è verificato un errore."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 border border-red-200 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Title */}
      <Input
        id="title"
        name="title"
        label="Titolo *"
        value={form.title}
        onChange={handleChange}
        required
        placeholder="Nome dell'evento"
      />

      {/* Description */}
      <Textarea
        id="description"
        name="description"
        label="Descrizione"
        value={form.description}
        onChange={handleChange}
        rows={5}
        placeholder="Descrizione dell'evento (supporta Markdown)"
      />

      {/* Image Upload */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Immagine
        </label>
        {imagePreview && (
          <div className="relative h-40 w-full rounded-md overflow-hidden bg-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imagePreview}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setImagePreview(URL.createObjectURL(file));
            }
          }}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0 file:text-sm file:font-medium
            file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      {/* External Link */}
      <Input
        id="external_link"
        name="external_link"
        label="Link esterno"
        type="url"
        value={form.external_link}
        onChange={handleChange}
        placeholder="https://..."
      />

      {/* Dates */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          id="starts_at"
          name="starts_at"
          label="Data e ora di inizio *"
          type="datetime-local"
          value={form.starts_at}
          onChange={handleChange}
          required
        />
        <Input
          id="ends_at"
          name="ends_at"
          label="Data e ora di fine"
          type="datetime-local"
          value={form.ends_at}
          onChange={handleChange}
        />
      </div>

      {/* Location */}
      <Input
        id="location"
        name="location"
        label="Luogo"
        value={form.location}
        onChange={handleChange}
        placeholder="Nome del locale o indirizzo"
      />

      {/* Category */}
      <div className="space-y-1">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Categoria
        </label>
        <select
          id="category"
          name="category"
          value={form.category}
          onChange={handleChange}
          className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm
            text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {categoryOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Toggles */}
      <div className="space-y-3">
        {(
          [
            {
              name: "is_sponsored",
              label: "Sponsorizzato",
              description: "Fissa l'evento in cima alla bacheca",
            },
            {
              name: "rsvp_required",
              label: "RSVP Richiesto",
              description: "Indica che è richiesta la prenotazione",
            },
            {
              name: "is_published",
              label: "Pubblicato",
              description: "Rende l'evento visibile al pubblico",
            },
          ] as const
        ).map(({ name, label, description }) => (
          <label key={name} className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name={name}
              checked={form[name]}
              onChange={handleChange}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <div>
              <span className="text-sm font-medium text-gray-700">{label}</span>
              <p className="text-xs text-gray-500">{description}</p>
            </div>
          </label>
        ))}
      </div>

      {/* Submit */}
      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={loading}>
          {loading
            ? "Salvataggio..."
            : mode === "create"
              ? "Crea evento"
              : "Salva modifiche"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push("/admin")}
        >
          Annulla
        </Button>
      </div>
    </form>
  );
}
