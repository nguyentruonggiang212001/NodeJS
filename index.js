// npm i express

import express from "express";
import mongoose from "mongoose";
import User from "./models/user.js";

const app = express();
const PORT = 8888;

// middleware
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/giang-db")
  .then(() => {
    console.log("Connect database successfully!");
  })
  .catch((error) => {
    console.error(`Connect failed:${error}`);
  });

app.get("/products", async (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
