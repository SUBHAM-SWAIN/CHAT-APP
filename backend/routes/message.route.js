const express = require("express");
const { protectRoutes } = require("../middlewares/auth.middleware");
const {
  getUsersForSideBar,
  getMessages,
  sendMessage,
  editMessage,
  deleteMessage,
} = require("../controllers/message.controller");

const messageRoute = express.Router();

messageRoute.get("/users", protectRoutes, getUsersForSideBar);
messageRoute.get("/:id", protectRoutes, getMessages);
messageRoute.post("/send/:id", protectRoutes, sendMessage);
messageRoute.put("/:messageId", protectRoutes, editMessage);
messageRoute.delete("/:messageId", protectRoutes, deleteMessage);

module.exports = messageRoute;
