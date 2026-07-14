"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import LoadingState from "@/components/contacts/LoadingState";
import AlertMessage from "@/components/common/AlertMessage";
import ContactForm from "@/components/contacts/ContactForm";

import { getContact } from "@/lib/contact";

import type { ContactWithImages } from "@/types/contact";

export default function EditContactPage() {
  const { id } = useParams<{ id: string }>();

  const [contact, setContact] =
    useState<ContactWithImages | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadContact();
  }, []);

  async function loadContact() {
    try {
      setLoading(true);

      const data = await getContact(id);

      setContact(data);

    } catch (err) {
      console.error(err);

      setError("Unable to load contact.");

    } finally {
      setLoading(false);
    }
  }

  return (
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-3xl p-8">

          <h1 className="mb-8 text-3xl font-bold">
            Edit Contact
          </h1>

          <AlertMessage
            variant="error"
            message={error}
          />

          {loading ? (
            <LoadingState />
          ) : contact ? (
            <ContactForm
              mode="edit"
              contact={contact}
            />
          ) : null}

        </div>
      </main>
  );
}