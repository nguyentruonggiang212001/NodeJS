import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      require: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      default: "member",
      enum: ["member", "admin", "superAdmin"],
      require: true,
    },
  },
  {
    versionKey: false,
    timestamp: true,
  }
);

const User = mongoose.model("users", userSchema);

export default User;
