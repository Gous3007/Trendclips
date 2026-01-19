// controllers/adminAuthController.js
const Admin = require("../model/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.loginAdmin = async (req, res) => {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
        { id: admin._id, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "2d" }
    );

    res.cookie("admin_token", token, {
        httpOnly: true,
        secure: false, // production me true
        sameSite: "strict",
        maxAge: 2 * 24 * 60 * 60 * 1000
    });

    res.json({ message: "Login success" });
};

exports.logoutAdmin = (req, res) => {
    res.clearCookie("admin_token");
    res.json({ message: "Logged out" });
};
