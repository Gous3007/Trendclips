const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../model/Admin");
require("dotenv").config();

(async () => {
    try {
        // 🔌 DB CONNECT
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB connected");

        const exists = await Admin.findOne({ username: "admin" });

        if (exists) {
            console.log("⚠️ Admin already exists");
            process.exit();
        }

        const hashed = await bcrypt.hash("admin123", 10);

        await Admin.create({
            username: "admin",
            password: hashed
        });

        console.log("✅ Admin Created Successfully");
        process.exit();
    } catch (err) {
        console.error("❌ Error:", err.message);
        process.exit(1);
    }
})();
