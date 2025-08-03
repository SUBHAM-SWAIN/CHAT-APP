// auth.middleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.protectRoutes = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }

    // adjust depending on how you signed it. e.g., jwt.sign({ id: userId }, ...)
    const userId = decoded.id ?? decoded.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: Malformed token payload" });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("ProtectRoutes error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
