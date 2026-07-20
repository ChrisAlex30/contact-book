import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Contact Book",
};
import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl p-8">

        <div className="mb-10">
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="mt-2 text-gray-600">
            Welcome! Choose an action to get started.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <Link
            href="/contacts"
            className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md hover:border-blue-200"
          >
            <h2 className="text-xl font-semibold">
              View Contacts
            </h2>

            <p className="mt-2 text-gray-600">
              Browse, edit and delete your contacts.
            </p>
          </Link>

          <Link
            href="/contacts/new"
            className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md hover:border-blue-200"
          >
            <h2 className="text-xl font-semibold">
              Add Contact
            </h2>

            <p className="mt-2 text-gray-600">
              Create a new contact with images.
            </p>
          </Link>

        </div>

      </div>
    </main>
  );
}