import dotenv from "dotenv";
import { WebSocketServer } from "ws";
import http from "http";
import express from "express";
import { nanoid } from "nanoid";
import * as cookie from "cookie";

dotenv.config();

const DB = {
  users: [
    { id: 1, username: "one", password: "pwd007" },
    { id: 2, username: "two", password: "pwd007" },
    { id: 3, username: "three", password: "pwd007" },
  ],
  tokens: {},
};

const app = express();
app.use(express.static("public"));

const server = http.createServer(app);

const wss = new WebSocketServer({ noServer: true, clientTracking: false });
const clients = new Map();

app.post("/login", express.json(), (req, res) => {
  const { username, password } = req.body;
  const user = DB.users.find((u) => u.username === username);

  if (!user) {
    return res.status(401).send("Unknown username");
  }
  if (user.password !== password) {
    return res.status(401).send("Wrong password");
  }

  const token = nanoid();
  DB.tokens[token] = user.id;
  res.cookie("token", token).json({ ok: true });
});

server.on("upgrade", (req, socket, head) => {
  const cookies = cookie.parse(req.headers["cookie"]);
  const token = cookies && cookies["token"];
  const userId = token && DB.tokens[token];

  if (!userId) {
    socket.write("HTTP/1.1 401 Unauthorization");
    socket.destroy();
    return;
  }

  req.userId = userId;
  wss.handleUpgrade(req, socket, head, (ws) => {
    wss.emit("connection", ws, req);
  });
});

wss.on("connection", (ws, req) => {
  const { userId } = req;

  clients.set(userId, ws);

  ws.on("close", () => {
    clients.delete(userId);
  });

  ws.on("message", async (message) => {
    try {
      const data = JSON.parse(message);
      if (data.type === "chat_mes") {
        const user = DB.users.find((u) => u.id === userId);
        const fullMessage = JSON.stringify({
          type: "chat_mes",
          message: data.message,
          name: user.username,
        });

        for (ws of clients.values()) {
          ws.send(fullMessage);
        }
      }
    } catch (err) {
      console.log("Ошибка парсинга JSON:", err);
    }
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Сервер запущен на порту ${process.env.PORT}...`);
});
