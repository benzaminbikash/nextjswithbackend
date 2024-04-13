import mongoose from "mongoose";

export const DatabaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connection successfully!");
  } catch (error) {
    console.log(error);
  }
};
