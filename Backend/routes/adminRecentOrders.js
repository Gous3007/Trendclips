// routes/adminOrders.js
const express = require("express");
const router = express.Router();
const { getRecentOrders } = require("../controllers/adminRecentController");

router.get("/recent-orders",getRecentOrders);

module.exports = router;
