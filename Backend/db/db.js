const mongoose = require('mongoose');

async function connectToDb() {
    try {
        if(!process.env.DB_CONNECT) {
            throw new Error('DB_CONNECT environment variable is not set');
        }
        
        await mongoose.connect(process.env.DB_CONNECT, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log('Connected to database on ', process.env.DB_CONNECT);
    } catch (error) {
        console.error('Error while connecting to database:', error.message);
        console.log('Server will continue running without database connection...');
        console.log('Please ensure MongoDB is running on:', process.env.DB_CONNECT);
        // Don't exit - let the app run even if DB is unavailable
        // This allows the server to start and you can fix the DB issue separately
    }
}

module.exports = connectToDb;