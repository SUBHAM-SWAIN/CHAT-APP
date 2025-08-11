const express = require("express");
const { protectRoutes } = require("../middlewares/auth.middleware");
const {
  getUsersForSideBar,
  getMessages,
  sendMessage,
} = require("../controllers/message.controller");
const messageRoute = express.Router();

messageRoute.get("/usres", protectRoutes, getUsersForSideBar);
messageRoute.get("/:id", protectRoutes, getMessages);
messageRoute.post("/send/:id", protectRoutes, sendMessage);

module.exports = messageRoute;
