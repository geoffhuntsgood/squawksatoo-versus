import cors from "cors";
import express from "express";
import { createServer } from "node:http";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Server } from "socket.io";

const port = process.env.PORT || 3000;
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

  socket.on("join_room_client", (playerId, roomName) => {
    socket.data.playerId = playerId;
    socket.join(roomName);
  });

  socket.on("set_game_client", (roomName, game) => {
    socket.to(roomName).emit("set_game_server", game);
  });

  socket.on("start_client", (roomName) => {
    io.in(roomName)
      .fetchSockets()
      .then((sockets) => {
        sockets.forEach((s) => {
          s.emit(
            "start_server",
            sockets.map((sock) => sock.data.playerId)
          );
        });
      });
  });

  socket.on("request_start_client", (roomName, gameOptions) => {
    socket.to(roomName).emit("request_start_server", gameOptions);
  });

  socket.on("confirm_start_client", (roomName) => {
    socket.to(roomName).emit("confirm_start_server");
  });

  socket.on("deny_start_client", (roomName) => {
    socket.to(roomName).emit("deny_start_server");
  });

  socket.on("pause_client", (roomName) => {
    socket.to(roomName).emit("pause_server");
  });

  socket.on("resume_client", (roomName) => {
    socket.to(roomName).emit("resume_server");
  });

  socket.on("collected_client", (item, index, playerId, roomName) => {
    socket.to(roomName).emit("collected_server", item, index, playerId);
  });

  socket.on("reset_client", (roomName) => {
    socket.to(roomName).emit("reset_server");
  });
});

server.listen(port, () => {
  console.log(`squawks-vs server up at port ${port}`);
});
