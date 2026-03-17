"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/events/new", label: "Nuovo Evento", exact: false },
  { href: "/admin/newsletter", label: "Newsletter", exact: false },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  }

  return (
    <aside className="flex h-full w-56 flex-col border-r border-black/[0.06] bg-white px-3 py-5">
      {/* Logo */}
      <div className="mb-6 px-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-sm">
            🗓
          </div>
          <div>
            <p className="text-[13px] font-semibold text-gray-900 leading-none">Milan Events</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Admin</p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5">
        {navItems.map((item) => {
          const isExactActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center rounded-xl px-3 py-2 text-[13px] font-medium transition-colors
                ${
                  isExactActive
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-black/[0.06] pt-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center rounded-xl px-3 py-2 text-[13px] font-medium
            text-gray-500 hover:bg-gray-50 hover:text-red-600 transition-colors"
        >
          Disconnetti
        </button>
      </div>
    </aside>
  );
}
