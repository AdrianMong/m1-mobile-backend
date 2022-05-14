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
app.use("/api/profil", require("./routes/profilRoutes"));
app.use("/api/question", require("./routes/questionRoutes"));
app.use("/api/section", require("./routes/sectionRoutes"));

module.exports = app;