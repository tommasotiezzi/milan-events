"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

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
        // unique violation — already subscribed
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
    <section className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <div className="rounded-3xl bg-white border border-black/[0.06] shadow-sm px-6 py-8 text-center">
        <span className="text-3xl">✉️</span>
        <h2 className="mt-3 text-[18px] font-semibold text-gray-900">
          Aggiornamenti via email
        </h2>
        <p className="mt-2 text-[14px] text-gray-500 max-w-sm mx-auto">
          Stiamo lavorando per portarti aggiornamenti sugli eventi milanesi direttamente nella tua
          casella di posta. Vuoi essere tra i primi a riceverli? Lascia la tua email qui.
        </p>

        {status === "success" ? (
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-green-50 border border-green-100 px-5 py-2.5 text-[14px] font-medium text-green-700">
            <span>✓</span> Sei in lista — ti avviseremo presto!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-sm mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="la.tua@email.com"
              disabled={status === "loading"}
              className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-[14px] text-gray-900
                placeholder-gray-400 shadow-sm focus:border-gray-400 focus:outline-none focus:ring-1
                focus:ring-gray-300 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-xl bg-gray-900 px-5 py-2.5 text-[14px] font-semibold text-white
                hover:bg-gray-700 active:scale-[0.98] transition-all duration-150
                focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
                disabled:opacity-60"
            >
              {status === "loading" ? "..." : "Iscriviti"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-3 text-[13px] text-red-500">{errorMsg}</p>
        )}
      </div>
    </section>
  );
}
