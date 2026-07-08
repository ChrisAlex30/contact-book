import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login | Contact Book",
};

import LoginForm from "../components/auth/LoginForm";

export default function LoginPage() {
  
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <LoginForm />
    </main>
  );
}