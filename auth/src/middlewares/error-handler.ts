import { type Request, type Response, type NextFunction } from "express";
import { RequestValidationError } from "../errors/request-validation-error.js";
import { DatabaseConnectionError } from "../errors/database-connection-error.js";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof RequestValidationError) {
    console.log("Handling request validation error");
  }

  if (err instanceof DatabaseConnectionError) {
    console.log("Handling database error");
  }
  res.status(400).json({
    message: err.message,
  });
};
