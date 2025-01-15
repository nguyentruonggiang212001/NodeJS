import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const { MONGO_URI } = process.env;

const connectDB = async () => {
  try {
    const connected = await mongoose.connect(MONGO_URI);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
