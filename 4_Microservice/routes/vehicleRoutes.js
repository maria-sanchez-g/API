// Express router defines endpoints for this microservice
const express = require("express");
const router = express.Router();

// Import controller methods
const Vehicle = require("../controllers/vehicleController");

// Route 1: Query parameters
// Example: GET /api/vehicles?limit=10&page=1&make=Toyota&year=2015
router.get("/", Vehicle.listVehicles);

// Route 2: Path parameters
// Example: GET /api/vehicles/Camry
router.get("/:model", Vehicle.getByModel);

// Export router for use in server.js
module.exports = router;
