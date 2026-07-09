"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import ProtectedRoute from "../components/auth/ProtectedRoute";

import { logout } from "@/lib/auth";

export default function DashboardPage() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleLogout() {

    if (loading)
      return;

    setLoading(true);

    try {

      await logout();

      router.replace("/login");

    } finally {

      setLoading(false);

    }
  }

  return (

    <ProtectedRoute>

      <main className="flex min-h-screen items-center justify-center">

        <div className="w-full max-w-md rounded-xl border bg-white p-8 shadow">

          <h1 className="text-3xl font-bold">

            Dashboard

          </h1>

          <p className="mt-2 text-gray-600">

            Authentication completed successfully.

          </p>

          <button
            onClick={handleLogout}
            disabled={loading}
            className="mt-8 w-full rounded-md bg-red-600 py-2 text-white"
          >

            {loading
              ? "Signing Out..."
              : "Logout"}

          </button>

        </div>

      </main>

    </ProtectedRoute>

  );
}