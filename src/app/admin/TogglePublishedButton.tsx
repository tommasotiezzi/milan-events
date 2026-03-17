"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface TogglePublishedButtonProps {
  id: string;
  isPublished: boolean;
}

export function TogglePublishedButton({
  id,
  isPublished,
}: TogglePublishedButtonProps) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    setLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase.from("events") as any)
      .update({ is_published: !isPublished, updated_at: new Date().toISOString() })
      .eq("id", id);
    router.refresh();
    setLoading(false);
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
        transition-colors cursor-pointer disabled:opacity-50
        ${isPublished ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
    >
      {loading ? "..." : isPublished ? "Pubblicato" : "Bozza"}
    </button>
  );
}
