//Common js/ module js

import { createServer } from "node:http";
const hostname = "127.0.0.1";
const port = 3000;

const users = [
  { id: 1, email: "giangnguyen@gmail.com", address: "BG" },
  { id: 2, email: "giangnguyen@gmail.com", address: "HN" },
];

const server = createServer((req, res) => {
  // request =>
  // response <=
  const url = req.url;
  const method = req.method;
  if (url === "/users" && method === "GET") {
    console.log(req.url);
    console.log(req.method);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        message: "Lay danh sach khach hang thanh cong",
        users,
      })
    );
  } else if (url === "/users" && method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      console.log(chunk);
      body += chunk.toString();
    });
    req.on("end", () => {
      const { email, address } = JSON.parse(body);
      const newUser = {
        id: users.length + 1,
        email,
        address,
      };
      users.push(newUser);
      res.writeHead(201);
      res.end(JSON.stringify(newUser));
    });
  } else if (url.match(/\/users\/\d+/) && method === "PUT") {
    // /users/2 => ["", "users", "2"]
    const id = parseInt(url.split("/")[2]);
    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex !== -1) {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        const { email, address } = JSON.parse(body);
        users[userIndex] = { id, email, address };
        res.writeHead(200);
        res.end(JSON.stringify(users[userIndex]));
      });
    } else {
      res.writeHead(404);

      res.end(JSON.stringify({ message: "User not found" }));
    }
  } else if (url.match(/\/users\/\d+/) && method === "DELETE") {
    const id = parseInt(url.split("/")[2]);
    const deleteUser = users.filter((u) => u.id !== id);
    if (deleteUser) {
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          message: "Xoa thanh cong",
          deleteUser,
        })
      );
    }
  } else if (url.startsWith("/users/") && method === "GET") {
    const id = parseInt(url.split("/")[2]);
    const user = users.find((item) => item.id === id);
    if (user) {
      return res.end(
        JSON.stringify({
          message: "Get user detail successfully",
          user,
        })
      );
    }
    return res.end({
      message: "Not found user",
    });
  } else {
    // error handling
    console.log("Router not found");
    res.end("Router not found");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
