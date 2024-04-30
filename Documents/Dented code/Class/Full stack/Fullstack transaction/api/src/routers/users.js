import express from "express";
import { getUserByEmail, insertUser } from "../models/user/UserModel.js";
import { comparePassword, hasPassword } from "../utils/bcrypt.js";
const router = express.Router();

router.get("/", (req, res) => {
  try {
    res.json({
      status: "success",
      message: "todo get",
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    // console.log(req.body);
    req.body.password = hasPassword(req.body.password);
    const result = await insertUser(req.body);
    console.log(result);

    result?._id
      ? res.json({
          status: "success",
          message: "Your new account has been created. You may login now.",
        })
      : res.json({
          status: "error",
          message: "Unable to process your request. Please try again later",
        });
  } catch (error) {
    let code = 500;
    if (error.message.includes("E11000 duplicate key error collection")) {
      code = 200;
      error.message = "User already exists.";
    }
    res.status(code).json({
      status: "error",
      message: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = res.body;
    // get the user email and get user from the db
    const user = await getUserByEmail(email);
    if (user?._id) {
      // compare password
      const isMatched = comparePassword(password, user.password);
      if (isMatched) {
        // authorized
        return res.json({
          status: "success",
          message: "Logged in Successfully",
        });
      }
    }

    res.json({
      status: "error",
      message: "Invalid login credentials",
    });
  } catch (error) {
    let code = 500;

    res.status(code).json({
      status: "error",
      message: error.message,
    });
  }
});

export default router;
