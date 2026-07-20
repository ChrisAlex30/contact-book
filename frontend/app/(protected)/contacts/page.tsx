import type { Metadata } from "next";

import ContactsPageClient from "@/components/contacts/ContactsPageClient";

export const metadata: Metadata = {
  title: "Contacts | Contact Book",
};

export default function Page() {
  return <ContactsPageClient />;
}