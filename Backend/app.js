const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

const connectToDb = require('./db/db');

const userRoutes = require('./routes/user.route');


connectToDb();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send("Hello World!");
})

module.exports = app;