import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      default: "number",
      enum: ["member", "admin", "superAdmin"],
    },
  },
  {
    version: false,
    timestamp: true,
  }
);

const User = mongoose.model("users", userSchema);

export default User;
