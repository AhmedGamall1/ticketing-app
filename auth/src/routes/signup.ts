import express, { type Request, type Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error.js";
import { User } from "../models/user.js";
import { BadRequestError } from "../errors/bad-request-error.js";
import jwt from "jsonwebtoken";
import { validateRequest } from "../middlewares/validate-request.js";

const router = express.Router();
const signupValidation = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Password must be between 4 and 20 characters"),
];

router.post(
  "/api/users/signup",
  signupValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Check user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    // Create and save the user
    const user = User.build({ email, password });
    await user.save();

    // Generate JWT and set it on the session object
    const userJwt = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_KEY!,
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(201).json(user);
  },
);

export { router as signupRouter };
