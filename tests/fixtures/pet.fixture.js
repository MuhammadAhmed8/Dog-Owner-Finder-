const mongoose = require('mongoose');
const faker = require('faker');
const Pet = require('../../src/models/pet.model');

exports.pet1 = {
    _id: mongoose.Types.ObjectId(),
    name: faker.name.findName(),
    color: "brown",
    size: "medium",
    weight: 20.5,
    breed: "german shepherd dog",
    location: "NY",
    gender: 'male'
};

exports.pet2 = {
    _id: mongoose.Types.ObjectId(),
    name: faker.name.findName(),
    color: "white",
    size: "small",
    weight: 25,
    breed: "african",
    location: "CA",
    gender: 'female'
};


exports.insertPets = async(pets) => {
    await Pet.insertMany(pets);
};
