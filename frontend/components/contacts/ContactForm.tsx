"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import AlertMessage from "@/components/common/AlertMessage";
import SubmitButton from "@/components/auth/SubmitButton";
import TextInput from "@/components/auth/TextInput";

import ImageUploader from "./ImageUploader";
import ExistingImages from "./ExistingImages";

import {
  createContact,
  updateContact,
} from "@/lib/contact";

import {
  generateUploadUrls,
  uploadFile,
} from "@/lib/upload";

import type { ContactWithImages } from "@/types/contact";
import Link from "next/link";

interface Props {
  mode?: "create" | "edit";
  contact?: ContactWithImages;
}

export default function ContactForm({
  mode = "create",
  contact,
}: Props) {
  const router = useRouter();

  const [name, setName] = useState(
    contact?.name ?? ""
  );

  const [email, setEmail] = useState(
    contact?.email ?? ""
  );

  const [phone, setPhone] = useState(
    contact?.phone ?? ""
  );

  const [contactType, setContactType] = useState<
    "personal" | "professional"
  >(
    contact?.contactType ?? "personal"
  );

  const [existingImages, setExistingImages] =
    useState(contact?.imageUrls ?? []);

  const [files, setFiles] = useState<File[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  function removeExistingImage(key: string) {
    setExistingImages((images) =>
      images.filter(
        (image) => image.key !== key
      )
    );
  }

  async function createContactFlow() {
    const { uploads } =
      await generateUploadUrls(
        files.map((file) => ({
          fileName: file.name,
          contentType: file.type as
            | "image/jpeg"
            | "image/png"
            | "image/webp"
            | "image/gif",
        }))
      );

    await Promise.all(
      uploads.map((upload, index) =>
        uploadFile(
          upload.uploadUrl,
          files[index]
        )
      )
    );

    await createContact({
      name,
      email,
      phone,
      contactType,
      images: uploads.map(
        (upload) => upload.key
      ),
    });
  }

  async function updateContactFlow() {
    if (!contact) {
      throw new Error("Contact not found.");
    }

    let uploadedKeys: string[] = [];

    if (files.length > 0) {
      const { uploads } =
        await generateUploadUrls(
          files.map((file) => ({
            fileName: file.name,
            contentType: file.type as
              | "image/jpeg"
              | "image/png"
              | "image/webp"
              | "image/gif",
          }))
        );

      await Promise.all(
        uploads.map((upload, index) =>
          uploadFile(
            upload.uploadUrl,
            files[index]
          )
        )
      );

      uploadedKeys = uploads.map(
        (upload) => upload.key
      );
    }

    const existingKeys =
      existingImages.map(
        (image) => image.key
      );

    await updateContact(contact._id, {
      name,
      email,
      phone,
      contactType,
      images: [
        ...existingKeys,
        ...uploadedKeys,
      ],
    });
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);
      setError("");

      if (mode === "create") {
        await createContactFlow();
      } else {
        await updateContactFlow();
      }

      router.replace("/contacts");
    } catch (err) {
      console.error(err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          mode === "create"
            ? "Unable to create contact."
            : "Unable to update contact."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl border bg-white p-6 shadow"
    >
      <TextInput
        label="Name"
        value={name}
        disabled={loading}
        onChange={setName}
      />

      <TextInput
        label="Email"
        type="email"
        value={email}
        disabled={loading}
        onChange={setEmail}
      />

      <TextInput
        label="Phone"
        value={phone}
        disabled={loading}
        onChange={setPhone}
      />

      <div>
        <label className="mb-2 block text-sm font-medium">
          Contact Type
        </label>

        <select
          value={contactType}
          disabled={loading}
          onChange={(e) =>
            setContactType(
              e.target.value as
                | "personal"
                | "professional"
            )
          }
          className="w-full rounded-md border p-2 disabled:cursor-not-allowed disabled:bg-gray-100"
        >
          <option value="personal">
            Personal
          </option>

          <option value="professional">
            Professional
          </option>
        </select>
      </div>

      {mode === "edit" && (
        <ExistingImages
          images={existingImages}
          disabled={loading}
          onRemove={removeExistingImage}
        />
      )}

      <ImageUploader
        files={files}
        disabled={loading}
        onChange={setFiles}
      />

      <AlertMessage
        variant="error"
        title={
          mode === "create"
            ? "Create Contact Failed"
            : "Update Contact Failed"
        }
        message={error}
      />

      <div className="flex justify-end gap-3">
        <Link
          href="/contacts"
          className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-100"
        >
          Cancel
        </Link>
  
  <SubmitButton
    loading={loading}
    loadingText={
      mode === "create"
        ? "Saving Contact..."
        : "Updating Contact..."
    }
  >
    {mode === "create"
      ? "Save Contact"
      : "Update Contact"}
  </SubmitButton>
</div>
    </form>
  );
}