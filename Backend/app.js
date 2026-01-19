const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./config/db.js")();

const EditProductRoute = require("./routes/editProduct.routes.js");
const ShowcaseRoute = require("./routes/showcaseRoutes.js");
const addressRoutes = require("./routes/addressRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");
const paymentRoutes = require("./routes/paymentRoutes");
const adminSetupRoute = require("./routes/adminSetup.js");

const app = express();
app.use(cookieParser());

app.use(cors({
    origin: "https://www.trendclips.in", // frontend URL
    credentials: true
}));
// --------------------
// Middlewares
// --------------------

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --------------------
// API Routes (FIRST)
// --------------------
app.use("/api/users", require("./routes/user.js"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/webhook", require("./routes/cashfreeWebhook"));
app.use("/api/order", require("./routes/orderStatus"));
app.use("/api/edit", EditProductRoute);
app.use("/api/showcase", ShowcaseRoute);
app.use("/api", addressRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/setup", adminSetupRoute);
// --------------------
// React Build Serve
// --------------------
app.use(express.static(path.join(__dirname, "dist")));

// --------------------
// SPA Fallback (FIXED ✅)
// --------------------
app.use((req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

module.exports = app;
