import { Router } from "express";
import categorySchema from "./../validations/categoryValid.js";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  removeCategory,
  restoreCategory,
  softDeleteCategory,
  updateCategoryById,
} from "../controllers/categoryController.js";
import { validBodyRequest } from "../middlewares/validBodyRequest.js";

const categoryRouter = Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.post("/", validBodyRequest(categorySchema), createCategory);
categoryRouter.patch(
  "/:id",
  validBodyRequest(categorySchema),
  updateCategoryById
);
categoryRouter.patch("/soft-delete/:id", softDeleteCategory);
categoryRouter.delete("/:id", removeCategory);
categoryRouter.patch("/restore/:id", restoreCategory);

export default categoryRouter;
