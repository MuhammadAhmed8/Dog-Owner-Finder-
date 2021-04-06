const mongoose = require('mongoose');

const PetSchema = mongoose.Schema({
    name: {
        type: String
    },

    breed: {
        type: String,
        required: true
    },

    image: {
        type: [],
    },

    color: {
        type: String,
        required: true
    },

    age: {
        type: Number
    }

}, {
    timestamps: true,
});

/**
 * @typedef Pet
 **/
const Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;
