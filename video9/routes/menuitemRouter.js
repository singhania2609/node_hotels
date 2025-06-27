const express = require('express');
const router = express.Router();

const MenuItem = require('./../models/menuitem');

// POST route to add a new menu item
router.post('/', async (req, res) => {
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

// GET all menu items
router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log('Menu items fetched');
        res.status(200).json(data);
    } catch (err) {
        console.error('Error fetching menu items:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET items by taste (parameter route)
router.get('/:tasteType', async (req, res) => {
    try {
        const tasteType = req.params.tasteType.toLowerCase(); // ✅ fixed typo
        if (['sour', 'sweet', 'spicy'].includes(tasteType)) {
            const response = await MenuItem.find({ taste: tasteType });
            console.log('Filtered items fetched');
            res.status(200).json(response);
        } else {
            res.status(400).json({ error: 'Invalid taste type' }); // 400 for bad input
        }
    } catch (err) {
        console.error('Error fetching by taste:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
