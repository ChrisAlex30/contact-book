import Image from "next/image";
import Link from "next/link";

import type { ContactWithImages } from "@/types/contact";

interface Props {
  contact: ContactWithImages;
  onDelete: (contact: ContactWithImages) => void;
}

export default function ContactCard({
  contact,
  onDelete,
}: Props) {
  const imageCount = contact.imageUrls?.length ?? 0;

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md">

      {/* Cover Image */}
      <div className="relative h-52 w-full bg-gray-100">
        {imageCount > 0 ? (
          <>
            <Image
              src={contact.imageUrls[0].url}
              alt={contact.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />

            {imageCount > 1 && (
              <div className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-sm font-medium text-white">
                +{imageCount - 1}
              </div>
            )}
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Details */}
      <div className="p-5">
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

        <p className="mb-6 text-sm text-gray-600">
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