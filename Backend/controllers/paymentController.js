const Order = require("../model/Order");
const PaymentOrder = require("../model/PaymentOrder");
const { createCashfreeOrder } = require("../utils/cashfree");

exports.createPayment = async (req, res) => {
    try {
        const { cartItems, selectedMethod, shippingAddress, deliveryFee = 0 } = req.body;

        const guestId = shippingAddress.guestId;
        const orderId = "ORD_" + Date.now();

        // ✅ SAFE CALCULATIONS
        const totalMRP = cartItems.reduce((sum, item) => {
            return sum + Number(item.mrp || 0) * Number(item.quantity || 0);
        }, 0);

        const subtotal = cartItems.reduce((sum, item) => {
            return sum + Number(item.price || 0) * Number(item.quantity || 0);
        }, 0);

        const discount = totalMRP - subtotal;
        const totalPayable = subtotal + Number(deliveryFee || 0);

        // 1️⃣ ORDER CREATE
        const order = await Order.create({
            orderId,
            guestId,

            items: cartItems.map(item => ({
                productId: item.id,
                name: item.name,
                mrp: item.mrp,
                price: item.price,
                quantity: item.quantity,
                image: item.image
            })),

            shippingAddress: {
                name: shippingAddress.name,
                mobile: shippingAddress.mobile,
                flat: shippingAddress.flat,
                area: shippingAddress.area,
                city: shippingAddress.city,
                state: shippingAddress.state,
                pincode: shippingAddress.pincode,
                country: "India"
            },

            priceDetails: {
                totalMRP,
                subtotal,
                discount,
                deliveryFee,
                total: totalPayable
            },

            payment: {
                status: "PENDING",
                method: selectedMethod
            }
        });

        // 2️⃣ CASHFREE
        const cashfreeOrder = await createCashfreeOrder({
            orderId,
            amount: Number(totalPayable.toFixed(2)),
            customer: {
                id: guestId,
                phone: String(shippingAddress.mobile),
                email: shippingAddress.email || "guest@test.com"
            }
        });

        // 3️⃣ PAYMENT SAVE
        const payment = await PaymentOrder.create({
            orderId,
            cashfreeOrderId: cashfreeOrder.order_id,
            paymentSessionId: cashfreeOrder.payment_session_id,
            amount: totalPayable,
            selectedMethod
        });

        order.payment.paymentOrderId = payment._id;
        await order.save();

        res.json({
            success: true,
            paymentSessionId: payment.paymentSessionId,
            orderId
        });

    } catch (err) {
        console.error("Create Payment Error ❌", err);
        res.status(500).json({ success: false });
    }
};
