const mongoose = require('mongoose');

const petSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    breed: {
        type: String,
        required: true
    },

    image: {
        type: String,
    },

    color: {
        type: String,
        required: true
    },

    age: {
        type: Number
    },

    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },

    about: {
        type: String,
        maxLength: 50
    },

    size: {
        type: String,
        enum: ['small', 'medium', 'large', 'giant'],
        required: true
    },

    weight: {
        type: Number,
        required: true,
    },

    status: {
        type: String,
        enum: ['available', 'not available'],
        default: 'available'
    },

    location: {
        type: String,
        required: true
    }


}, {
    timestamps: true,
});

/**
 * @typedef Pet
 **/
const Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;
