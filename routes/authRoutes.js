import { Router } from "express";

const authRoutes = Router();

const authMiddleware = (req, res, next) => {
  console.log(req.body);
  console.log("middleware");
  //logic kiem tra xong
  next();
};

authRoutes.post("/register", authMiddleware, async (req, res) => {
  console.log(req.body);
  console.log("Dang ky thanh cong");
});

authRoutes.post("/login", authMiddleware, async (req, res) => {
  console.log("dang nhap thanh cong");
});

export default authRoutes;
