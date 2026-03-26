import express from "express";
import { NotFoundError, currentUser, errorHandler } from "@tickets2004/common";
import cookieSession from "cookie-session";
import { createTicketRouter } from "./routes/new.js";

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
app.use(currentUser);

// routes
app.use(createTicketRouter);

// undefined route handler
app.use((req, res, next) => {
  throw new NotFoundError();
});

// error handler middleware
app.use(errorHandler);

export { app };
