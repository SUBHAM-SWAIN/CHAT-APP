// index.js
const express = require("express"); // ✅ Add this
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");

const cookieParser = require("cookie-parser");
const cors = require("cors");

const { connectDB } = require("./lib/connectDB");
const { app, server } = require("./lib/socket");

const authRouter = require("./routes/auth.route");
const messageRoute = require("./routes/message.route");

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

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Start server then connect DB
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
