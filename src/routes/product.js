const express = require("express");
const router = express.Router();
const {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/product");
const checkAuth = require("../middleware/authenticateToken");
const checkAdmin = require("../middleware/role");
const { upload } = require("../middleware/multer");
const {productValidator, updateProductValidator} = require("../validator/product");


router.post("/", checkAuth, checkAdmin, upload.single("image"), ...productValidator, addProduct);
router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);
router.put("/:id", checkAuth, checkAdmin,upload.single("image"), ...updateProductValidator, updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;