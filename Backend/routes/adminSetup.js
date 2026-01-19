const express = require("express");
const bcrypt = require("bcryptjs");
const Admin = require("../model/Admin");

const router = express.Router();

router.post("/create-admin", async (req, res) => {
    try {
        // 🔒 SECURITY KEY CHECK
        if (req.headers["x-setup-key"] !== process.env.ADMIN_SETUP_KEY) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const exists = await Admin.findOne({ username: "TrendIbrahim" });
        if (exists) {
            return res.json({ message: "Admin already exists" });
        }

        const hashed = await bcrypt.hash(process.env.ADMIN_PASS, 10);

        await Admin.create({
            username: process.env.ADMIN_USER,
            password: hashed
        });

        res.json({ message: "Admin created successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
