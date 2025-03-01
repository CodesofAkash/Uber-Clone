const mongoose = require('mongoose');

async function connectToDb() {
    try {
        if(!process.env.DB_CONNECT) {
            throw new Error('DB_CONNECT environment variable is not set');
        }
    } catch (error) {
        console.error('Error while connecting to database : ', error.message);
        process.exit(1);
    }

    try {
        await mongoose.connect(process.env.DB_CONNECT);
        console.log('Connected to database on ', process.env.DB_CONNECT);
    } catch (error) {
        console.error('Error while connecting to database', error);
    }
}

module.exports = connectToDb;