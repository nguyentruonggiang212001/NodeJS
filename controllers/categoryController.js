import Category from "./../models/Category.js";

export const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);

    if (!category) {
      return res.status(404).json({
        message: "Not found!",
      });
    }
    return res.status(200).json({
      message: "Create successfully!",
      category,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error",
    });
  }
};
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories || categories.length === 0) {
      return res.status(404).json({
        message: "Not found!",
      });
    }
    return res.status(200).json({
      message: "Get successfully!",
      categories,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error!",
      error: error.message || "Error!",
    });
  }
};
export const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        message: "Not found!",
      });
    }
    return res.status(200).json({
      message: "Get successfully!",
      category,
    });
  } catch (error) {
    next();
  }
};
export const softDeleteCategory = async (req, res) => {
  try {
    const softDeletedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        deletedAt: new Date(),
        isHidden: true,
      }
    );
    if (!softDeletedCategory) {
      return res.status(404).json({
        message: "Category not found!",
      });
    }
    return res.status(200).json({
      message: "Soft delete successfully!",
      softDeletedCategory,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error!",
      error:
        error.message || "Error occurred while soft deleting the category!",
    });
  }
};

export const removeById = async (req, res) => {
  try {
    const data = await Category.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).json({
        message: "Not found!",
      });
    }
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
export const updatedById = async (req, res) => {
  try {
    const datas = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      timestamps: true,
    });
    if (!datas) {
      return res.status(404).json({
        message: "Not found!",
      });
    }
    return res.status(200).json({
      message: "Update successfully!",
      datas,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error!",
      error: error.message || "Error!",
    });
  }
};
