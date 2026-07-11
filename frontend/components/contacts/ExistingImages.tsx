"use client";

import Image from "next/image";
import { X } from "lucide-react";

import type { ContactImageUrl } from "@/types/contact";

interface Props {
  images: ContactImageUrl[];
  disabled?: boolean;
  onRemove: (key: string) => void;
}

export default function ExistingImages({
  images,
  disabled,
  onRemove,
}: Props) {
  if (images.length === 0) return null;

  return (
    <div>
      <label className="mb-3 block text-sm font-medium">
        Existing Images
      </label>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {images.map((image) => (
          <div
            key={image.key}
            className="relative overflow-hidden rounded-lg border"
          >
            <div className="relative aspect-square">
              <Image
                src={image.url}
                alt="Contact"
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>

            <button
              type="button"
              disabled={disabled}
              onClick={() => onRemove(image.key)}
              className="absolute right-2 top-2 rounded-full bg-red-600 p-1 text-white shadow hover:bg-red-700 disabled:opacity-50"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}