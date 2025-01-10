import Product from "../models/Product.js";

/**
 * Buoc 1 : tao zod
 */

export const create = async (req, res) => {
  try {
    const datas = await Product.create(req.body);
    if (!datas) {
      return res.status(404).send({
        message: "Not found!",
      });
    }
    return res.status(200).send({
      message: "Create successfully!",
      datas,
    });
  } catch (error) {
    res.status(400).send({
      message: "Error",
    });
    return res.status(400).send({
      message: "Error!",
      error: error.message || "Error!",
    });
  }
};
export const getAll = async (req, res) => {
  try {
    const datas = await Product.find();
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
