import { ZodError } from "zod";
import { AppError } from "./AppError.js";

export const handleError = (error: unknown) => {
  console.error(error);

  if (error instanceof ZodError) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Validation failed",
        errors: error.issues,
      }),
    };
  }

  if (error instanceof AppError) {
    return {
      statusCode: error.statusCode,
      body: JSON.stringify({
        message: error.message,
      }),
    };
  }

  return {
    statusCode: 500,
    body: JSON.stringify({
      message: "Internal Server Error",
    }),
  };
};