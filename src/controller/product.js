const cloudinary = require("../../config/cloudinary");
const Product = require("../models/product");

const addProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(402).json({ message: "image is required" });
    }
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "products",
      },
      async (error, result) => {
        if (error) {
          console.log(error);
          return res.status(500).json("cloudinary upload failed");
        }
        console.log("image result", result);

        const product = {
          ...req.body,
          image: result.secure_url,
          imageId: result.public_id,
        };
        await Product.create(product);
        res.status(201).json({
          message: "product created successfully",
          product,
          status: true,
        });
      },
    );
    stream.end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error, error.message);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ message: products.length, products, status: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving products", error: error.message });
    console.log(error, error.message);
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    // const product = await Product.findOne({_id: req.params.id});
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", status: false });
    }
    res.status(200).json({ product, status: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving product", error: error.message });
    console.log(error, error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    // Fetch existing product first
    const existingProduct = await Product.findById(req.params.id);
    if (!existingProduct) {
      return res
        .status(404)
        .json({ message: "Product not found", status: false });
    }

    if (req.file) {
      // Delete old image from Cloudinary if it exists
      if (existingProduct.imageId) {
        try {
          await cloudinary.uploader.destroy(existingProduct.imageId);
          console.log("Old image deleted from Cloudinary:", existingProduct.imageId);
        } catch (cloudinaryError) {
          console.error("Error deleting old image from Cloudinary:", cloudinaryError);
        }
      }

      // Upload new image
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "products",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          },
        );
        stream.end(req.file.buffer);
      });

      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          image: result.secure_url,
          imageId: result.public_id,
        },
        { new: true, runValidators: true },
      );

      res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct,
        status: true,
      });
    } else {
      // Update without image
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true },
      );

      res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct,
        status: true,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
    console.log(error, error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", status: false });
    }

    // Delete image from Cloudinary if it exists
    if (product.imageId) {
      try {
        const result = await cloudinary.uploader.destroy(product.imageId);
        console.log("Image deleted from Cloudinary:", product.imageId);
      } catch (cloudinaryError) {
        console.error("Error deleting image from Cloudinary:", cloudinaryError);
      }
    }

    // Delete product from database
    await Product.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: "Product deleted successfully", status: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
    console.log(error, error.message);
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
