const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendfile("index.html");
});

app.get("/styles/style.css", (req, res) => {
  res.sendfile("styles/style.css");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
