import express from "express";
import { currentUserRouter } from "./routes/current-user.js";
import { signoutRouter } from "./routes/signout.js";
import { signinRouter } from "./routes/signin.js";
import { signupRouter } from "./routes/signup.js";

const app = express();

// middlewares
app.use(express.json());

// routes
app.use(currentUserRouter);
app.use(signoutRouter);
app.use(signinRouter);
app.use(signupRouter);

app.listen(3000, () => {
  console.log("Auth service is running on port 3000");
});
