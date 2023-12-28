const config = require('./db.config');

// connect to database
config.connectToDatabase(process.env.YOUR_MONGODB_URI_USER);

// Function to get the current connection
const getCurrentConnection = () => {
    return config.getCurrentConnection();
};

module.exports = {
    getCurrentConnection,
};
