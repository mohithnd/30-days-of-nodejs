const express = require("express");

const app = express();

function errorHandler(err, req, res, next) {
  let statusCode = 500;
  let message = "Internal Server Error";
  if (err.statusCode) {
    statusCode = err.statusCode;
    message = err.message;
  }
  res.status(statusCode).json({ error: message });
}

app.use(express.json());

app.get("/", (req, res, next) => {
  try {
    throw new Error("Custom Error");
  } catch (err) {
    next(err);
  }
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
