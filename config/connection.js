const { connect, connection } = require('mongoose');

connect('mongodb://localhost:27017/socialNetworeDB');

module.exports = connection;
