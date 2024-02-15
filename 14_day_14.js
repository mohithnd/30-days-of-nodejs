const express = require("express");

const app = express();

const cache = {};

function cachingMiddleware(req, res, next) {
  const url = req.originalUrl;
  const cachedResponse = cache[url];
  if (cachedResponse) {
    const { response, timestamp } = cachedResponse;
    if (Date.now() - timestamp < 10000) {
      // If the cached response is less than 10 seconds old, send it
      console.log("Returning cached response");
      return res.send(response);
    }
    console.log("Cached response expired, fetching new response");
    delete cache[url];
  }
  next();
}

app.use(cachingMiddleware);

app.get("/", (req, res) => {
  cache[req.originalUrl] = {
    response: "<h1>This is the demo for caching</h1>",
    timestamp: Date.now(),
  };
  res.send("<h1>This is the demo for caching</h1>");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
