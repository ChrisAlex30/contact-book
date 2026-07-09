"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { isAuthenticated } from "@/lib/auth";

interface Props {
  children: React.ReactNode;
}

export default function GuestRoute({
  children,
}: Props) {
  const router = useRouter();

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function check() {
      const authenticated =
        await isAuthenticated();

      if (authenticated) {
        router.replace("/dashboard");
        return;
      }

      setChecking(false);
    }

    check();
  }, [router]);

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />

          <span>Loading...</span>
        </div>
      </main>
    );
  }

  return children;
}