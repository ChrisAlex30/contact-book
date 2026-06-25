import { APIGatewayProxyEvent } from "aws-lambda";
import {
  GetObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { connectDB } from "../db/connect.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Contact } from "../models/Contact.js";

const s3 = new S3Client({
  region: "ap-south-1",
});

const getContacts = async (
  event: APIGatewayProxyEvent
) => {
  await connectDB();

  const userId =
    (event as any).requestContext.authorizer.jwt.claims.sub;

  const contacts = await Contact.find({
    userId,
  }).sort({
    createdAt: -1,
  });

  const contactsWithImages = await Promise.all(
    contacts.map(async (contact) => {
      const imageUrls = await Promise.all(
        contact.images.map(async (key: string) => {
          const command = new GetObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: key,
          });

          return {
            key,
            url: await getSignedUrl(
              s3,
              command,
              {
                expiresIn: 3600,
              }
            ),
          };
        })
      );

      return {
        ...contact.toObject(),
        imageUrls,
      };
    })
  );

  return {
    statusCode: 200,
    body: JSON.stringify(
      contactsWithImages
    ),
  };
};

export const handler =
  asyncHandler(getContacts);