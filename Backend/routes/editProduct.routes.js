const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer"); // cloudinary multer

const {
  getProductByProductId,
  updateProductByProductId,
} = require("../controllers/editProduct.controller");

// 🔹 GET PRODUCT (Fetch data)
router.get("/get/:productId", getProductByProductId);

// 🔹 UPDATE PRODUCT
router.put(
  "/update/:productId",
  upload.array("images", 10), // 👈 images field
  updateProductByProductId
);

module.exports = router;
