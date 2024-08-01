// Description: This file is the entry point for the application. It starts the server and connects to the database.
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Define the port the server will run on
const PORT = 3001;
const app = express();

// Middleware
app.use(express.json());
app.use(routes);

// Connect to the database before starting the Express.js server
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port http://localhost:${PORT}`);
    });
});

