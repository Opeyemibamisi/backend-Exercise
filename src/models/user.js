const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: 3,
    maxlength: 50,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
 
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  age: {
    type: Number,
     min: [18, "Age must be at least 18"],
    max: [100, "Age must be less than or equal to 100"],
  },
  gender : {
    type: String,
  }
});

module.exports = User = mongoose.model("User", UserSchema);
