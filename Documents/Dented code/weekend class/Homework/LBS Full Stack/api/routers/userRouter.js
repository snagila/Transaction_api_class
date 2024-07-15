import express from "express";
import { newUserValidation } from "../validationMiddleware/userValidation.js";
import { comparePassword, hashPassword } from "../utility/bcryptHelper.js";
import { createUser, findUserByEmail } from "../model/userModel.js";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "../utility/responseHelper.js";

export const userRouter = express.Router();

// Create User | SignUp EndPoint

userRouter.post("/", newUserValidation, async (req, res) => {
  try {
    // hash the password before saving in the db
    const { password } = req.body;
    const hashedPassword = hashPassword(password);

    // query the db
    const result = await createUser({ ...req.body, password: hashedPassword });

    result._id
      ? buildSuccessResponse(res, result, "User created SuccessFully")
      : buildErrorResponse(res, "Could not create user.");
  } catch (error) {
    if (error.code === 11000) {
      error.message = "User with this email already exists.";
    }
    buildErrorResponse(res, error.message);
  }
});

// login user
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (user?._id) {
      const isPasswordMatched = comparePassword(password, user.password);
      const jwt= 
    }
  } catch (error) {}
});
