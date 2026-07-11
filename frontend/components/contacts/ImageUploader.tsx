"use client";

import Image from "next/image";

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

export default function ImageUploader({
  files,
  disabled,
  onChange,
}: ImageUploaderProps) {
  function handleSelect(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const selectedFiles = Array.from(
      e.target.files ?? []
    );

    const validFiles = selectedFiles.filter((file) =>
      ALLOWED_TYPES.includes(file.type)
    );

    const updatedFiles = [
      ...files,
      ...validFiles,
    ].slice(0, MAX_FILES);

    onChange(updatedFiles);

    e.target.value = "";
  }

  function removeFile(index: number) {
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
          Maximum 5 images.
        </p>

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