export interface Contact {
  _id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  contactType: "personal" | "professional";
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ContactImageUrl {
  key: string;
  url: string;
}

export interface ContactWithImages extends Contact {
  imageUrls: ContactImageUrl[];
}