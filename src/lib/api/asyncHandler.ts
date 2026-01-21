import { NextResponse } from "next/server";
import { ApiError } from "./ApiError";

type RouteHandler = (req: Request, ...args: any[]) => Promise<any>;

export const asyncHandler = (handler: RouteHandler) => {
  return async (req: Request, ...args: any[]) => {
    try {
      // Execute the actual route logic
      return await handler(req, ...args);
    } catch (error: any) {
      // Handle known ApiErrors
      if (error instanceof ApiError) {
        return NextResponse.json(
          {
            success: false,
            message: error.message,
            errors: error.errors,
          },
          { status: error.statusCode }
        );
      }

      // Handle unknown/system errors (500)
      console.error("Unhandled API Error:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Internal Server Error",
        },
        { status: 500 }
      );
    }
  };
};