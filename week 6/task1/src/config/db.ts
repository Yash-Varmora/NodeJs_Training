import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI as string);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};
