import jwt from "jsonwebtoken";
import express, { type Request, type Response } from "express";
import { body } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error.js";
import { User } from "../models/user.js";
import { Password } from "../services/password.js";
import { validateRequest } from "../middlewares/validate-request.js";

const router = express.Router();
const signinValidation = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password").trim().notEmpty().withMessage("Password must be provided"),
];

router.post(
  "/api/users/signin",
  signinValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password,
    );

    if (!passwordsMatch) {
      throw new BadRequestError("Invalid credentials");
    }

    // Generate JWT and set it on the session object
    const userJwt = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!,
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(200).json(existingUser);
  },
);

export { router as signinRouter };
