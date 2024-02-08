const express = require("express");

const app = express();

class PositiveIntegerError extends Error {
  constructor(message) {
    super(message);
    this.name = "PositiveIntegerError";
  }
}

function errorHandler(err, req, res, next) {
  if (err instanceof PositiveIntegerError) {
    res.status(400).json({ error: err.message });
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

function positiveIntegerHandler(req, res, next) {
  const number = parseInt(req.query.number);
  if (isNaN(number) || number < 0) {
    next(new PositiveIntegerError("Number must be a positive integer"));
  } else {
    res.json({ success: "Number is a positive integer" });
  }
}

app.use(errorHandler);

app.get("/positive", positiveIntegerHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
