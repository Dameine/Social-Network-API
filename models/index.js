// Purpose: Export all models in one place for easier importing in other files.
const Reaction = require('./Reaction');
const Thought = require('./Thought');
const User = require('./User');

// Export the models
module.exports = { Reaction, Thought, User };