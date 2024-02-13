const express = require("express");

const app = express();

const requestMap = new Map();

function rateLimitMiddleware(req, res, next) {
  const clientIp = req.ip;
  if (requestMap.has(clientIp)) {
    const lastRequestTime = requestMap.get(clientIp);
    const currentTime = Date.now();
    if (currentTime - lastRequestTime < 1000) {
      res.status(429).send("Too many requests");
    } else {
      requestMap.set(clientIp, Date.now());
      next();
    }
  } else {
    requestMap.set(clientIp, Date.now());
    next();
  }
}

app.get("/", rateLimitMiddleware, (req, res) => {
  res.send("This is the home page of the server");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
