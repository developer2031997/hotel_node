const express = require('express');
const connectMongoDB = require('./connection');
const passport = require('./auth');
require('dotenv').config();

const PORT = process.env.PORT;
const MONGO_DB_URL = process.env.MONGO_DB_URL;

const app = express();
const fs = require('fs');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

connectMongoDB(MONGO_DB_URL);

// Passport initialization
app.use(passport.initialize());

// Authentication middleware for logging requests
const logRequest = (req, res, next) => {
    const logmessage = `\n[${new Date().toLocaleString()}] Request Made to :  ${req.method} ${req.originalUrl}`;
    console.log(logmessage);
    fs.appendFile('request_logs.txt', logmessage, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        }
    });
    next(); // Move on to the next phase
};
// Apply logging middleware to all routes
app.use(logRequest);


const passwordMiddleware = passport.authenticate('local', { session:false });


// Route handler for the root route without authentication
app.get('/', (req, res) => {
    res.send("welcome to our project !!!");
});

// Authentication middleware for '/person' route

// Route handlers for '/person' and '/menuitem' routes with authentication
const personRouter = require("./routes/personRoute");
app.use('/person',passwordMiddleware, personRouter);

const menuitemRoute = require("./routes/menuitemRoute");
app.use('/menuitem', passwordMiddleware, menuitemRoute);

// Start the server
app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
});