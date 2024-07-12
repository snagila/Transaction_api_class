import express from "express";
import { newUserValidation } from "../validationMiddleware/userValidation.js";
import { hashPassword } from "../utility/bcryptHelper.js";
import { createUser } from "../model/userModel.js";
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
