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
    const formattedErrors = err.errors.map((error) => {
      if (error.type === "field") {
        return { message: error.msg, field: error.path };
      }
    });
    return res.status(400).json({ errors: formattedErrors });
  }

  if (err instanceof DatabaseConnectionError) {
    return res.status(500).json({ errors: [{ message: err.reason }] });
  }
  res.status(400).json({
    errors: [{ message: "Something went wrong" }],
  });
};
