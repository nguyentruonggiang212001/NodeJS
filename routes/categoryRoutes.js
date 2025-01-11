import { Router } from "express";
import categorySchema from "./../validations/categoryValid.js";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  removeById,
  softDeleteCategory,
  updatedById,
} from "../controllers/categoryController.js";
import { validBodyRequest } from "../middlewares/validBodyRequest.js";

const categoryRouter = Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.post("/", validBodyRequest(categorySchema), createCategory);
categoryRouter.patch("/:id", validBodyRequest(categorySchema), updatedById);
categoryRouter.patch("/:id/soft-delete", softDeleteCategory);
categoryRouter.delete("/:id", removeById);

export default categoryRouter;
