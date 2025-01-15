import express from "express";
import routes from "./routes/index.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const { PORT } = process.env;

const app = express();

app.use(express.json());

connectDB();

app.use("/", routes);

// Xu ly not found phai dat o sau cung cac routes
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}/api`);
});
