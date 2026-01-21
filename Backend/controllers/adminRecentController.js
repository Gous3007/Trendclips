// controllers/adminOrderController.js
const Order = require("../model/Order");

exports.getRecentOrders = async (req, res) => {
    try {
        const orders = await Order.find({ "payment.status": "SUCCESS" })
            .sort({ createdAt: -1 })
            .limit(5)
            .select("orderId user shippingAddress priceDetails payment createdAt");

        const formattedOrders = orders.map(order => ({
            id: order.orderId,
            customer: order.shippingAddress?.fullName || "Guest User",
            date: order.createdAt.toISOString().split("T")[0],
            amount: `₹${order.priceDetails.total.toFixed(2)}`,
            status: order.payment.status === "SUCCESS" ? "Completed" : "Pending"
        }));

        res.status(200).json({
            success: true,
            data: formattedOrders
        });
    } catch (error) {
        console.error("Recent Orders Error:", error);
        res.status(500).json({ success: false });
    }
};
