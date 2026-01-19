const express = require("express");
const router = express.Router();
const Order = require("../model/Order");

router.get("/status/:orderId", async (req, res) => {
    try {
        const order = await Order.findOne({ orderId: req.params.orderId });

        if (!order) {
            return res.status(404).json({ success: false });
        }

        res.json({
            success: order.payment.status === "SUCCESS",
            status: order.payment.status
        });

    } catch (err) {
        res.status(500).json({ success: false });
    }
});

// GET order data for invoice
router.get("/invoice/:orderId", async (req, res) => {
    try {
        const order = await Order.findOne({ orderId: req.params.orderId })
            .populate("payment.paymentOrderId"); // optional, if you want payment details

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.json({
            success: true,
            order: {
                orderId: order.orderId,
                guestId: order.guestId,
                items: order.items,
                shippingAddress: order.shippingAddress,
                priceDetails: order.priceDetails, // subtotal, delivery, discount, finalTotal
                payment: order.payment,
                createdAt: order.createdAt
            }
        });
    } catch (err) {
        console.error("Invoice API error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

router.get("/my-orders/:guestId", async (req, res) => {
    try {
        const { guestId } = req.params;

        const orders = await Order.find({ guestId })
            .sort({ createdAt: -1 });

        res.json({ success: true, orders });
    } catch (err) {
        res.status(500).json({ success: false });
    }
});

router.get("/guest-has-orders/:guestId", async (req, res) => {
    try {
        const { guestId } = req.params;
        const orderExists = await Order.exists({ guestId });
        res.json({ hasOrders: !!orderExists });
    } catch (err) {
        res.status(500).json({ hasOrders: false });
    }
});

module.exports = router;
