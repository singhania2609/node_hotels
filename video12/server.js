require('dotenv').config(); // Load env vars first

const express = require('express');
const app = express();

const db = require('./db'); // MongoDB connection file

const passport = require('./../auth'); // Adjust path based on your structure

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // Middleware to parse JSON

const PORT = process.env.PORT || 3000;

// Middleware Function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next();
};

app.use(logRequest);

// Authentication
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', { session: false });

// Root route
app.get('/',(req, res) => {
    res.send('Welcome to our hotel');
});

// Import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/MenuItemRoutes');

// Use the routers
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
