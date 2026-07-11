import { apiFetch } from "./api";
import type { Contact, ContactWithImages } from "@/types/contact";

export interface CreateContactRequest {
  name: string;
  email: string;
  phone: string;
  contactType: "personal" | "professional";
  images: string[];
}

export interface ContactsResponse {
  contacts: ContactWithImages[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function getContacts(search = "") {
  const params = new URLSearchParams();

  if (search.trim()) {
    params.set("search", search.trim());
  }

  const query = params.toString();

  return apiFetch<ContactsResponse>(
    `/contacts${query ? `?${query}` : ""}`
  );
}
export function getContact(id: string) {
  return apiFetch<ContactWithImages>(`/contacts/${id}`);
}
export function createContact(
  data: CreateContactRequest
) {
  return apiFetch<Contact>("/contacts", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateContact(
  id: string,
  data: CreateContactRequest
) {
  return apiFetch<Contact>(`/contacts/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteContact(id: string) {
  return apiFetch<void>(`/contacts/${id}`, {
    method: "DELETE",
  });
}