// Import required packages
const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env file

// Create the express app
const app = express();

// Enable CORS (so frontend can access backend)
app.use(cors());

// Enable JSON parsing for incoming requests
app.use(express.json());

// Import the routes that handle vehicle API requests
const vehicleRoutes = require("./routes/vehicleRoutes");

// Mount vehicle routes under /api/vehicles
// Example: http://localhost:8080/api/vehicles
app.use("/api/vehicles", vehicleRoutes);

// Simple default route for testing
app.get("/", (req, res) => {
  res.send("✅ Vehicles Microservice Proxy is running");
});

// Use port from .env or default to 8080
const port = process.env.PORT || 8080;

// Start the Express server
app.listen(port, () => console.log(`🚀 Server running at http://localhost:${port}`));
