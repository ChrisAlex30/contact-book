import Link from "next/link";

import Avatar from "./Avatar";

import type { ContactWithImages } from "@/types/contact";

interface Props {
  contact: ContactWithImages;
  onDelete: (contact: ContactWithImages) => void;
}

export default function ContactCard({
  contact,
  onDelete,
}: Props) {
  const imageCount =
    contact.imageUrls?.length ?? 0;

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md">

      {/* Cover Image / Avatar */}
      <div className="relative flex h-32 w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">

        {imageCount > 0 ? (
          <>
            <div className="absolute inset-0">
              <Avatar
                name={contact.name}
                imageUrl={contact.imageUrls[0].url}
              />
            </div>

            {imageCount > 1 && (
              <div className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-sm font-medium text-white">
                +{imageCount - 1}
              </div>
            )}
          </>
        ) : (
          <Avatar
            name={contact.name}
          />
        )}

      </div>

      {/* Details */}
      <div className="p-2">

        <div className="mb-3 flex items-center justify-between">

          <h2 className="text-lg font-semibold">
            {contact.name}
          </h2>

          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs capitalize">
            {contact.contactType}
          </span>

        </div>

        <p className="text-sm text-gray-600">
          {contact.email}
        </p>

        <p className="mb-3 text-sm text-gray-600">
          {contact.phone}
        </p>

        <div className="flex gap-4">

          <Link
            href={`/contacts/${contact._id}/edit`}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Edit
          </Link>

          <button
            type="button"
            onClick={() => onDelete(contact)}
            className="text-sm font-medium text-red-600 hover:underline"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}