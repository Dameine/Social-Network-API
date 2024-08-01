// Purpose: This file is the entry point for the routes folder. It will import the api routes and export them to the server.js file.
const router = require('express').Router();
const apiRoutes = require('./api');

// Add prefix of `/api` to all of the api routes imported from the `api` directory
router.use('/api', apiRoutes);

// If the route is not defined, return a 404 error
router.use((req, res) => {
    res.status(404).send('<h1>404 Error</h1>');
});

// Export the router
module.exports = router;