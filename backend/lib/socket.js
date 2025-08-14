import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});

// Store online users: { userId: socketId }
const userSocketMap = {};

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Expect ?userId=... in client handshake query
  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  // Broadcast fresh online users list
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Optional: rooms if you use them elsewhere
  socket.on("joinChat", (chatId) => {
    socket.join(chatId);
  });

  // Optional client-side triggers for edits/deletes
  socket.on("editMessage", (updatedMessage) => {
    io.emit("messageEdited", updatedMessage);
  });

  socket.on("deleteMessage", (messageId) => {
    io.emit("messageDeleted", messageId);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    if (userId) delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, server, io };
