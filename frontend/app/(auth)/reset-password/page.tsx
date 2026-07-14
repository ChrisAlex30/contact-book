import GuestRoute from "@/components/auth/GuestRoute";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <GuestRoute>
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <ResetPasswordForm />
    </main>
    </GuestRoute>
  );
}