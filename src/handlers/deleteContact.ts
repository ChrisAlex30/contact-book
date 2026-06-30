import { APIGatewayProxyEvent } from "aws-lambda";
import {
  EventBridgeClient,
  PutEventsCommand,
} from "@aws-sdk/client-eventbridge";

import { connectDB } from "../db/connect.js";
import { Contact } from "../models/Contact.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  BadRequestError,
  NotFoundError,
} from "../utils/AppError.js";

const eventBridge = new EventBridgeClient({});

const deleteContact = async (
  event: APIGatewayProxyEvent
) => {
  await connectDB();

  const userId =
    (event as any).requestContext.authorizer.jwt.claims.sub;

  const contactId = event.pathParameters?.id;

  if (!contactId) {
    throw new BadRequestError("Contact id is required");
  }

  const contact = await Contact.findOneAndDelete({
    _id: contactId,
    userId,
  });

  if (!contact) {
    throw new NotFoundError("Contact not found");
  }

  if (contact.images.length > 0) {
    await eventBridge.send(
      new PutEventsCommand({
        Entries: [
          {
            Source: process.env.SERVICE_NAME!,
            DetailType: "ContactDeleted",
            EventBusName: process.env.EVENT_BUS_NAME!,
            Detail: JSON.stringify({
              contactId: contact._id,
              imageKeys: contact.images,
            }),
          },
        ],
      })
    );
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Contact deleted successfully",
    }),
  };
};

export const handler = asyncHandler(deleteContact);