import cors from "cors";
import express from "express";
import { createServer } from "node:http";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Server } from "socket.io";

const app = express();
app.use(cors({ origin: true }));

const server = createServer(app);
const io = new Server(server);

const __basedir = dirname(fileURLToPath(import.meta.url));
app.use(express.static(__basedir));

app.get("/", (_, res) => {
  res.sendFile(join(__basedir, "index.html"));
});

io.on("connection", (socket) => {
  console.log("A user connected!");

  socket.on("disconnect", () => {
    console.log("A user disconnected!");
  });

  socket.on("join_room", (roomName) => {
    socket.join(roomName);
  });

  socket.on("start", (roomName) => {
    socket.to(roomName).emit("go");
  });

  socket.on("pause", (roomName) => {
    socket.to(roomName).emit("paused");
  });

  socket.on("reconfig", (roomName) => {
    socket.to(roomName).emit("reconfigure");
  });

  socket.on("item_get", (item, index, playerId, roomName) => {
    socket.to(roomName).emit("item_got", item, index, playerId);
  });
});

server.listen(3000, () => {
  console.log("squawksatoo-vs server up at port 3000");
});
