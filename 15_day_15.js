const express = require("express");

const app = express();

function loggingMiddleware(req, res, next) {
  console.log("Request received at: ", Date.now());
  console.log("Request method: ", req.method);
  console.log("Request URL: ", req.originalUrl);
  console.log("Request IP: ", req.ip);
  console.log("Request headers: ", req.headers);
  next();
}

app.use(loggingMiddleware);

app.get("/", (req, res) => {
  res.send("<h1>This is the demo for logging</h1>");
});

app.get("/about", (req, res) => {
  res.send("<h3>This is the about page for my logging middleware demo</h3>");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
