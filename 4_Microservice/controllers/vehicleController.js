// This file handles business logic between the route and the service
const VehicleAPI = require("../services/vehicleApi");

// Handles GET /api/vehicles?make=Toyota&page=2
exports.listVehicles = async (req, res) => { //Read the incoming query parameter
  try {
    const result = await VehicleAPI.fetchVehicles(req.query); // Call service with query params
    res.json(result); // Return the JSON data to client
  } catch (err) {
    console.error("Vehicles list error:", err.message);
    res.status(502).json({ message: "Upstream service error" }); // Return clean error message
  }
};

// Handles GET /api/vehicles/:model (param route)
exports.getByModel = async (req, res) => {
  try {
    const items = await VehicleAPI.fetchByModel(req.params.model); // Call service with path param
    if (!items.length)
      return res.status(404).json({ message: "No results found for this model" });
    res.json({ count: items.length, items });
  } catch (err) {
    console.error("Vehicle by model error:", err.message);
    res.status(502).json({ message: "Upstream service error" });
  }
};

// This controller handles two endpoints:
// GET /api/vehicles → list vehicles with filters
// GET /api/vehicles/:model → find vehicles by model

//1. You need req.params to identify a specific item. These routes must include an identifier in the URL.
//2. You need req.query for optional filters, search, and pagination.
//
//params = required value to fetch one specific resource.
//query = optional filters to sort, search, or refine results.