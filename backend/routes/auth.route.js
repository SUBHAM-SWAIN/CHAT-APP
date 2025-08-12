const express = require("express");
const authRouter = express.Router();
const {
  login,
  register,
  logout,
  updateProfile,
  checkAuth,
} = require("../controllers/auth.controller");
const { protectRoutes } = require("../middlewares/auth.middleware");

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

authRouter.put("/update-profile", protectRoutes, updateProfile);
authRouter.get("/check", protectRoutes, checkAuth);

module.exports = authRouter;
