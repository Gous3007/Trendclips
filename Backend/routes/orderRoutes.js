const express = require("express");
const router = express.Router();

const { checkPaymentStatus } = require("../controllers/orderController");

router.get("/orders/verify/:orderId", checkPaymentStatus);


module.exports = router;