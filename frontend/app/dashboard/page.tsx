"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { logout } from "@/lib/auth";

export default function DashboardPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    if (loading) return;

    setLoading(true);

    try {
      await logout();
      router.replace("/login");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-5xl p-8">

          <div className="mb-10 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                Contact Book
              </h1>

              <p className="mt-2 text-gray-600">
                Welcome! Choose an action to get started.
              </p>
            </div>

            <button
              onClick={handleLogout}
              disabled={loading}
              className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? "Signing Out..." : "Logout"}
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <Link
              href="/contacts"
              className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <h2 className="text-xl font-semibold">
                View Contacts
              </h2>

              <p className="mt-2 text-gray-600">
                Browse, edit and delete your contacts.
              </p>
            </Link>

            <Link
              href="/contacts/new"
              className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <h2 className="text-xl font-semibold">
                Add Contact
              </h2>

              <p className="mt-2 text-gray-600">
                Create a new contact with images.
              </p>
            </Link>

          </div>

        </div>
      </main>
    </ProtectedRoute>
  );
}