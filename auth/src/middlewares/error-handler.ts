import { type Request, type Response, type NextFunction } from "express";
import { CustomError } from "../errors/custom-error.js";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof CustomError) {
    const errors = err.serializeErrors();
    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({ errors });
  }

  res.status(400).json({
    errors: [{ message: "Something went wrong" }],
  });
};
