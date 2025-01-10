import mongoose from "mongoose";

const Schema = mongoose;

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    isHidden: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    deletedAt: {
      type: Date,
      default: null,
    },

    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
