const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
require("./config/db.js")(); // DB connect

// Routes
const EditProductRoute = require("./routes/editProduct.routes.js");
const ShowcaseRoute = require("./routes/showcaseRoutes.js");

const app = express();

// --------------------
// Middlewares
// --------------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --------------------
// API Routes
// --------------------
app.use("/api/users", require("./routes/user.js"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/edit", EditProductRoute);
app.use("/api/showcase", ShowcaseRoute);

// --------------------
// React Frontend Serve (Production)
// --------------------
app.use(express.static(path.join(__dirname, "dist")));

// --------------------
// SPA Fallback (IMPORTANT)
// --------------------
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

module.exports = app;
