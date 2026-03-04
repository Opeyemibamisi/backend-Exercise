const mongoose = require("mongoose");
const { image } = require("../../config/cloudinary");

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },

  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minLength: [12, "Atleast 12 character is needed"],
    maxLength: [300, "Not more than 300 characters are allowed"],
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
  },
  imageId: { type: String },
});

module.exports = Product = mongoose.model("Product", ProductSchema);
