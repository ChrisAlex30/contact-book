import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login | Contact Book",
};

import LoginForm from "@/components/auth/LoginForm";
import GuestRoute from "@/components/auth/GuestRoute";

export default function LoginPage() {
  
  return (
    <GuestRoute>
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <LoginForm />
    </main>
    </GuestRoute>
  );
}