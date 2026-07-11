import type {  ContactWithImages } from "@/types/contact";

import ContactCard from "./ContactCard";

interface Props {
  contacts: ContactWithImages[];
  onDelete: (contact: ContactWithImages) => void;
}

export default function ContactList({
  contacts,
  onDelete,
}: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {contacts.map((contact) => (
        <ContactCard
          key={contact._id}
          contact={contact}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}