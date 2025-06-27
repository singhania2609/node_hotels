const mongoose = require('mongoose');

// Define the Person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // ✅ fixed
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    email: {
        type: String,
        required: true, // ✅ fixed
        unique: true
    },
    salary: {
        type: Number,
        required: true
    }
});

// Create the Person model
const Person = mongoose.model('Person', personSchema); // ✅ Capitalized

module.exports = Person;
