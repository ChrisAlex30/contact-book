"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageUploaderProps {
  files: File[];
  disabled?: boolean;
  onChange: (files: File[]) => void;
}

const MAX_FILES = 5;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export default function ImageUploader({
  files,
  disabled,
  onChange,
}: ImageUploaderProps) {

  const [imageError, setImageError] = useState("");
  function handleSelect(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const selectedFiles = Array.from(
      e.target.files ?? []
    );

    setImageError("");

    const remainingSlots = MAX_FILES - files.length;

    if (remainingSlots <= 0) {
      setImageError(
        "You can upload a maximum of 5 images."
      );
      e.target.value = "";
      return;
    }

    const acceptedFiles: File[] = [];

    let skippedType = false;
    let skippedSize = false;
    let skippedLimit = false;

    for (const file of selectedFiles) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        skippedType = true;
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        skippedSize = true;
        continue;
      }

      if (acceptedFiles.length >= remainingSlots) {
        skippedLimit = true;
        continue;
      }

      acceptedFiles.push(file);
    }

    if (acceptedFiles.length > 0) {
      onChange([...files, ...acceptedFiles]);
    }

    if (skippedType) {
      setImageError(
        "Only JPG, PNG, WEBP and GIF images are allowed."
      );
    } else if (skippedSize) {
      setImageError(
        "Image must be smaller than 5 MB."
      );
    } else if (skippedLimit) {
      setImageError(
        "Only 5 images allowed."
      );
    }

    e.target.value = "";
  }

  function removeFile(index: number) {
    setImageError("");
    onChange(
      files.filter((_, i) => i !== index)
    );
  }

  return (
    <div className="space-y-4">

      <div>

        <label className="mb-2 block text-sm font-medium">
          Images
        </label>

        <input
          type="file"
          multiple
          accept="image/*"
          disabled={disabled}
          onChange={handleSelect}
          className="block w-full rounded-md border p-2"
        />

        <p className="mt-2 text-sm text-gray-500">
          Maximum 5 images. JPG, PNG, WEBP or GIF. Max size 5 MB each.
        </p>

        {imageError && (
          <p className="mt-2 text-sm text-red-600">
            {imageError}
          </p>
        )}

      </div>

      {files.length > 0 && (

        <div className="grid grid-cols-3 gap-3">

          {files.map((file, index) => (

            <div
              key={`${file.name}-${index}`}
              className="relative"
            >

              <Image
                src={URL.createObjectURL(file)}
                alt={file.name}
                width={150}
                height={150}
                className="h-32 w-full rounded-md border object-cover"
              />

              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute right-2 top-2 rounded-full bg-red-600 px-2 py-1 text-xs text-white"
              >
                ×
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}