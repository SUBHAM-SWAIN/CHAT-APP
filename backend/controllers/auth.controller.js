// backend/controllers/auth.controller.js
const { generateToken } = require("../lib/utils");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const cloudinary = require("../lib/cloudinary"); // configured with dotenv

exports.register = async (req, res) => {
  try {
    let { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with that email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // generate token (assumes generateToken sets cookie)
    generateToken(newUser._id, res);

    // Send user object in a consistent shape (no password)
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profile: newUser.profile || "",
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    // omit password before sending
    const { password: _, ...userSafe } = user.toObject();

    return res.status(200).json(userSafe);
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Error in login" });
  }
};

exports.logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0, httpOnly: true });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    // expecting { profile: <base64 string> } in body
    const { profile } = req.body;
    const userId = req.user._id;

    if (!profile) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    // Upload base64 to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(profile);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profile: uploadResponse.secure_url },
      { new: true, select: "-password" }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // return updated user (without password)
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.checkAuth = (req, res) => {
  try {
    // Expect protectRoutes middleware to attach req.user (without password)
    return res.status(200).json(req.user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
