import ProtectedRoute from "@/components/auth/ProtectedRoute";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedLayout({
  children,
}: Props) {
  return (
    <ProtectedRoute>

      <div className="flex min-h-screen flex-col">

        <Navbar />

        <main className="flex-1">
          {children}
        </main>

        <Footer />

      </div>

    </ProtectedRoute>
  );
}