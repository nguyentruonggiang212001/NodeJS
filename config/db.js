import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const { MONGO_URI } = process.env;

const connectDB = async () => {
  try {
    const connected = await mongoose.connect(MONGO_URI);
    console.log(
      `Connected MongoDB: mongodb://${connected.connection.host}:${connected.connection.port}/${connected.connection.name}`
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
