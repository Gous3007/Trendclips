const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/db.js")(); // DB connect

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", require("./routes/user.js"));

module.exports = app;
