// database interaction

const mongoose = require('mongoose');

require('dotenv').config();


// Define the MongoDB connection URL

//this URL is local URL
//cancel this local//const mongoURL = 'mongodb://localhost:27017/hotel'; // Database name is 'hotel'

//using this local URL 
const mongoURL=process.env.MONGODB_URL_LOCAL;

//this URL is MongoDB online URL
//const mongoURL= 'mongodb+srv://helloworld:123Rahul@cluster0.j5lze88.mongodb.net/hotel?retryWrites=true&w=majority';


//const mongoURL=process.env.MONGODB_URL;



// Set up MongoDB connection — no options needed
mongoose.connect(mongoURL);



// Get the default connection
const db = mongoose.connection;

// Define event listeners for database connection
db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// Export database connection
module.exports = db;
