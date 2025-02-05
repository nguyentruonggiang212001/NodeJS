import Product from "../models/Product.js";
import Category from "./../models/Category.js";
import mongoose from "mongoose";
import {
  createProduct,
  getAllProduct,
  updateById,
} from "./../services/productServices.js";

export const getAll = async (req, res) => {
  try {
    const data = await getAllProduct();
    if (!data.length) {
      return res.status(404).json({
        message: "No products found!",
      });
    }
    return res.status(200).json({
      message: "ok",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error!",
      error: error.message || "Error!",
    });
  }
};

export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        message: "không tìm thấy category",
      });
    }
    const data = await Product.findById(id).populate("categoryId", "title");
    if (!data) {
      return res.status(404).json({
        message: "Not found!",
      });
    }
    return res.status(200).json({
      message: "Get successfully!",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Có lỗi xảy ra!",
      error: error,
    });
  }
};

export const create = async (req, res) => {
  let { title, price, categoryId, description } = req.body;

  if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId)) {
    // Bước 1: Nếu Id danh mục lỗi hoặc không có, sử dụng id danh mục mặc định "67836a60a83094583683c85e"
    categoryId = "6790ba28b992f20ef9e0ba80";
  } else {
    // Bước 2: Nếu Id danh mục hợp lệ, kiểm tra xem danh mục có thực sự còn tồn tại không
    const category = await Category.findById(categoryId);
    if (!category) {
      return next(new Error("Category not found"));
    }
  }
  // Bước 3: Tạo sản phẩm và lưu vào database
  // const product = await Product.create({
  //   title,
  //   price,
  //   categoryId,
  //   description,
  // });

  const product = await createProduct(req.body);

  // Bước 4: Thêm id sản phẩm vào danh mục trong database
  await Category.updateOne(
    { _id: categoryId },
    { $push: { products: product._id } }
  );
  // Bước 5: Trả về sản phẩm vừa tạo và thông báo thành công
  return res.status(201).json(product);
};

export const updatedById = async (req, res) => {
  try {
    const { id } = req.params;
    const dataBody = req.body;
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        message: "không tìm thấy category",
      });
    }
    // const data = await Product.findByIdAndUpdate(id, dataBody, {
    //   new: true,
    // });

    const data = await updateById(id, dataBody);

    if (!data) {
      return res.status(404).json({
        message: "Not found!",
      });
    }
    return res.status(200).json({
      message: "Update successfully!",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error!",
      error: error.message || "Error!",
    });
  }
};

export const removeById = async (req, res) => {
  try {
    const { id } = req.params;
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        message: "không tìm thấy category",
      });
    }
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({
        message: "Not found!",
      });
    }

    await Category.updateOne(
      { _id: product.categoryId },
      { $pull: { products: id } }
    );

    return res.status(200).json({
      message: "Delete successfully!",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error!",
      error: error.message || "Error!",
    });
  }
};

export const softDeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        message: "không tìm thấy category",
      });
    }
    const product = await Product.findByIdAndUpdate(id, {
      deletedAt: new Date(),
      isHidden: true,
    });
    if (!product) {
      return res.status(404).json({
        message: "Product not found!",
      });
    }
    return res.status(200).json({
      message: "Soft delete successfully!",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error!",
      error: error.message || "Error occurred while soft deleting the Product!",
    });
  }
};

export const restoreProduct = async (req, res) => {
  try {
    const { id } = req.params;
    // Kiểm tra ID hợp lệ
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    const product = await Product.findByIdAndUpdate(
      id,
      { deletedAt: null, isHidden: false },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    // Thêm id sản phẩm vào danh mục
    await Category.updateOne(
      { _id: product.categoryId },
      { $push: { products: id } }
    );
    return res.status(200).json({
      message: "Product restored successfully!",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error occurred while restoring the product",
      error: error.message,
    });
  }
};
