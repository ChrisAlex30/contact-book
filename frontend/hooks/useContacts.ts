"use client";

import { useEffect, useState } from "react";

import { getContacts } from "@/lib/contact";

import useDebounce from "./useDebounce";

import type { ContactWithImages } from "@/types/contact";

export default function useContacts() {
  const [contacts, setContacts] = useState<ContactWithImages[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const debouncedSearch =
    useDebounce(search, 300);

  async function loadContacts(
    search = ""
  ) {
    try {
      setLoading(true);

      const data =
        await getContacts(search);

      setContacts(data.contacts);

      setError("");
    } catch (err) {
      console.error(err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Unable to load contacts."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadContacts(debouncedSearch);
  }, [debouncedSearch]);

  return {
    contacts,
    loading,
    error,

    search,
    setSearch,

    refresh: () =>
      loadContacts(debouncedSearch),
  };
}