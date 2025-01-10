import { Router } from "express";
import productRoutes from "./productRoutes.js";
import authRoutes from "./authRoutes.js";
import categoryRouter from "./categoryRoutes.js";

const routes = Router();

routes.use("/products", productRoutes);
routes.use("/auth", authRoutes);
routes.use("/categories", categoryRouter);

// GET ALL: /products/
// GET BY ID: /products/:id
// CREATE: /products

export default routes;
