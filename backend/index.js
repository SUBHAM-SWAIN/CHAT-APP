const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const { connectDB } = require("./lib/connectDB");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/api/data", (req, res) => {
  res.send("Data received!"); 
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB()
});
