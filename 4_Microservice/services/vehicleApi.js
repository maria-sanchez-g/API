// This file communicates directly with the third-party OpenDataSoft API
const axios = require("axios");

// Load base URL and default limit from environment variables
const BASE = process.env.ODS_BASE;
const DEFAULT_LIMIT = Number(process.env.DEFAULT_LIMIT || 20); // If backend  has pagination like GET /recipes?limit=20

// Helper function to build query parameters dynamically
function buildQuery({ page = 1, limit = DEFAULT_LIMIT, make, model, year, order = "year DESC" }) {
    //This part extracts query parameters from the request It allows you to call:/cars?page=2&limit=10&make=Toyota

  // Convert text values into safe numbers
  const safeLimit = Math.min(Number(limit) || DEFAULT_LIMIT, 100); //Converts limit from text → number, If conversion fails → uses DEFAULT_LIMIT
  const safePage = Math.max(Number(page) || 1, 1);
  const offset = (safePage - 1) * safeLimit; // For pagination, This calculates how many records to skip.

  // Build WHERE filters based on provided query parameters
  const where = [];
  if (make) where.push(`make LIKE "${make}%"`); //If user searches for make=Toyota it creates make LIKE "Toyota%"
  if (model) where.push(`model LIKE "${model}%"`);
  if (year) where.push(`year = ${Number(year)}`);

  // Construct final query object for Axios
  const params = { limit: safeLimit, offset, order_by: order };
  if (where.length) params.where = where.join(" AND ");
  return params;
}

// Function to fetch vehicles based on query parameters, main search with filters and pagination
async function fetchVehicle(query) {
  const params = buildQuery(query); // Build query string dynamically
  const { data } = await axios.get(BASE, { params }); // Call OpenDataSoft API
  return {
    total: data.total_count ?? 0, // Total number of matching records. Uses ?? 0 (nullish coalescing) to fallback to 0 when total_count is null or undefined.
    count: data.results?.length ?? 0, // Number of items fetched. Uses optional chaining .?. to avoid error if results is undefined.
    items: data.results ?? [], // Actual array of vehicles
  };
}

// Function to fetch vehicles by model name (param route)
async function fetchByModel(model) {
  const params = { where: `model LIKE "${model}"`, limit: 50, order_by: "year DESC" };
  const { data } = await axios.get(BASE, { params });
  return data.results ?? [];
}

// Export functions so they can be used by the controller
module.exports = { fetchVehicle, fetchByModel };

//This file is where you put the logic that talks to the external API (OpenDataSoft) so that your controllers stay clean.

//I need all of this because I'm using SQL, I didn't need it in MongoDB

// function buildQuery protects your API from bad input (validation):
// Users can send anything in the URL, for example:

// ?page=hello
// &limit=999999
// &year=DROP TABLE cars

//Without this function, the backend could:
// break
// leak data
// crash
// run extremely slow

