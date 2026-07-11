import Link from "next/link";

export default function EmptyState() {
  return (
    <div className="rounded-xl border border-dashed bg-white p-12 text-center">
      <h2 className="text-xl font-semibold">
        No Contacts Yet
      </h2>

      <p className="mt-2 text-gray-500">
        Start by creating your first contact.
      </p>

      <Link
        href="/contacts/new"
        className="mt-6 inline-block rounded-md bg-blue-600 px-5 py-2 text-white"
      >
        Add Contact
      </Link>
    </div>
  );
}