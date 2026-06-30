import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    contactType: {
      type: String,
      enum: ["personal", "professional"],
      default: "personal",
    },
    
    images: {
      type: [String],
      default: [],
      validate: {
        validator: (images: string[]) =>
          images.length <= 5,
        message: "Maximum 5 images allowed",
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Contact = mongoose.model(
  "Contact",
  contactSchema
);