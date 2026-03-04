import express from "express";
import { currentUserRouter } from "./routes/current-user.js";
import { signoutRouter } from "./routes/signout.js";
import { signinRouter } from "./routes/signin.js";
import { signupRouter } from "./routes/signup.js";
import { errorHandler } from "./middlewares/error-handler.js";
import { NotFoundError } from "./errors/not-found-error.js";
import mongoose from "mongoose";

const app = express();

// middlewares
app.use(express.json());

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

const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to MongoDB");

    app.listen(3000, () => {
      console.log("Auth service is running on port 3000");
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};

start();
