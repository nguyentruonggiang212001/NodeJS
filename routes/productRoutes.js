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

const productRoutes = Router();

productRoutes.get("/", getAll);
productRoutes.get("/:id", getById);
productRoutes.post("/", validBodyRequest(productsSchema), create);
productRoutes.patch("/:id", validBodyRequest(productsSchema), updatedById);
productRoutes.patch("/soft-delete/:id", softDeleteProduct);
productRoutes.delete("/:id", removeById);
productRoutes.patch("/restore/:id", restoreProduct);

export default productRoutes;
