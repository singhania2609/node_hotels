const express = require('express');
const app = express();

const db = require('./db'); // MongoDB connection file

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // Middleware to parse JSON

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to our hotel');
});

// Person routes
const personRouter = require('./routes/personRouter');
app.use('/person', personRouter);

// MenuItem routes
const menuitemRouter = require('./routes/menuitemRouter');
app.use('/menuitem', menuitemRouter);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
