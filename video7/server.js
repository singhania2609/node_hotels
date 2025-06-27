const express = require('express');
const app = express();

const db = require('./db'); // MongoDB connection file

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json

const Person = require('./models/person');
const MenuItem = require('./models/menuitem');

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to my hotel... How can I help you? We have a list of menu items.');
});

// POST route to add a new person
app.post('/person', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();

        console.log('Person saved:', response);
        res.status(200).json(response);
    } catch (err) {
        console.error('Error saving person:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET route to fetch all people
app.get('/person', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('People data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.error('Error fetching people:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST route to add a new menu item
app.post('/menuitem', async (req, res) => {
    try {
        const data = req.body;
        const newMenuItem = new MenuItem(data);
        const response = await newMenuItem.save();

        console.log('Menu item saved:', response);
        res.status(200).json(response);
    } catch (err) {
        console.error('Error saving menu item:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Optional: GET route to fetch all menu items
app.get('/menuitem', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log('Menu items fetched');
        res.status(200).json(data);
    } catch (err) {
        console.error('Error fetching menu items:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
