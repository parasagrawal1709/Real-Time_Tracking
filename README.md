# Real-Time_Tracking

This application allows real-time tracking of users on a map using Leaflet and Socket.IO.

## Features

- **Real-Time Tracking**: Track multiple users simultaneously on a map.
- **Dynamic Marker Updates**: Markers update in real-time as users move.
- **Socket.IO Integration**: Facilitates real-time bidirectional communication.
- **Responsive Design**: Designed to be responsive for various screen sizes.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript (Leaflet for maps, Socket.IO for real-time updates)
- **Backend**: Node.js, Express.js, Socket.IO

## Installation

1. Clone the repository:
  `git clone <repository-url>`
  `cd <repository-directory>`

2. Install dependencies: `npm install`

3. Start the server: `npm start`

4. Open the application in your browser: `http://localhost:3000`

## Usage

- Upon opening the application, you will see a map displaying markers for connected users.
- Users' locations are updated in real-time as they move.
- Each user is represented by a marker that updates its position based on their location updates.


## Acknowledgements

- Leaflet - Open-source JavaScript library for mobile-friendly interactive maps.
- Socket.IO - JavaScript library for real-time web applications.
