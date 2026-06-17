import { z } from "zod";

export const createContactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100),

  email: z
    .email("Invalid email address"),

  image: z
    .url("Invalid image URL")
    .optional(),

  contactType: z
    .enum(["personal", "professional"])
    .default("personal")
});

export type CreateContactInput =
  z.infer<typeof createContactSchema>;
