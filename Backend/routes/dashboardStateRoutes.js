const express = require("express");
const router = express.Router();
const {
  getDashboardStats,
} = require("../controllers/dashboardStateController");

router.get("/stats", getDashboardStats);

module.exports = router;
