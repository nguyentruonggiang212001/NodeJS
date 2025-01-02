import mongoose from "mongoose";

const productsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: "Updating",
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Product", productsSchema);
