import { Router } from "express";
import {
  getById,
  create,
  getAll,
  updatedById,
  removeById,
  softDeleteProduct,
} from "../controllers/productController.js";

import { validBodyRequest } from "./../middlewares/validBodyRequest.js";
import productsSchema from "./../validations/productValid.js";

const productRoutes = Router();

productRoutes.get("/", getAll);
productRoutes.get("/:id", getById);
productRoutes.post("/", validBodyRequest(productsSchema), create);
productRoutes.patch("/:id", updatedById);
productRoutes.patch("/:id/soft-delete", softDeleteProduct);
productRoutes.delete("/:id", removeById);

export default productRoutes;
