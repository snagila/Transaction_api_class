import express from "express";
import { insertUser } from "../models/user/UserModel.js";
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
    console.log(req.body);

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

export default router;
