"use client";

import { useState } from "react";
import Link from "next/link";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

import AlertMessage from "@/components/common/AlertMessage";

import ContactList from "@/components/contacts/ContactList";
import DeleteContactDialog from "@/components/contacts/DeleteContactDialog";
import EmptyState from "@/components/contacts/EmptyState";
import LoadingState from "@/components/contacts/LoadingState";

import TextInput from "@/components/auth/TextInput";

import useContacts from "@/hooks/useContacts";

import { deleteContact } from "@/lib/contact";

import type { Contact } from "@/types/contact";

export default function ContactsPage() {
  const {
    contacts,
    loading,
    error,
    refresh,
    search,
    setSearch,
  } = useContacts();

  const [selected, setSelected] =
    useState<Contact | null>(null);

  const [deleting, setDeleting] =
    useState(false);

  const [deleteError, setDeleteError] =
    useState("");

  async function handleDelete() {
    if (!selected) return;

    try {
      setDeleting(true);
      setDeleteError("");

      await deleteContact(selected._id);

      setSelected(null);

      await refresh();
    } catch (err) {
      console.error(err);

      if (err instanceof Error) {
        setDeleteError(err.message);
      } else {
        setDeleteError("Unable to delete contact.");
      }
    } finally {
      setDeleting(false);
    }
  }

  return (
    <ProtectedRoute>
      <>
        <main className="min-h-screen bg-gray-50">
          <div className="mx-auto max-w-6xl p-8">

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold">
                Contacts
              </h1>

              <p className="mt-1 text-gray-600">
                Manage all your contacts in one place.
              </p>
            </div>

            <AlertMessage
              variant="error"
              title="Unable to Load Contacts"
              message={error}
            />

            {/* Toolbar */}
            <div className="mb-6 rounded-xl border bg-white p-4 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div className="w-full md:max-w-md">
                  <TextInput
                    label=""
                    placeholder="Search by name, email or phone..."
                    value={search}
                    onChange={setSearch}
                  />
                </div>

                <Link
                  href="/contacts/new"
                  className="rounded-md bg-blue-600 px-4 py-2 text-center text-white transition hover:bg-blue-700"
                >
                  Add Contact
                </Link>

              </div>
            </div>

            <AlertMessage
              variant="error"
              title="Delete Failed"
              message={deleteError}
            />

            {loading ? (
              <LoadingState />
            ) : contacts.length === 0 ? (
              <EmptyState />
            ) : (
              <ContactList
                contacts={contacts}
                onDelete={setSelected}
              />
            )}

          </div>
        </main>

        <DeleteContactDialog
          open={!!selected}
          loading={deleting}
          contactName={selected?.name ?? ""}
          onCancel={() => setSelected(null)}
          onConfirm={handleDelete}
        />
      </>
    </ProtectedRoute>
  );
}