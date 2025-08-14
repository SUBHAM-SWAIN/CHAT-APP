// index.js
import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./lib/connectDB.js";
import { app, server } from "./lib/socket.js";

import authRouter from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Health route
app.get("/", (_req, res) => {
  res.send("Hello World!");
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Start server then connect DB
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
