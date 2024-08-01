// Purpose: API routes for the application
const router = require('express').Router();
const userRoutes = require('./userRoute');
const thoughtRoutes = require('./thoughtRoute');

// Add the routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

// Export the router
module.exports = router;
