import Product from "./../models/Product.js";

export const updateById = async (id, bodyRequest) => {
  const product = await Product.findByIdAndUpdate(id, bodyRequest, {
    new: true,
    timestamps: true,
  });
  return product;
};

export const createProduct = async (productData) => {
  try {
    const newProduct = await Product.create(productData);
    return newProduct;
  } catch (error) {
    throw new Error(error.message || "Error creating product!");
  }
};

export const softDeleteProduct = async () => {};

export const getAllProduct = async () => {
  try {
    const dataList = await Product.find({
      isHidden: false,
      deletedAt: null,
    }).populate("categoryId");
    return dataList;
  } catch (error) {
    throw new Error(error.message || "Error!");
  }
};
