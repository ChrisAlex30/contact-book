import { APIGatewayProxyEvent } from "aws-lambda";

import { connectDB } from "../db/connect.js";
import { createContactSchema } from "../validators/contact.validator.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Contact } from "../models/Contact.js";

const createContacts = async (
  event: APIGatewayProxyEvent
) => {
  await connectDB();

  const userId =
    (event as any).requestContext.authorizer.jwt.claims.sub;

  const body = createContactSchema.parse(
    JSON.parse(event.body ?? "{}")
  );

  const contact = await Contact.create({
    ...body,
    userId,
  });

  return {
    statusCode: 201,
    body: JSON.stringify(contact),
  };
};

export const handler = asyncHandler(createContacts);