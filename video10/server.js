const express = require('express');
const app = express();

const db = require('./db'); // MongoDB connection file

require('dotenv').config();

const passport=require('./../auth')  //import

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // Middleware to parse JSON

//START SERVER
//process.env.PORT->this is online server
//3000 this start local server

const PORT=process.env.PORT || 3000;

//Middleware Function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next(); // Move on to the next phase
}
app.use(logRequest);


//authencation
app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local', {session: false})


// Root route
app.get('/',localAuthMiddleware,(req, res) => {
    res.send('Welcome to our hotel');
});



// Import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/MenuItemRoutes');

// Use the routers
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);


// Start the server
//const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
