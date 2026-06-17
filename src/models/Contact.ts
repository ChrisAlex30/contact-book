import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    image: {
      type: String
    },

    contactType: {
      type: String,
      enum: ["personal", "professional"],
      default: "personal"
    }
  },
  {
    timestamps: true
  }
);

export const Contact = mongoose.model("Contact", contactSchema);