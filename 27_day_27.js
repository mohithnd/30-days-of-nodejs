const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const secretKey =
  "Real Powerfull People Rules And Controls The World Behind The Wall.";
app.use(express.json());

const users = [
  { id: 1, username: "admin", password: "adminpassword", role: "admin" },
  { id: 2, username: "user", password: "userpassword", role: "user" },
];

function authenticateAndAuthorize(req, res, next) {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    const user = users.find((u) => u.id === decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Invalid token." });
    }
    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied. You don't have permission." });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token." });
  }
}

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    return res.status(400).json({ message: "Invalid username or password." });
  }
  const token = jwt.sign({ id: user.id }, secretKey);
  res.json({ token });
});

app.get("/admin", authenticateAndAuthorize, (req, res) => {
  res.json({ message: "Welcome to admin area!" });
});

app.listen(3000, () => {
  console.log("Server Is Listening On Port 3000");
});
