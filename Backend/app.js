const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
require("./config/db.js")();

const EditProductRoute = require("./routes/editProduct.routes.js");
const ShowcaseRoute = require("./routes/showcaseRoutes.js");

const app = express();
console.log("API BASE URL 👉", import.meta.env.VITE_API_BASE_URL);

// --------------------
// Middlewares
// --------------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --------------------
// API Routes (FIRST)
// --------------------
app.use("/api/users", require("./routes/user.js"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/edit", EditProductRoute);
app.use("/api/showcase", ShowcaseRoute);

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
