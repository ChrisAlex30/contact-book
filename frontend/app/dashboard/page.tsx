"use client";

import { useRouter } from "next/navigation";

import { logout } from "@/lib/auth";
export default function DashboardPage() {
  const router = useRouter();
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>
      <button
          type="button"
          className="absolute right-3 top-2 text-sm cursor-pointer"
          onClick={() =>{logout();router.replace("/login");} }
        >Logout
        </button>
    </main>
  );
}