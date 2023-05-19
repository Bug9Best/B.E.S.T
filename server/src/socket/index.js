import { Server } from "socket.io";

const io = new Server(4000, {
  cors: {
    origin: "*",
  },
});

const connectSocket = () => {
  io.on("connection", () => {
    console.log("a client connected");
  });
};

export { io, connectSocket };
