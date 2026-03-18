"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LogoMark } from "@/components/icons";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Credenziali non valide. Riprova.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f5f7] px-4">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-900">
            <LogoMark className="h-9 w-9" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Milan Events
          </h1>
          <p className="mt-1.5 text-[14px] text-gray-500">
            Accedi al pannello amministratore
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-3xl border border-black/[0.06] bg-white p-6 shadow-sm"
        >
          {error && (
            <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-[13px] text-red-600">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-[13px] font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="admin@example.com"
              className="block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5
                text-[14px] text-gray-900 placeholder-gray-400
                focus:border-gray-400 focus:bg-white focus:outline-none focus:ring-0
                transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-[13px] font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5
                text-[14px] text-gray-900 placeholder-gray-400
                focus:border-gray-400 focus:bg-white focus:outline-none focus:ring-0
                transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-gray-900 py-3 text-[15px] font-semibold text-white
              hover:bg-gray-700 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            {loading ? "Accesso in corso…" : "Accedi"}
          </button>
        </form>
      </div>
    </div>
  );
}
