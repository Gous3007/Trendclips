const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        productId: {
            type: String,
            unique: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String
        },

        packOf: {
            type: Number,
            required: false,
            default: 1,
        },

        images: [
            {
                public_id: String,
                url: String
            }
        ],

        price: {
            type: Number,
            required: true
        },

        discount: {
            type: Number,
            default: 0
        },

        finalPrice: {
            type: Number
        },

        category: {
            type: String,
            enum: [
                "Hair Clips",
                "Scrunchies",
                "Headbands",
                "Barrettes",
                "Home & Kitchen",
                "Stationery",
                "Other"
            ],
            required: true
        },

        quantity: {
            type: Number,
            default: 0
        },

        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
