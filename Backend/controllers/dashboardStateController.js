const Product = require("../model/Product");
const Order = require("../model/Order");

exports.getDashboardStats = async (req, res) => {
    try {
        /* =========================
           1️⃣ Total Products
        ========================= */
        const totalProducts = await Product.countDocuments();

        /* =========================
           2️⃣ Orders Today
        ========================= */
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const ordersToday = await Order.countDocuments({
            createdAt: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        });

        /* =========================
           3️⃣ Out of Stock Products
        ========================= */
        const outOfStock = await Product.countDocuments({
            quantity: { $lte: 0 },
        });

        /* =========================
           4️⃣ Total Revenue
        ========================= */
        const revenueResult = await Order.aggregate([
            {
                $match: {
                    "payment.status": "SUCCESS",
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$priceDetails.total" },
                },
            },
        ]);

        const totalRevenue =
            revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

        /* =========================
           FINAL RESPONSE
        ========================= */
        res.status(200).json({
            success: true,
            data: {
                totalProducts,
                ordersToday,
                outOfStock,
                totalRevenue,
            },
        });
    } catch (error) {
        console.error("Dashboard Stats Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch dashboard stats",
        });
    }
};
