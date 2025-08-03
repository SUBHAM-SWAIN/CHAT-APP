const jwt = require("jsonwebtoken");

exports.generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    secure: process.env.NODE_ENV !== "development", // true in prod over HTTPS
    httpOnly: true,
    sameSite: "strict", // okay for most cases; if you need cross-site redirects/logins consider "lax"
  });
  return token;
};
