// lib/socket.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

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

function getReceiverSocketId(userId) {
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

  // These two are optional helpers if you want to trigger from client directly.
  // Your API already emits server-side after DB updates.
  socket.on("editMessage", (updatedMessage) => {
    // if using rooms: io.to(updatedMessage.chatId).emit("messageEdited", updatedMessage);
    io.emit("messageEdited", updatedMessage);
  });

  socket.on("deleteMessage", (messageId, chatId) => {
    // if using rooms: io.to(chatId).emit("messageDeleted", messageId);
    io.emit("messageDeleted", messageId);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    if (userId) delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

module.exports = { app, server, io, getReceiverSocketId };
