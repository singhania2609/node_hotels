const express = require('express');
const app = express();

const db = require('./db'); // MongoDB connection file

require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // Middleware to parse JSON

//START SERVER
//process.env.PORT->this is online server
//3000 this start local server

const PORT=process.env.PORT || 3000;

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to our hotel');
});

// Person routes
const personRouter = require('./routes/personRoutes');
app.use('/person', personRouter);

// MenuItem routes
const menuitemRouter = require('./routes/MenuItemRoutes');
app.use('/menuitem', menuitemRouter);



// Start the server
//const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
