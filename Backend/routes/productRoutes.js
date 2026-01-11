const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const { createProduct, getAllProducts, deleteProduct, getSingleProduct } = require("../controllers/productController");
const Product = require("../model/Product");
router.post(
    "/create",
    upload.array("images", 10), // max 10 images
    createProduct
);
router.get("/all", getAllProducts);
router.delete("/delete/:id", deleteProduct);
router.get("/:id", getSingleProduct);

module.exports = router;
