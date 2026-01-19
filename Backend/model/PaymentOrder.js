const mongoose = require("mongoose");

const paymentOrderSchema = new mongoose.Schema(
    {
        orderId: {
            type: String,
            required: true,
            unique: true
        },

        amount: {
            type: Number,
            required: true
        },

        currency: {
            type: String,
            default: "INR"
        },

        paymentGateway: {
            type: String,
            default: "CASHFREE"
        },

        selectedMethod: {
            type: String // gpay | phonepe | paytm
        },

        paymentSessionId: {
            type: String
        },

        cashfreeOrderId: {
            type: String
        },

        status: {
            type: String,
            enum: ["PENDING", "SUCCESS", "FAILED"],
            default: "PENDING"
        },

        customer: {
            customerId: String,
            phone: String,
            email: String
        },

    },
    { timestamps: true }
);

module.exports = mongoose.model("PaymentOrder", paymentOrderSchema);
