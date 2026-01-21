const Order = require("../model/Order");

exports.getOrderById = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.json({
            success: true,
            order
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
