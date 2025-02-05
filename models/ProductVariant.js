import mongoose, { Schema } from "mongoose";
import { generateSKU } from "./../utils/skuGenerator.js";

const productVariantSchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    sku: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true, versionKey: false }
);

// Middleware tự động tạo SKU trước khi lưu
productVariantSchema.pre("save", async function (next) {
  if (!this.sku) {
    const product = await mongoose.model("Product").findById(this.productId);
    if (product) {
      this.sku = generateSKU({
        productSlug: product.slug,
        productId: product._id,
        size: this.size,
        color: this.color,
      });
    }
  }
  next();
});

export default mongoose.model("ProductVariant", productVariantSchema);
