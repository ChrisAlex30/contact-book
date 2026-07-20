import type { Metadata } from "next";

import EditContactsPageClient from "@/components/contacts/EditContactPageClient";

export const metadata: Metadata = {
  title: "Edit Contacts | Contact Book",
};

export default function Page() {
  return <EditContactsPageClient />;
}