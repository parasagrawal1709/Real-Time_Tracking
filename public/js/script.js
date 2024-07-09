// Establish a connection with the Socket.IO server
let socket = io();

// Initialize Leaflet map centered at coordinates [0, 0] with zoom level 16
let map = L.map("map").setView([0, 0], 16);

// Add OpenStreetMap tiles as the base layer to the map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "OpenStreetMap"
}).addTo(map);

// Object to store markers associated with connected clients
const markers = {};

// Check if geolocation is supported by the browser
if (navigator.geolocation) {
    // Watch for changes in geolocation position
    navigator.geolocation.watchPosition(
        // Success callback when position is updated
        (position) => {
            // Extract latitude and longitude from geolocation data
            const { latitude, longitude } = position.coords;
            // Emit a 'send-location' event to the server with current coordinates
            socket.emit("send-location", { latitude, longitude });
        },
        // Error callback if geolocation fails
        (error) => {
            console.log(error); // Log the error to console
        },
        {
            // Options for geolocation accuracy, timeout, and caching behavior
            enableHighAccuracy: true, // High accuracy mode enabled
            timeout: 5000, // Timeout after 5 seconds if position retrieval takes too long
            maximumAge: 0 // Maximum cache age set to 0 seconds
        }
    );
}

// Event listener for receiving location updates from other clients
socket.on('receive-location', (data) => {
    const { id, latitude, longitude } = data;
    // Set the map view to the received coordinates with zoom level 16
    map.setView([latitude, longitude], 16);
    // Check if a marker for the client already exists
    if (markers[id]) {
        // Update the existing marker's position to the received coordinates
        markers[id].setLatLng([latitude, longitude]);
    } else {
        // Create a new marker at the received coordinates and add it to the map
        markers[id] = L.marker([latitude, longitude]).addTo(map);
    }
});

// Event listener for when a user disconnects from the server
socket.on("user-disconnected", (id) => {
    // Check if a marker exists for the disconnected user
    if (markers[id]) {
        // Remove the marker from the map
        map.removeLayer(markers[id]);
        // Delete the marker reference from the markers object
        delete markers[id];
    }
});
