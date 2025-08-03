const express = require("express");
const authRouter = express.Router();
const { login, register, logout } = require("../controllers/auth.controller");

authRouter.post("/register", register);
authRouter.get("/login", login);
authRouter.post("/logout", logout);

authRouter.put("/update-profile",)

module.exports = authRouter;
