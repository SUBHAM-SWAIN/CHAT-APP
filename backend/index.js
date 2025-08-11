const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const { connectDB } = require("./lib/connectDB");
const app = express();
const PORT = process.env.PORT || 3000;
const authRouter = require("./routes/auth.route");
const cookieParser = require("cookie-parser");
const messageRoute = require("./routes/message.route");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRouter);
app.use("/api/message", messageRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
