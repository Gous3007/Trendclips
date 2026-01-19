const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        orderId: {
            type: String,
            required: true,
            unique: true
        },

        guestId: {
            type: String,
            required: true,
            index: true
        },

        items: [
            {
                productId: {
                    type: String, // "HC0001"
                    required: true
                },
                mrp: {
                    type: Number,
                    required: true
                },
                name: String,
                price: Number,
                quantity: Number,
                image: String
            }
        ],

        shippingAddress: {
            name: String,
            mobile: String,
            flat: String,
            area: String,
            city: String,
            state: String,
            pincode: Number,
            country: String
        },

        priceDetails: {
            subtotal: Number,
            deliveryFee: Number,
            total: Number
        },

        payment: {
            paymentOrderId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "PaymentOrder"
            },
            method: String,
            status: {
                type: String,
                enum: ["PENDING", "SUCCESS", "FAILED"],
                default: "PENDING"
            }
        },

        orderStatus: {
            type: String,
            enum: ["PLACED", "CONFIRMED", "SHIPPED", "DELIVERED"],
            default: "PLACED"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
