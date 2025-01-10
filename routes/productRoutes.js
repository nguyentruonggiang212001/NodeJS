import { Router } from "express";
import {
  getById,
  create,
  getAll,
  updatedById,
  removeById,
} from "../controllers/productController.js";
import { validBodyRequest } from "../validations/index.js";
import productsSchema from "../validations/productValid.js";

const productRoutes = Router();

productRoutes.get("/", getAll);
productRoutes.get("/:id", getById);
productRoutes.post("/", validBodyRequest(productsSchema), create);
productRoutes.patch("/:id", updatedById);
productRoutes.delete("/:id", removeById);

export default productRoutes;
