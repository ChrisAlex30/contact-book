import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import GuestRoute from "@/components/auth/GuestRoute";

export default function ForgotPasswordPage() {
  return (
    <GuestRoute>
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <ForgotPasswordForm />
    </main>
    </GuestRoute>
  );
}