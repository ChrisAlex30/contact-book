import mongoose from "mongoose";
import { env } from "./env.js";


let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    return;
  }

  const conn = await mongoose.connect(
    env.MONGO_URI
  );

  isConnected =
    conn.connections[0].readyState === 1;

  console.log("Mongo Connected");
};