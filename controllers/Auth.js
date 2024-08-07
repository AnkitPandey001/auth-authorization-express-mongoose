const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();


//! Signup
const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate input
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.find({ email });
    if (existingUser.length > 0) {
      return res.status(400).json({
        message: "Email Already Exists",
      });
    }

    // Hash the password
    let hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(200).json({
      message: "User created Successfully",
      user: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error Occurred During creation",
    });
  }
};

//! Login 

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: "You must sign up before logging in",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        error: "Password not matched",
      });
    }

    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };

    

    let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });
    user.token = token;
    user.password = undefined; // Mask the password

    const option = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    return res.cookie("token", token, option).status(200).json({
      token,
      user,
      message: "User logged in",
    });
  } catch (error) {
    console.error("Error during login:", error); // Add this line for logging the error
    return res.status(500).json({
      error: "Error during login",
    });
  }
};

module.exports = { signup, login };
