const express = require("express");
const router = express.Router();
const {
    getDashboardAnalytics,
} = require("../controllers/dashboardAnalyticsController");

router.get("/analytics", getDashboardAnalytics);


module.exports = router;
