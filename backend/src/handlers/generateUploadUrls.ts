import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

import { ContentType, generateUploadUrlsSchema } from "../validators/upload.validator.js";

const s3 = new S3Client({
  region: "ap-south-1",
});

const mimeToExt: Record<ContentType, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
} as const;

export const handler = async (event: any) => {
  const userId =
    event.requestContext.authorizer.jwt.claims.sub;

  const { files } = generateUploadUrlsSchema.parse(
    JSON.parse(event.body ?? "{}")
  );

  const uploads = await Promise.all(
    files.map(async ({ contentType }) => {
      const extension = mimeToExt[contentType];

      const fileName = crypto.randomUUID();

      const key = `contacts/${userId}/${fileName}.${extension}`;

      const command = new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: key,
        ContentType: contentType,
      });

      const uploadUrl = await getSignedUrl(
        s3,
        command,
        {
          expiresIn: 300,
        }
      );

      return {
        key,
        uploadUrl,
      };
    })
  );

  return {
    statusCode: 200,
    body: JSON.stringify({
      uploads,
    }),
  };
};