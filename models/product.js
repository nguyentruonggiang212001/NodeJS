import mongoose, { Schema } from "mongoose";
import slugMiddleware from "../middlewares/slugMiddleware.js";

const productsSchema = new Schema(
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
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    isHidden: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    slug: {
      type: String,
      unique: true,
    },
    rate: {
      type: Number,
    },
    soldCount: {
      type: Number,
      default: 0,
    },
    variants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductVariant",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

productsSchema.virtual("variantsData", {
  ref: "ProductVariant",
  localField: "variants",
  foreignField: "_id",
});

productsSchema.plugin(slugMiddleware("title", "slug"));

const Product = mongoose.model("Product", productsSchema);

export default Product;
