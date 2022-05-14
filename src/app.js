const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(require('./configuration/cors'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Initialize database connection
require("./configuration/database");

// Routes
app.use("/api/compte", require("./routes/compteRoutes"));

module.exports = app;