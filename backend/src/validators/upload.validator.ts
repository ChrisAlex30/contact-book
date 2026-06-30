import z from "zod";

export const generateUploadUrlsSchema = z.object({
  files: z
    .array(
      z.object({
        contentType: z.enum([
          "image/jpeg",
          "image/png",
          "image/webp",
          "image/gif",
        ]),
      })
    )
    .min(1)
    .max(5),
});

export type ContentType =
  z.infer<
    typeof generateUploadUrlsSchema
  >["files"][number]["contentType"];