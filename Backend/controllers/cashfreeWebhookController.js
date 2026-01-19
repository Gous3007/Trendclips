const crypto = require("crypto");
const PaymentOrder = require("../model/PaymentOrder");
const Order = require("../model/Order");

exports.cashfreeWebhook = async (req, res) => {
    try {
        const signature = req.headers["x-webhook-signature"];
        const rawBody = req.body;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.CASHFREE_WEBHOOK_SECRET)
            .update(rawBody)
            .digest("base64");

        // 🔐 VERIFY SIGNATURE
        if (signature !== expectedSignature) {
            return res.status(401).send("Invalid signature");
        }

        const event = JSON.parse(rawBody.toString());

        // 🔍 Only payment success/fail events
        if (event.type !== "PAYMENT_SUCCESS" && event.type !== "PAYMENT_FAILED") {
            return res.sendStatus(200);
        }

        const paymentStatus =
            event.type === "PAYMENT_SUCCESS" ? "SUCCESS" : "FAILED";

        const cfOrderId = event.data.order.order_id;

        // 1️⃣ UPDATE PAYMENT
        const payment = await PaymentOrder.findOneAndUpdate(
            { cashfreeOrderId: cfOrderId },
            { status: paymentStatus },
            { new: true }
        );

        if (!payment) return res.sendStatus(200);

        // 2️⃣ UPDATE ORDER
        await Order.findOneAndUpdate(
            { orderId: payment.orderId },
            {
                "payment.status": paymentStatus,
                orderStatus:
                    paymentStatus === "SUCCESS" ? "CONFIRMED" : "CANCELLED"
            }
        );

        res.sendStatus(200);
    } catch (err) {
        console.error("Webhook Error ❌", err);
        res.sendStatus(500);
    }
};
