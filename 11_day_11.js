const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const secret = "Mohit Agrawal, This Is A Secret Key For JWT Token";
app.use(express.json());

function authenticationMiddleware(req, res, next) {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized status" });
  }
  try {
    const data = jwt.verify(token, secret);
    req.user = data;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized status" });
  }
}

app.get("/", (req, res) => {
  res.json({
    message: "Welcome To The Application",
  });
});

app.get("/login", authenticationMiddleware, (req, res) => {
  res.json({ message: "Login Successfull" });
});

app.get("/generateToken", (req, res) => {
  const token = jwt.sign({ username: "mohit" }, secret, { expiresIn: "1h" });
  res.json({ token: token });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
