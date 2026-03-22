import express from "express";
import { NotFoundError, errorHandler } from "@tickets2004/common";
import cookieSession from "cookie-session";

const app = express();
app.set("trust proxy", true);

// middlewares
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  }),
);

// routes

// undefined route handler
app.use((req, res, next) => {
  throw new NotFoundError();
});

// error handler middleware
app.use(errorHandler);

export { app };
