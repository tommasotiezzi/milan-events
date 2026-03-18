"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { CheckIcon } from "@/components/icons";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const supabase = createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from("newsletter_signups") as any).insert({ email });

    if (error) {
      if (error.code === "23505") {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg("Si è verificato un errore. Riprova.");
      }
    } else {
      setStatus("success");
    }
  }

  return (
    <div className="space-y-2">
      <p className="text-[12px] font-semibold uppercase tracking-wider text-gray-400">Newsletter</p>
      <p className="text-[13px] text-gray-500 leading-relaxed">
        Vuoi ricevere gli aggiornamenti via email?
      </p>

      {status === "success" ? (
        <div className="flex items-center gap-1.5 text-[13px] text-green-600">
          <CheckIcon className="h-3.5 w-3.5" />
          Sei in lista!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-1.5">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="la.tua@email.com"
            disabled={status === "loading"}
            className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5
              text-[13px] text-gray-900 placeholder-gray-400
              focus:border-gray-400 focus:bg-white focus:outline-none
              disabled:opacity-60 transition-colors"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="shrink-0 rounded-lg bg-gray-900 px-3 py-1.5 text-[13px] font-medium text-white
              hover:bg-gray-700 active:scale-[0.98] transition-all duration-150
              focus:outline-none disabled:opacity-60"
          >
            {status === "loading" ? "…" : "Iscriviti"}
          </button>
        </form>
      )}

      {status === "error" && (
        <p className="text-[12px] text-red-500">{errorMsg}</p>
      )}
    </div>
  );
}
