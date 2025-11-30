const express = require("express");
const app = express();
const connectDB = require("./config/db");
require("dotenv").config();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// Default test route
app.get("/", (req, res) => { //Respond to an HTTP GET request. req is the request coming from the client. res is the response your server will send back
  res.json({ message: "API is running successfully" });
});

// Import all routes from routes/index.js
const routes = require("./routes");

// Mount routes
app.use("/api/users", routes.userRoutes);
app.use("/api/posts", routes.postRoutes);
app.use("/api/comments", routes.commentRoutes);
app.use("/api/likes", routes.likeRoutes);

// Export the Express app
module.exports = app;
