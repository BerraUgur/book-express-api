// Core modules
const path = require("path");

// Third-party modules
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Local modules
const corsOptions = require("./config/corsConfig");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Global middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger);

// API routes
app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, "views")));

// Error handler middleware
app.use(errorHandler);

module.exports = app;