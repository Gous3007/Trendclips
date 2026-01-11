const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/db.js")(); // DB connect

const EditProductRoute = require("./routes/editProduct.routes.js");
const ShowcaseRoute = require("./routes/showcaseRoutes.js");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", require("./routes/user.js"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/edit", EditProductRoute);
app.use("/api/showcase", ShowcaseRoute);

module.exports = app;
