const Order = require("../model/Order");
const Product = require("../model/Product");

exports.getDashboardAnalytics = async (req, res) => {
    try {
        /* =========================
           📈 1️⃣ Last 30 Days Sales
        ========================= */

        const today = new Date();
        const startDate = new Date();
        startDate.setDate(today.getDate() - 29);

        // Raw aggregation (only existing days)
        const rawSales = await Order.aggregate([
            {
                $match: {
                    "payment.status": "SUCCESS",
                    createdAt: { $gte: startDate },
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%d %b", date: "$createdAt" },
                    },
                    value: { $sum: "$priceDetails.total" },
                },
            },
            { $sort: { "_id": 1 } },
        ]);

        // Convert to map → quick lookup
        const salesMap = {};
        rawSales.forEach(item => {
            salesMap[item._id] = Number(item.value.toFixed(2));
        });

        // Build FULL 30 days array (fill missing with 0)
        const salesTrend = [];
        for (let i = 29; i >= 0; i--) {
            const d = new Date();
            d.setDate(today.getDate() - i);

            const label = d.toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
            });

            salesTrend.push({
                name: label,               // ✅ frontend-friendly
                value: salesMap[label] || 0, // ✅ missing days handled
            });
        }

        /* =========================
           🗺️ 2️⃣ Orders by State
        ========================= */
        const ordersByState = await Order.aggregate([
            {
                $group: {
                    _id: "$shippingAddress.state",
                    orders: { $sum: 1 },
                },
            },
            {
                $project: {
                    name: "$_id",
                    orders: 1,
                    _id: 0,
                },
            },
        ]);

        /* =========================
           🔁 3️⃣ Conversion Rate
        ========================= */
        const totalOrders = await Order.countDocuments();
        const totalProducts = await Product.countDocuments();

        const conversionRate =
            totalProducts > 0
                ? ((totalOrders / totalProducts) * 100).toFixed(1)
                : 0;

        res.status(200).json({
            success: true,
            data: {
                salesTrend,      // 👈 clean & complete
                ordersByState,
                conversionRate,
            },
        });
    } catch (error) {
        console.error("Dashboard Analytics Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch analytics",
        });
    }
};
