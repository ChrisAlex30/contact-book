import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ContactForm from "@/components/contacts/ContactForm";

export default function NewContactPage() {
  return (
      <main className="min-h-screen bg-gray-50 p-8">
        <div className="mx-auto max-w-2xl">

          <h1 className="mb-8 text-3xl font-bold">
            Create Contact
          </h1>

          <ContactForm />

        </div>
      </main>
  );
}