import { z } from "zod";

const envSchema = z.object({
  MONGO_URI: z.url(),
});

export const env = envSchema.parse(
  process.env
);