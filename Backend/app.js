const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connectToDb = require('./db/db');

const userRoutes = require('./routes/user.route');
const captainRoutes = require('./routes/captain.route');
const mapRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');


connectToDb();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapRoutes);
app.use('/rides', rideRoutes);

app.get('/', (req, res) => {
    res.send("Hello World!");
})

// Add a test route to check if routes are working
app.get('/test', (req, res) => {
    res.json({ message: 'Test route working' });
});

// Debug middleware to log all requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - Route not found`);
    res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    
    // Handle validation errors
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            errors: Object.values(err.errors).map(e => e.message)
        });
    }
    
    // Handle duplicate key errors
    if (err.code === 11000) {
        return res.status(400).json({
            success: false,
            message: 'Email already exists'
        });
    }
    
    // Handle JWT errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }
    
    // Default error response
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal server error'
    });
});

module.exports = app;