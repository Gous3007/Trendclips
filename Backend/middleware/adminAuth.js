const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.cookies?.admin_token; // 👈 SAFE ACCESS

        if (!token) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "admin") {
            return res.status(403).json({ message: "Forbidden" });
        }

        req.admin = decoded;
        next();
    } catch (err) {
        console.error("AdminAuth error:", err.message);
        return res.status(401).json({ message: "Session expired" });
    }
};
