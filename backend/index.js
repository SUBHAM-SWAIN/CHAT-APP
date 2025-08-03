const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const { connectDB } = require("./lib/connectDB");
const app = express();
const PORT = process.env.PORT || 3000;
const authRouter = require("./routes/auth.route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
