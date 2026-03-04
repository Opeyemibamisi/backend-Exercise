const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const mongodbUrl = process.env.MONGODB_URL;

const connectDb = async () => {
  try {
    const db = await mongoose.connect(mongodbUrl);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log(error, "error", error.message);
  }
};

module.exports = connectDb;
  