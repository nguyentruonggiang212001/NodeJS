import express from "express";
import mongoose from "mongoose";
import Products from "./models/product.js";

const app = express();
const PORT = 8888;

// middleware
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/giang-db")
  .then(() => {
    console.log("Connect database successfully!");
  })
  .catch((error) => {
    console.error(`Connect failed:${error}`);
  });

app.get("/products", async (req, res) => {
  try {
    // await MyModel.find({});
    const allProducts = await Products.find();
    res.status(200).json({
      message: "Lấy tất cả sản phẩm thành công",
      products: allProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Lỗi khi lấy ra được sản phẩm" });
  }
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Model.findById()
    const product = await await Products.findById(id);
    if (!product) {
      return res.status(404).send({ message: "Sản phẩm không tìm thấy" });
    }
    res.status(200).json({
      message: "Lấy sản phẩm thành công",
      product: product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Lỗi không lấy được ra sản phẩm" });
  }
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Model.findByIdAndDelete()
    const product = await Products.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .send({ message: "Không tìm thấy sản phẩm để xóa" });
    }
    res.status(200).send({
      message: "Xóa sản phẩm thành công",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Lỗi không xóa được sản phẩm" });
  }
});

app.post("/products", async (req, res) => {
  try {
    // Model.create(req.body)
    const addProduct = await Products.create(req.body);
    return res.status(201).json({
      message: "Tao san pham thanh cong",
      addProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Lỗi khi tạo sản phẩm" });
  }
});

app.patch("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Model.findByIdAndUpdate(id, dataUpdate, optional)
    const product = await Products.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).send({ message: "Sản phẩm không tìm thấy" });
    }
    return res.status(200).json({
      message: "Cập nhập thành công sản phẩm",
      product: product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Lỗi koong cập nhật được sản phẩm" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
