const express = require("express");
const authRouter = express.Router();
const {
  login,
  register,
  logout,
  updateProfile,
} = require("../controllers/auth.controller");
const { protectRoutes } = require("../middlewares/auth.middleware");

authRouter.post("/register", register);
authRouter.get("/login", login);
authRouter.post("/logout", logout);

authRouter.put("/update-profile", protectRoutes, updateProfile);

module.exports = authRouter;
