const mongoose = require("mongoose");

const showcaseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        category: {
            type: String,
            default: ""
        },

        price: {
            type: Number,
            required: true
        },

        oldPrice: {
            type: Number,
            required: true
        },

        discount: {
            type: Number
        },

        rating: {
            type: Number,
            default: 4.5
        },

        image: {
            url: { type: String, required: true },
            public_id: { type: String, required: true }
        },

        addedAs: {
            type: String,
            enum: ["featured", "popular"],
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Showcase", showcaseSchema);
