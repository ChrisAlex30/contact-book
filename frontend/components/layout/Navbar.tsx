"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { logout } from "@/lib/auth";

import Logo from "./Logo";

export default function Navbar() {
  const pathname = usePathname();

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    if (loading) return;

    try {
      setLoading(true);

      await logout();

      router.replace("/login");
    } finally {
      setLoading(false);
    }
  }

  const linkClass = (href: string) =>
    `transition ${
      pathname.startsWith(href)
        ? "font-semibold text-blue-600"
        : "text-gray-600 hover:text-blue-600"
    }`;

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-8">

        <Logo href="/dashboard" />

        <nav className="flex items-center gap-8">

          <Link
            href="/dashboard"
            className={linkClass("/dashboard")}
          >
            Dashboard
          </Link>

          <Link
            href="/contacts"
            className={linkClass("/contacts")}
          >
            Contacts
          </Link>

          <button
            onClick={handleLogout}
            disabled={loading}
            className="rounded-md bg-red-600 px-4 py-2 text-white transition hover:bg-red-700 disabled:opacity-50"
          >
            {loading
              ? "Signing Out..."
              : "Logout"}
          </button>

        </nav>

      </div>
    </header>
  );
}