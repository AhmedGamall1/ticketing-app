import express from "express";
import { currentUserRouter } from "./routes/current-user.js";
import { signoutRouter } from "./routes/signout.js";
import { signinRouter } from "./routes/signin.js";
import { signupRouter } from "./routes/signup.js";
import { errorHandler } from "./middlewares/error-handler.js";
import { NotFoundError } from "./errors/not-found-error.js";

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

app.listen(3000, () => {
  console.log("Auth service is running on port 3000");
});
