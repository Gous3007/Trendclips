const express = require("express");
const router = express.Router();
const { getAllOrders } = require("../controllers/adminOrderController");

router.get("/admin/orders", getAllOrders);

module.exports = router;