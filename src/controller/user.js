const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { sendWelcomingEmail, sendVerifyEmail } = require("../email/mailer");

const generateJwtToken = (payload) => {
  return jwt.sign(payload, process.env.JWTSECRETKEY || "secret", {
    expiresIn: process.env.EXPIRESIN,
  });
};

const register = async (req, res) => {
  console.log("Request body:", req.body);

  const error = validationResult(req);
  if (error.isEmpty()) {
    return res
      .status(400)
      .json({ status: "false", message: error.array()[0].msg });
  }

  try {
    const { name, username, email, password, age, gender } = req.body;

    if (!name || !username || !email || !password || !age || !gender) {
      return res
        .status(400)
        .json({ status: "false", message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: "false", message: "User already exists" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const userDetails = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      age,
      gender,
    });

    sendWelcomingEmail(email, name);

    return res.status(201).json({
      status: "true",
      message: "User registered successfully",
      data: { name, username, email },
    });
  } catch (error) {
    console.log(error);

    res.json({ status: "false", message: error.message });
  }
};

const login = async (req, res) => {
  const error = validationResult(req);
  if (error.isEmpty()) {
    return res
      .status(400)
      .json({ status: "false", message: error.array()[0].msg });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "Email and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ status: "false", message: "Invalid credentials" });
    }

    const comparedPassword = bcrypt.compareSync(
      password,
      existingUser.password,
    );
    if (!comparedPassword) {
      return res
        .status(400)
        .json({ status: "false", message: "Invalid credentials" });
    }

    const token = generateJwtToken({
      email: existingUser.email,
      id: existingUser._id,
      isAdmin: existingUser.isAdmin,
    });
    const user = {
      name: existingUser.name,
      username: existingUser.username,
      email: existingUser.email,
      isAdmin: existingUser.isAdmin,
    };

    return res.status(200).json({
      status: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "false", message: error.message });
  }
};

module.exports = { register, login };
