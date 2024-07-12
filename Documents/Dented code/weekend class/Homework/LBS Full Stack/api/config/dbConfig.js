import mongoose from "mongoose";

const MONGO_DB_CONNECTION_URL = "mongodb://localhost:27017/library_homework";

export const connectMongo = () => {
  try {
    const connect = mongoose.connect(MONGO_DB_CONNECTION_URL);
    if (connect) {
      console.log("Database connected at" + MONGO_DB_CONNECTION_URL);
    }
  } catch (error) {
    console.log("Error", error);
  }
};
