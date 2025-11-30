// src/app.js
const express = require("express");
const app = express();
require("dotenv").config();

// Initialize DB connection (runs automatically because db.js executes connectDB())
require("./config/db");

// Middleware to parse JSON requests
app.use(express.json());

// Default test route
app.get("/", (req, res) => {
  res.json({ message: "API is running successfully" });
});

// Import all routes
const routes = require("./routes");

// Mount routes
app.use("/api/users", routes.userRoutes);
app.use("/api/posts", routes.postRoutes);
app.use("/api/comments", routes.commentRoutes);
app.use("/api/likes", routes.likeRoutes);

// Export the Express app
module.exports = app;
