const mongoose = require('mongoose');

let currentConnection;

// Function to connect to a specific database
const connectToDatabase = async (databaseURL) => {
    try {
        currentConnection = await mongoose.createConnection(databaseURL);
        console.log(`Connected to database: ${databaseURL}`);
    } catch (error) {
        console.error(`Error connecting to database: ${error.message}`);
    }
};

const getCurrentConnection = () => {
    return currentConnection;
}

// Function to disconnect from the current database
const disconnectFromDatabase = async () => {
    if (currentConnection) {
        await currentConnection.close();
        console.log('Disconnected from the current database');
    }
};

module.exports = {
    connectToDatabase,
    getCurrentConnection,
    disconnectFromDatabase,
}