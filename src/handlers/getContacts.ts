import { APIGatewayProxyEvent } from "aws-lambda";
import {
  GetObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { connectDB } from "../db/connect.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Contact } from "../models/Contact.js";

const s3 = new S3Client({region: "ap-south-1"});
const allowedSortFields = [
  "name",
  "email",
  "phone",
  "createdAt",
] as const;


const getContacts = async (event: APIGatewayProxyEvent) => {

  await connectDB();
  const userId = (event as any).requestContext.authorizer.jwt.claims.sub;
  const page = Math.max(1,Number(event.queryStringParameters?.page) || 1);
  const limit = Math.min(50,Math.max(1,Number(event.queryStringParameters?.limit) || 10));
  const skip = (page - 1) * limit;

  const search = event.queryStringParameters?.search?.trim() ?? "";

  const filter: any = {
    userId,
  };
  if (search) {
  filter.$or = [
    {
      name: {
        $regex: search,
        $options: "i",
      },
    },
    {
      email: {
        $regex: search,
        $options: "i",
      },
    },
    {
      phone: {
        $regex: search,
        $options: "i",
      },
    },
  ];
  }

  const requestedSort =
  event.queryStringParameters?.sort ?? "-createdAt";

  const isDescending =
    requestedSort.startsWith("-");

  const sortField = isDescending
    ? requestedSort.substring(1)
    : requestedSort;

  const finalSortField = allowedSortFields.includes(sortField as any) ? sortField : "createdAt";

  const sortOption:Record<string, 1 | -1> = {
    [finalSortField]: isDescending ? -1 : 1,
  };

  const[total,contacts]=await Promise.all([
    Contact.countDocuments(filter),
    Contact.find(filter)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
  ])


  const contactsWithImages = await Promise.all(
    contacts.map(async (contact) => {
      const imageUrls = await Promise.all(
        contact.images.map(async (key: string) => {
          const command = new GetObjectCommand({Bucket: process.env.BUCKET_NAME,Key: key});
          return {
            key,
            url: await getSignedUrl(s3,command,{expiresIn: 3600})
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
    body: JSON.stringify({
    contacts: contactsWithImages,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  })
  };
};

export const handler =
  asyncHandler(getContacts);