import mongoose, { version } from "mongoose";

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

const User = mongoose.model("User", userSchema);

export default User;
