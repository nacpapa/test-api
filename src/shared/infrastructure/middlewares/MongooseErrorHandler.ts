import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export const mongooseErrorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let message = "An error occurred.";
  let statusCode = 500;

  switch (true) {
    // Mongoose Validation Error
    case err instanceof mongoose.Error.ValidationError:
      message = "Validation error occurred.";
      statusCode = 400;
      const validationErrors = Object.values(err.errors).map(
        (e: any) => e.message
      );
      res
        .status(statusCode)
        .json({ error: message, details: validationErrors });
      break;

    // Mongoose Duplicate Key Error (MongoDB Error 11000)
    case err.code === 11000:
      message = "Duplicate key error. A unique constraint was violated.";
      statusCode = 409; // Conflict
      const duplicatedField = Object.keys(err.keyPattern).join(", ");
      res.status(statusCode).json({
        error: message,
        field: duplicatedField,
      });
      break;

    // Mongoose Cast Error (Invalid ObjectId)
    case err instanceof mongoose.Error.CastError:
      message = `Invalid value for the field ${err.path}.`;
      statusCode = 400;
      res.status(statusCode).json({ error: message });
      break;

    // Mongoose Network Error (like a disconnection or timeout)
    case err.message && err.message.includes("ECONNREFUSED"):
      message = "Cannot connect to the database. Connection refused.";
      statusCode = 503; // Service Unavailable
      res.status(statusCode).json({ error: message });
      break;

    // General Mongoose or MongoDB Error
    case err instanceof mongoose.Error || err.name === "MongoError":
      message = "A MongoDB error occurred.";
      res.status(statusCode).json({ error: message });
      break;

    // Fallback for unknown errors
    default:
      console.log("Unknown error type");
      console.log(err);
      res.status(500).json({ error: "An unexpected error occurred." });
      break;
  }

  // Pass the error to the next middleware if needed
  next(err);
};
