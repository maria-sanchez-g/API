require("dotenv").config();
require("./config/db");  // initializes the MySQL connection

const http = require("http");
const app = require("./app");

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
