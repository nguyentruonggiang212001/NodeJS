import { Router } from "express";
import { validBodyRequest } from "../validations/index.js";
import categorySchema from "./../validations/categoryValid.js";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  removeById,
  softDeleteCategory,
  updatedById,
} from "../controllers/categoryController.js";

const categoryRouter = Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.post("/", validBodyRequest(categorySchema), createCategory);
categoryRouter.patch("/:id", updatedById);
categoryRouter.patch("/:id/soft-delete", softDeleteCategory);
categoryRouter.delete("/:id", removeById);

export default categoryRouter;
