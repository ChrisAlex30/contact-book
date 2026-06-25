import { z } from "zod";

export const createContactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),

  email: z
    .email("Invalid email address")
    .trim()
    .toLowerCase(),

  phone: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 characters")
    .max(20, "Phone number cannot exceed 20 characters"),

  contactType: z
    .enum(["personal", "professional"])
    .default("personal"),

  images: z
    .array(z.string())
    .max(5, "Maximum 5 images allowed")
    .default([]),
});

export type CreateContactInput =
  z.infer<typeof createContactSchema>;