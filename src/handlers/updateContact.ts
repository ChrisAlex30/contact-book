import { APIGatewayProxyEvent } from "aws-lambda";

import { connectDB } from "../db/connect.js";
import { updateContactSchema } from "../validators/contact.validator.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Contact } from "../models/Contact.js";

import {
  EventBridgeClient,
  PutEventsCommand,
} from "@aws-sdk/client-eventbridge";

const eventBridge = new EventBridgeClient({});

const updateContact = async (
  event: APIGatewayProxyEvent
) => {
  await connectDB();

  const userId =
    (event as any).requestContext.authorizer.jwt.claims.sub;

  const contactId = event.pathParameters?.id;

  if (!contactId) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Contact id is required",
      }),
    };
  }

  const body = updateContactSchema.parse(
    JSON.parse(event.body ?? "{}")
  );

  const contact = await Contact.findOne({
    _id: contactId,
    userId,
  });

  if (!contact) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: "Contact not found",
      }),
    };
  }

  const oldImages = [...contact.images];

  contact.name = body.name ?? contact.name;
  contact.email = body.email ?? contact.email;
  contact.phone = body.phone ?? contact.phone;
  contact.contactType =
    body.contactType ?? contact.contactType;
  contact.images = body.images ?? contact.images;

  await contact.save();

  const deletedImages = oldImages.filter(
    (image) => !contact.images.includes(image)
    );

console.log("Deleted Images:", deletedImages);

if (deletedImages.length > 0) {
    console.log(
  JSON.stringify(
    {
      contactId: contact._id,
      deletedImages,
    },
    null,
    2
  )
);
  await eventBridge.send(
    new PutEventsCommand({
      Entries: [
        {
          EventBusName: process.env.EVENT_BUS_NAME,

          Source: process.env.SERVICE_NAME,

          DetailType: "ContactImageDeleted",

          Detail: JSON.stringify({
            contactId: contact._id.toString(),
            userId,
            deletedImages,
          }),
        },
      ],
    })
  );
}

  return {
    statusCode: 200,
    body: JSON.stringify(contact),
  };
};

export const handler = asyncHandler(updateContact);