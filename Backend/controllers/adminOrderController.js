const Order = require("../model/Order");

// GET ALL ORDERS (ADMIN)
exports.getAllOrders = async (req, res) => {
    try {
        // Frontend se aane wale naye params (date, status) ko bhi receive karein
        const { search = "", page = 1, limit = 6, date, status } = req.query;

        const query = {};

        // 1. Search Logic (Sirf Order ID ke liye, Date regex se nahi hoti)
        if (search) {
            query.orderId = { $regex: search, $options: "i" };
        }

        // 2. Status Filter (Agar status select kiya hai toh)
        if (status && status !== "All Status") {
            query.orderStatus = status;
        }

        // 3. Date Filter (Proper Date Range Search)
        if (date) {
            // "2024-02-14" string ko Date object banakar start aur end time set karein
            const startDate = new Date(date);
            startDate.setHours(0, 0, 0, 0);

            const endDate = new Date(date);
            endDate.setHours(23, 59, 59, 999);

            query.createdAt = {
                $gte: startDate, // Greater than or equal (Subah 00:00 se)
                $lte: endDate    // Less than or equal (Raat 23:59 tak)
            };
        }

        // 🔥 QUERY EXECUTION WITH POPULATE
        const orders = await Order.find(query)
            .populate("shippingAddress") // <--- Yaha Address Model ka data judega
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        // Count ke liye bhi same query use karein
        const total = await Order.countDocuments(query);

        // Data Formatting
        const formatted = orders.map(o => {
            // Address model se name nikalna
            // Agar address delete ho gaya ho ya na mile, toh "Unknown" ya "Guest" dikhayein
            const customerName = o.shippingAddress ? o.shippingAddress.name : "Guest User";

            return {
                _id: o._id,
                orderId: o.orderId,
                customer: customerName, // <--- Ab ye Address model wala name hai
                date: o.createdAt,
                amount: `₹${o.priceDetails?.total || 0}`, // Safety check added
                status: o.orderStatus
            };
        });

        res.json({
            success: true,
            data: formatted,
            total,
            page: Number(page),
            totalPages: Math.ceil(total / limit)
        });

    } catch (err) {
        console.error("Error fetching orders:", err);
        res.status(500).json({ message: "Failed to fetch orders" });
    }
};