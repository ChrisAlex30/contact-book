import { APIGatewayProxyEvent } from "aws-lambda";

import {
  GetObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { connectDB } from "../db/connect.js";
import { Contact } from "../models/Contact.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const s3 = new S3Client({
  region: "ap-south-1",
});

const getContact = async (
  event: APIGatewayProxyEvent
) => {

  await connectDB();

  const userId =
    (event as any).requestContext.authorizer.jwt.claims.sub;

  const id = event.pathParameters?.id;

  const contact = await Contact.findOne({
    _id: id,
    userId,
  });

  if (!contact) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: "Contact not found.",
      }),
    };
  }

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
    statusCode: 200,
    body: JSON.stringify({
      ...contact.toObject(),
      imageUrls,
    }),
  };
};

export const handler =
  asyncHandler(getContact);
