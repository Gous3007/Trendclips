const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
    // User Identity (Guest or Registered User)
    guestId: {
        type: String,
        required: true,
        index: true
    },
    // Contact Details
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    mobile: {
        type: Number,
        required: [true, "Mobile number is required"],
        trim: true,
        match: [/^[0-9]{10}$/, 'Please fill a valid 10 digit mobile number']
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },

    // Hierarchy based Location (Frontend se match hone ke liye)
    state: {
        type: String,
        required: [true, "State is required"]
    },
    district: {
        type: String,
        required: [true, "District is required"]
    },
    tehsil: {
        type: String,
        required: [true, "Tehsil/Taluka is required"]
    },
    city: {
        type: String,
        required: [true, "Village/Town/City is required"]
    },

    // Specific Address Details
    pincode: {
        type: Number,
        required: [true, "Pincode is required"],
        trim: true
    },
    flat: {
        type: String,
        required: [true, "Flat/House No is required"]
    },
    area: {
        type: String,
        required: [true, "Area/Street is required"]
    },
    landmark: {
        type: String,
        default: ""
    },

    // Address Type & Settings
    addressType: {
        type: String,
        enum: ['Home', 'Work', 'Other'], // Sirf ye values allow karega
        default: 'Home',
        required: true
    },
    isDefault: {
        type: Boolean,
        default: false
    },

    country: {
        type: String,
        default: "India"
    }

}, { timestamps: true }); // ye automatically createdAt aur updatedAt bana dega

module.exports = mongoose.model("Address", AddressSchema);