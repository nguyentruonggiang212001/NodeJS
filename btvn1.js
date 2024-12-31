import express from "express";

const app = express();
const PORT = 8888;
const uri = "http://localhost:3000";

// Middleware để parse JSON
app.use(express.json());

// Lấy tất cả products
app.get("/products", (req, res) => {
  fetch(`${uri}/products`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      res.send({
        message: "Get all users successfully",
        product: data,
      });
    });
});

// Lấy product theo ID
app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  fetch(`${uri}/products/${id}`)
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        res.send({
          message: "Get product successfully",
          product: data,
        });
      } else {
        res.status(404).send({ message: "Product not found" });
      }
    });
});

// Tạo 1 Product
app.post("/products", (req, res) => {
  const newProduct = req.body;
  fetch(`${uri}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
  })
    .then((res) => res.json())
    .then((data) => {
      res.status(201).send({
        message: "Product created successfully",
        product: data,
      });
    });
});

// Update Product
app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;
  fetch(`${uri}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedProduct),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        res.send({
          message: "Product updated successfully",
          product: data,
        });
      } else {
        res.status(404).send({ message: "Product not found" });
      }
    });
});

// Xóa 1 Product
app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  fetch(`${uri}/products/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        res.send({
          message: "Product deleted successfully",
        });
      } else {
        res.status(404).send({ message: "Product not found" });
      }
    });
});

// Nếu routes lỗi
app.use((req, res) => {
  res.status(404).json({ message: "Router not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
