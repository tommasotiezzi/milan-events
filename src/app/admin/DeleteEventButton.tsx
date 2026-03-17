"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";

interface DeleteEventButtonProps {
  id: string;
  imageUrl: string | null;
}

export function DeleteEventButton({ id, imageUrl }: DeleteEventButtonProps) {
  const router = useRouter();
  const supabase = createClient();

  async function handleDelete() {
    if (!confirm("Sei sicuro di voler eliminare questo evento?")) return;

    // Delete image from storage if exists
    if (imageUrl) {
      const parts = imageUrl.split("/event-images/");
      if (parts.length >= 2) {
        await supabase.storage.from("event-images").remove([parts[1]]);
      }
    }

    await supabase.from("events").delete().eq("id", id);
    router.refresh();
  }

  return (
    <Button variant="danger" size="sm" onClick={handleDelete}>
      Elimina
    </Button>
  );
}
