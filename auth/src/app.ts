import express from "express";
import { currentUserRouter } from "./routes/current-user.js";
import { signoutRouter } from "./routes/signout.js";
import { signinRouter } from "./routes/signin.js";
import { signupRouter } from "./routes/signup.js";
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
app.use(currentUserRouter);
app.use(signoutRouter);
app.use(signinRouter);
app.use(signupRouter);

// undefined route handler
app.use((req, res, next) => {
  throw new NotFoundError();
});

// error handler middleware
app.use(errorHandler);

export { app };
