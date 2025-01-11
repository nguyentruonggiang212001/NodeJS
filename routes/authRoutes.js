import { Router } from "express";
import { validBodyRequest } from "./../middlewares/validBodyRequest.js";
import { loginSchema, registerSchema } from "../validations/authSchema.js";
import { login, register } from "./../controllers/authControllers.js";

const authRoutes = Router();

authRoutes.post("/register", validBodyRequest(registerSchema), register);

authRoutes.post("/login", validBodyRequest(loginSchema), login);

export default authRoutes;
