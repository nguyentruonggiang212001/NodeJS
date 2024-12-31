// npm i express

import express from "express";

const app = express();
const PORT = 8888;
const uri = "http://localhost:3000";

const users = [{ id: 1, email: "h@gmail.com" }];

// middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, Express.js!");
});

app.get("/users", (req, res) => {
  fetch(`${uri}/users`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      res.send({
        message: "Get all users successfully",
        users: data,
      });
    });
  // res.send(users);
});

app.post("/users", (req, res) => {
  console.log(req.body);
  res.send("create successfully");
});

app.get("/hello", (req, res) => {
  res.send(`<h1>Hello, F8!</h1>`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
