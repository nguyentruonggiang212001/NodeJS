import Product from "../models/Product.js";
import Category from "./../models/Category.js";

export const create = async (req, res) => {
  try {
    // Nếu không có categoryId hoặc categoryId là chuỗi rỗng
    let categoryId = req.body.categoryId;
    if (!categoryId || categoryId.trim() === "") {
      // Kiểm tra danh mục "Uncategorized" đã tồn tại chưa
      let uncategorizedCategory = await Category.findOne({
        title: "Uncategorized",
      });
      if (!uncategorizedCategory) {
        // Tạo danh mục mới nếu chưa tồn tại
        uncategorizedCategory = await Category.create({
          title: "Uncategorized",
          products: [],
        });
      }
      categoryId = uncategorizedCategory._id;
    }

    // Tìm danh mục bằng categoryId
    const findCategoryById = await Category.findById(categoryId);
    if (!findCategoryById) {
      return res.status(404).json({
        message: "Không tìm thấy danh mục với categoryId này.",
      });
    }

    // Tạo sản phẩm mới
    const newProduct = await Product.create({ ...req.body, categoryId });
    // Thêm sản phẩm vào danh mục
    findCategoryById.products.push(newProduct._id);

    await findCategoryById.save();

    return res.status(201).send({
      message: "Tạo sản phẩm thành công!",
      product: newProduct,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Lỗi khi tạo sản phẩm!",
      error: error.message || "Đã xảy ra lỗi.",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const datas = await Product.find().populate("categoryId");
    if (!datas || datas.length === 0) {
      return res.status(404).send({
        message: "Not found!",
      });
    }
    return res.status(200).send({
      message: "Get successfully!",
      datas,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Error!",
      error: error.message || "Error!",
    });
  }
};
export const getById = async (req, res, next) => {
  try {
    const datas = await Product.findById(req.params.id);
    if (!datas) {
      return res.status(404).send({
        message: "Not found!",
      });
    }
    return res.status(200).send({
      message: "Get successfully!",
      datas,
    });
  } catch (error) {
    next();
  }
};
export const softDeleteProduct = async (req, res) => {
  try {
    const softDeletedProduct = await Product.findByIdAndUpdate(req.params.id, {
      deletedAt: new Date(),
      isHidden: true,
    });
    if (!softDeletedProduct) {
      return res.status(404).json({
        message: "Product not found!",
      });
    }
    return res.status(200).json({
      message: "Soft delete successfully!",
      softDeletedProduct,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error!",
      error: error.message || "Error occurred while soft deleting the Product!",
    });
  }
};

export const removeById = async (req, res) => {
  try {
    const datas = await Product.findByIdAndDelete(req.params.id);
    if (!datas) {
      return res.status(404).send({
        message: "Not found!",
      });
    }
    return res.status(200).send({
      message: "Delete successfully!",
      datas,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Error!",
      error: error.message || "Error!",
    });
  }
};

export const updatedById = async (req, res) => {
  try {
    const datas = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      timestamps: true,
    });
    if (!datas) {
      return res.status(404).send({
        message: "Not found!",
      });
    }
    return res.status(200).send({
      message: "Update successfully!",
      datas,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Error!",
      error: error.message || "Error!",
    });
  }
};
