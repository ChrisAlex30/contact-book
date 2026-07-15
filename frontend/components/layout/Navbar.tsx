"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { logout } from "@/lib/auth";

import Logo from "./Logo";
import Avatar from "../contacts/Avatar";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { name, email } = useCurrentUser();

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

          <div className="h-8 w-px bg-gray-200" />

          <div className="relative">

            <button
              type="button"
              onClick={() =>
                setMenuOpen((prev) => !prev)
              }
              className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition hover:bg-gray-100"
            >

              <Avatar
                name={name || "User"}
                size={42}
              />

              <div className="hidden text-left md:block">

                <p className="font-medium leading-5">
                  {name || "User"}
                </p>

                <p className="text-sm text-gray-500 leading-5">
                  {email}
                </p>

              </div>

              <svg
                className={`h-4 w-4 text-gray-500 transition-transform ${
                  menuOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>

            </button>

            {menuOpen && (
              <div className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-lg border bg-white shadow-lg">

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loading}
                  className="w-full cursor-pointer px-4 py-3 text-left text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading
                    ? "Signing Out..."
                    : "Logout"}
                </button>

              </div>
            )}

          </div>

        </nav>

      </div>
    </header>
  );
}