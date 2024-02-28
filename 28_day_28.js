const express = require("express");
const http = require("http");
const webSocket = require("ws");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname)));
const server = http.createServer(app);

const wss = new webSocket.Server({ server });
wss.on("connection", (ws) => {
  console.log("A Client Is Connected");
  ws.on("message", (message) => {
    console.log("Message Received : ", message.toString());
    wss.clients.forEach((client) => {
      if (client.readyState === webSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });
  ws.on("close", () => {
    console.log("A Client Disconnected");
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "wss.html"));
});

server.listen(3000, () => {
  console.log("Server Is Listening On Port 3000");
});
