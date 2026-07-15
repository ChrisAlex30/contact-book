"use client";

import { useEffect, useState } from "react";

import { getContacts } from "@/lib/contact";

import useDebounce from "./useDebounce";

import type { ContactWithImages } from "@/types/contact";

type sortType="-createdAt"| "createdAt" | "name" | "-name" | "email" | "-email";

export default function useContacts() {
  const [contacts, setContacts] = useState<ContactWithImages[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    total: 0,
    totalPages: 1,
  });

  const debouncedSearch = useDebounce(search, 300);

  const [sort, setSort] = useState<sortType>("-createdAt");

  async function loadContacts(
  search = "",
  currentPage = page,
  currentSort = sort
) {
  try {
    setLoading(true);

    const data = await getContacts(
      search,
      currentPage,
      currentSort
    );

    setContacts(data.contacts);
    setPagination(data.pagination);
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
      setPage(1);
    }, [debouncedSearch,sort]);

    useEffect(() => {
      loadContacts(debouncedSearch, page,sort);
    }, [debouncedSearch, page,sort]);
  return {
    contacts,
    loading,
    error,

    search,
    setSearch,

    refresh: () =>
      loadContacts(
        debouncedSearch,
        page,
        sort
      ),

    pagination,

    page,
    setPage,

    sort,
    setSort
  };
}