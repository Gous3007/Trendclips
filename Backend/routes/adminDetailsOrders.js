const express = require("express");
const router = express.Router();

const { getOrderById } = require("../controllers/adminOrderDetailsController");
const { shipOrder } = require("../controllers/adminShippingController");

router.get("/admin/order/:id", getOrderById);
router.post("/admin/order/ship/:id", shipOrder);

module.exports = router;
