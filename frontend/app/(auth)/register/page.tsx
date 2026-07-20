import GuestRoute from "@/components/auth/GuestRoute";
import RegisterForm from "@/components/auth/RegisterForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Register | Contact Book",
};
export default function RegisterPage() {
  return (
    <GuestRoute>
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <RegisterForm />
    </main>
    </GuestRoute>
  );
}