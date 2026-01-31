const axios = require("axios");
const Order = require("../model/Order");

const BASE_URL =
    process.env.CASHFREE_MODE === "production"
        ? process.env.CASHFREE_PROD_URL
        : process.env.CASHFREE_SANDBOX_URL;

exports.checkPaymentStatus = async (req, res) => {
    try {
        const { orderId } = req.params;

        // 1️⃣ Order find karo
        const order = await Order.findOne({ orderId });
        if (!order) {
            return res.status(404).json({ status: "FAILED" });
        }

        // 2️⃣ Cashfree se VERIFY
        const response = await axios.get(
            `${BASE_URL}/orders/${orderId}`,
            {
                headers: {
                    "x-client-id":
                        process.env.CASHFREE_MODE === "production"
                            ? process.env.CASHFREE_APP_ID
                            : process.env.CASHFREE_SANDBOX_APP_ID,

                    "x-client-secret":
                        process.env.CASHFREE_MODE === "production"
                            ? process.env.CASHFREE_SECRET_KEY
                            : process.env.CASHFREE_SANDBOX_SECRET_KEY,

                    "x-api-version": "2023-08-01"
                }
            }
        );

        const cfStatus = response.data.order_status;

        // 3️⃣ Status update
        if (cfStatus === "PAID") {
            order.payment.status = "SUCCESS";
            order.orderStatus = "CONFIRMED";
            await order.save();

            return res.json({ status: "SUCCESS" });
        }

        return res.json({ status: "PENDING" });

    } catch (err) {
        console.error("Payment verify error ❌", err);
        return res.json({ status: "FAILED" });
    }
};
