import express, { type Request, type Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error.js";
import { User } from "../models/user.js";
import { BadRequestError } from "../errors/bad-request-error.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  async (req: Request, res: Response) => {
    // Validate the incomming request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    // Extract data from the request body
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
