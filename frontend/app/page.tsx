"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      if (await isAuthenticated()) {
        router.replace("/dashboard");
      } else {
        router.replace("/login");
      }
    }

    checkAuth();
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <p className="text-gray-500">Loading...</p>
    </main>
  );
}