const express = require("express");
const WebSocket = require("ws");
const path = require("path");

const app = express();

app.get("/websocket", (req, res) => {
  res.sendfile(path.join(__dirname, "websocket.html"));
});

const server = app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

const wss = new WebSocket.Server({ server: server });
wss.on("connection", (ws) => {
  console.log("Client connected.");
  ws.on("message", (message) => {
    console.log(`Received: ${message}`);
    ws.send(message);
  });
  ws.on("close", () => {
    console.log("Client disconnected.");
  });
});
