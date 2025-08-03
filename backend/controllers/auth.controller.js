const { generateToken } = require("../lib/utils");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    let { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: "password must be 6 character",
      });
    }

    //check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    //create new user
    const newUser = new User({
      fullName,
      email,
      password,
    });

    if (newUser) {
      //generate token
      generateToken(newUser._id, res);
      await newUser.save().then(() => {
        return res.status(201).json({
          message: "User registered successfully",
          user: {
            id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profile: newUser.profile || "",
          },
        });
      });
    } else {
      return res.status(500).json({
        message: "User registration failed",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields require" });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Wrong Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).json({ message: "Wrong Credentials" });
    }

    generateToken(user._id, res);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    return res.json({ message: "Error In Login" });
  }
};

exports.logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({
      message: "Logout Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Internal Server Error",
    });
  }
};
