const express = require("express");
const router = express.Router();
const Order = require("../model/Order");
const PaymentOrder = require("../model/PaymentOrder");
const Product = require("../model/Product");

router.post("/", async (req, res) => {
    try {
        const event = req.body;

        const orderId = event?.data?.order?.order_id;
        if (!orderId) {
            return res.status(400).json({ error: "Invalid webhook" });
        }

        // 🔥 PAYMENT SUCCESS
        if (event.type === "PAYMENT_SUCCESS") {

            const cashfreeOrderId = event?.data?.order?.order_id;

            const payment = await PaymentOrder.findOneAndUpdate(
                { cashfreeOrderId },
                { status: "SUCCESS" },
                { new: true }
            );

            if (!payment) {
                return res.json({ received: true });
            }

            // 🔒 Order fetch karo
            const order = await Order.findOne({ "payment.paymentOrderId": payment._id });

            if (!order) {
                return res.json({ received: true });
            }

            // 🔁 Duplicate webhook protection
            if (order.payment.status === "SUCCESS") {
                return res.json({ received: true });
            }

            // ✅ Order status update
            order.payment.status = "SUCCESS";
            order.orderStatus = "CONFIRMED";
            await order.save();

            // 🔥🔥🔥 STOCK REDUCE LOGIC 🔥🔥🔥
            for (const item of order.items) {

                const product = await Product.findById(item.productId);
                if (!product) continue;

                // ❌ Negative stock avoid
                if (product.quantity < item.quantity) {
                    console.error("Stock not enough for:", product.productId);
                    continue;
                }

                product.quantity -= item.quantity;
                await product.save();
            }
        }

        if (event.type === "PAYMENT_FAILED") {

            const cashfreeOrderId = event?.data?.order?.order_id;

            const payment = await PaymentOrder.findOneAndUpdate(
                { cashfreeOrderId },
                { status: "FAILED" },
                { new: true }
            );

            if (payment) {
                await Order.findOneAndUpdate(
                    { "payment.paymentOrderId": payment._id },
                    {
                        "payment.status": "FAILED",
                        orderStatus: "FAILED"
                    }
                );
            }
        }

        res.json({ received: true });

    } catch (err) {
        console.error("Webhook Error ❌", err);
        res.status(500).send("Webhook error");
    }
});

module.exports = router;
