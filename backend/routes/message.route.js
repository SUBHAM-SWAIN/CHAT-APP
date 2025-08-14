import express from "express";
import { protectRoutes } from "../middlewares/auth.middleware.js";
import {
  getUsersForSideBar,
  getMessages,
  sendMessage,
  editMessage,
  deleteMessage,
} from "../controllers/message.controller.js";

const messageRoute = express.Router();

messageRoute.get("/users", protectRoutes, getUsersForSideBar);
messageRoute.get("/:id", protectRoutes, getMessages);
messageRoute.post("/send/:id", protectRoutes, sendMessage);
messageRoute.put("/:messageId", protectRoutes, editMessage);
messageRoute.delete("/:messageId", protectRoutes, deleteMessage);

export default messageRoute;
