import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";

import { handleError } from "./errorHandler.js";

export const asyncHandler =
  (
    fn: (
      event: APIGatewayProxyEvent
    ) => Promise<APIGatewayProxyResult>
  ) =>
  async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    try {
      return await fn(event);
    } catch (error) {
      return handleError(error);
    }
  };