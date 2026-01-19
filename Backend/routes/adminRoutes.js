// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const { loginAdmin, logoutAdmin } = require("../controllers/adminAuthController");
const adminAuth = require("../middleware/adminAuth");

router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);

router.get("/me", adminAuth, (req, res) => {
    res.json({
        success: true,
        admin: {
            id: req.admin.id
        }
    });
});

module.exports = router;
