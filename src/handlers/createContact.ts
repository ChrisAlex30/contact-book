import { APIGatewayProxyEvent } from "aws-lambda";

import { connectDB } from "../db/connect.js";
import { createContactSchema } from "../validators/contact.validator.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import z from "zod";
import { Contact } from "../models/Contact.js";

const createContacts = async (
  event: APIGatewayProxyEvent
) => {
    await connectDB();

    const parsed = createContactSchema.safeParse(
      JSON.parse(event.body || "{}")
    );

    if (!parsed.success) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Validation failed",
          errors: z.treeifyError(parsed.error),
        }),
      };
    }

    const body = parsed.data;

    const contact = await Contact.create(body);

    
    return {
      statusCode: 201,
      body: JSON.stringify(contact)
    };
};

export const handler =asyncHandler(createContacts);