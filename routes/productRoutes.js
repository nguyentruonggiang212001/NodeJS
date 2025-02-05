import { Router } from "express";
import {
  getById,
  create,
  getAll,
  updatedById,
  removeById,
  softDeleteProduct,
  restoreProduct,
} from "../controllers/productController.js";

import { validBodyRequest } from "./../middlewares/validBodyRequest.js";
import productsSchema from "./../validations/productValid.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const productRoutes = Router();

async function verifyUser(req, res, next) {
  // Buoc 1: Kiem tra token có được gửi trong headers hay không?
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "alo");
  console.log(token);
  if (!decoded) {
    return res.status(401).json({
      message: "Un Authorized",
    });
  }

  // Bước 2: Xác thực user dựa vào payload, phân quyền
  const userExist = await User.findById(decoded._id);
  if (!userExist || userExist.role !== "admin") {
    return res.status(401).json({
      message: "Un Authorized",
    });
  }

  next();
}

productRoutes.get("/", getAll);
productRoutes.get("/:id", getById);
productRoutes.post("/", verifyUser, validBodyRequest(productsSchema), create);
productRoutes.patch("/:id", validBodyRequest(productsSchema), updatedById);
productRoutes.patch("/soft-delete/:id", softDeleteProduct);
productRoutes.delete("/:id", removeById);
productRoutes.patch("/restore/:id", restoreProduct);

export default productRoutes;
