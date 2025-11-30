require("dotenv").config(); //It takes the variables inside .env and loads them into process.env.This allows you to access values like process.env.PORT or process.env.MONGO_URI.
const http = require("http"); //This loads the built-in Node.js http module that allows to manually create an HTTP server. You need this when you want more control than app.listen() provides.
const app = require("./app"); //This imports your Express application from the file app.js. app.js contains your middlewares, routes, and configuration.

const PORT = process.env.PORT || 3000; //This reads the PORT variable from your .env file.

const server = http.createServer(app); //This creates an HTTP server using the Node.js http module.

server.listen(PORT, () => { //This tells the server to begin listening for incoming requests.
  console.log(`Server running on http://localhost:${PORT}`);
});