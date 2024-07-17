import express from "express";
import cors from "cors";
import { connectMongo } from "./config/dbConfig.js";
import { userRouter } from "./routers/userRouter.js";

const app = express();
const PORT = 8000;

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to db
connectMongo();

// Routers
app.use("/api/user", userRouter);
// Start Server
app.listen(PORT, (error) => {
  error ? console.log("Error", error) : console.log("Server is running");
});
