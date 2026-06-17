import { connectDB } from "../db/connect.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Contact } from "../models/Contact.js";

const getContacts= async () => {

    await connectDB();

    const contacts = await Contact.find();

    return {
      statusCode: 200,
      body: JSON.stringify(contacts),
    };
};

export const handler =asyncHandler(getContacts);