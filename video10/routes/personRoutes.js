const express = require('express');
const router = express.Router();

const Person = require('../models/Person');

// POST /person → Add a new person
router.post('/', async (req, res) => {
    try {
        const newPerson = new Person(req.body);
        const response = await newPerson.save();
        console.log('Person saved:', response);
        res.status(201).json(response); // 201: Created
    } catch (err) {
        console.error('Error saving person:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /person → Fetch all people
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('People data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.error('Error fetching people:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /person/:workType → Filter by work type (chef, manager, waiter)
router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType.toLowerCase();
        const allowedTypes = ['chef', 'manager', 'waiter'];

        if (!allowedTypes.includes(workType)) {
            return res.status(400).json({ error: 'Invalid work type' });
        }

        const response = await Person.find({ work: workType });
        console.log(`People with work '${workType}' fetched`);
        res.status(200).json(response);
    } catch (err) {
        console.error('Error fetching work type:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PUT /person/:id → Update a person by ID
router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedData = req.body;

        const result = await Person.findByIdAndUpdate(personId, updatedData, {
            new: true,
            runValidators: true
        });

        if (!result) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('Person updated:', result);
        res.status(200).json(result);
    } catch (err) {
        console.error('Error updating person:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE /person/:id → Delete a person by ID
router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const result = await Person.findByIdAndDelete(personId);

        if (!result) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('Person deleted:', result);
        res.status(200).json({ message: 'Person deleted successfully', data: result });
    } catch (err) {
        console.error('Error deleting person:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//commded for testing purpose

module.exports = router;
