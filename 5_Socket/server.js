// Load Express (a minimal web framework for building servers)
const express = require('express');

// Create an Express application
const app = express();

// Load Node's built-in HTTP module
const http = require('http');

// Create an HTTP server from the Express app
// Socket.IO needs a raw HTTP server to attach to
const server = http.createServer(app);

// Import Socket.IO server class
const { Server } = require("socket.io");

// Create a Socket.IO instance attached to our HTTP server
// io = "real-time message hub" that talks to all connected clients
const io = new Server(server);


// ----------- ROUTE TO SERVE THE FRONTEND FILE -----------------

// When the browser visits '/', send the index.html file
app.get('/', (req, res) => {
  // __dirname = the folder where server.js is located
  res.sendFile(__dirname + '/index.html');
});


// ----------- SOCKET.IO REAL-TIME CONNECTION HANDLING -----------

// This event runs EACH TIME a browser connects to the server
// socket = one single user's connection
io.on('connection', (socket) => {

  console.log('a user connected');

  // Listen for an event called "chat message" from the client
  // msg = the message text the user typed
  socket.on('chat message', (msg) => {
    console.log('message:', msg);

    // Send the message to ALL connected clients (including sender)
    // io.emit sends to EVERYONE
    io.emit('chat message', msg);
  });

  // Optional: log when the user disconnects
  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});


// ----------- START THE SERVER ON PORT 3000 -----------

server.listen(3000, () => {
  console.log('listening on *:3000');
});
