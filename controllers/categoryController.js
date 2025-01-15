import { handleError500 } from "../helpers/index.js";

import Category from "./../models/Category.js";

import mongoose from "mongoose";

export const getAllCategories = async (req, res, next) => {
  try {
    const data = await Category.find({ isHidden: false }).populate("products");
    if (!data.length) {
      return res.status(404).json({
        message: "không tìm thấy category",
      });
    }
    return res.status(200).json({
      message: "lấy danh category thành công",
      data,
    });
  } catch (error) {
    return handleError500(res, error);
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Không tìm thấy category",
      });
    }
    const data = await Category.findOne({
      _id: id,
      isHidden: false,
    }).populate("products");

    if (!data) {
      return res.status(404).json({
        message: "không tìm thấy dữ liệu",
      });
    }
    return res.status(200).json({
      message: "lấy category thành công",
      data,
    });
  } catch (error) {
    return handleError500(res, error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const data = await Category.create(req.body);

    if (!data) {
      return res.status(400).json({
        message: "lỗi khi khởi tạo category",
      });
    }
    return res.status(201).json({
      message: "tạo category thành công",
      data,
    });
  } catch (error) {
    return handleError500(res, error);
  }
};

export const updateCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const dataBody = req.body;

    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        message: "không tìm thấy category",
      });
    }
    const data = await Category.findByIdAndUpdate(id, dataBody, {
      new: true,
    });
    return res.status(200).json({
      message: "cập nhật thành công",
      data,
    });
  } catch (error) {
    return handleError500(res, error);
  }
};
export const removeCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        message: "không tìm thấy category",
      });
    }
    // Kiểm tra xem danh mục người dùng định xoá có phải danh mục mặc định không?
    if (id === "678249b3c6af5a6413213aab") {
      return res.status(400).json({
        message: "Không thể xóa danh mục mặc định",
      });
    }

    const data = await Category.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).json({
        message: "Category không tồn tại",
      });
    }

    await Product.updateMany(
      { categoryId: id },
      { categoryId: "678249b3c6af5a6413213aab" }
    );

    await Category.updateOne(
      { _id: "67678249b3c6af5a6413213aab" },
      { $push: { products: { $each: data.products } } }
    );

    return res.status(200).json({
      message: "xóa thành công category",
      data,
    });
  } catch (error) {
    return handleError500(res, error);
  }
};

export const softDeleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        message: "không tìm thấy category",
      });
    }

    const data = await Category.findByIdAndUpdate(
      id,
      { isHidden: true, deleteAt: new Date() },
      { new: true }
    );

    return res.status(200).json({
      message: "xóa mềm thành công",
      data,
    });
  } catch (error) {
    return handleError500(res, error);
  }
};
export const restoreCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        message: "không tìm thấy category",
      });
    }
    const data = await Category.findByIdAndUpdate(
      id,
      { isHidden: false, deleteAt: null },
      { new: true }
    );
    if (!data) {
      return res.status(404).json({
        message: "không tìm thấy category",
      });
    }

    return res.status(200).json({
      message: "khôi phục thành công",
      data,
    });
  } catch (error) {
    return handleError500(res, error);
  }
};
