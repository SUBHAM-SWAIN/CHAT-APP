import express from "express";
import {
  login,
  register,
  logout,
  updateProfile,
  checkAuth,
} from "../controllers/auth.controller.js";
import { protectRoutes } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.put("/update-profile", protectRoutes, updateProfile);
authRouter.get("/check", protectRoutes, checkAuth);

export default authRouter;
