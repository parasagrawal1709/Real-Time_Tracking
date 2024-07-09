// Importing necessary modules
const express = require('express'); // Express framework for server
const app = express(); // Creating an instance of Express
const path = require("path"); // Path module for handling file paths
const http = require("http"); // HTTP server module
const socketio = require("socket.io"); // Socket.io for real-time bidirectional event-based communication

// Creating an HTTP server instance using Express
const server = http.createServer(app);

// Integrating Socket.io with the HTTP server
const io = socketio(server);

// Setting up the view engine for rendering dynamic content (using EJS in this case)
app.set("view engine", "ejs");

// Serving static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Handling socket.io events
io.on('connection', function (socket) {
    console.log('A user connected'); // Logging when a user connects

    // Handling 'send-location' event from clients
    socket.on('send-location', function (data) {
        // Emitting 'receive-location' event to all clients with the received data
        io.emit('receive-location', { id: socket.id, ...data });
    });

    // Handling disconnection of clients
    socket.on('disconnect', function () {
        console.log('A user disconnected'); // Logging when a user disconnects
        // Emitting 'user-disconnected' event to all clients with the disconnected socket id
        io.emit('user-disconnected', socket.id);
    });
});

// Handling GET request to the root URL '/'
app.get("/", function (req, res) {
    // Rendering 'index.ejs' file when accessing the root URL
    res.render("index");
});

// Starting the HTTP server on port 3000
server.listen(3000, function () {
    console.log("Server is running on port 3000"); // Logging when the server starts listening
});
