const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { petService } = require('../services')

const createPet = catchAsync(async(req, res) => {

    const pet = await petService.createPet(req.body);
    res.status(httpStatus.CREATED).send(pet)
})

const getPets = catchAsync(async(req, res) => {
    let pets;
    console.log(req.query)
    let pageOptions = {
        'limit': 10,
        'skip': +(req.query.page - 1) * 10,
    }
    console.log(pageOptions)
    if (req.query.breed) {
        pets = await petService.getPetsByBreed(req.query.breed.toLowerCase(), pageOptions)
    } else {
        pets = await petService.getPets(pageOptions);
    }

    res.send(pets);
});

const getPetById = catchAsync(async(req, res) => {
    console.log(req.params.id);
    const pet = await petService.getPetById(req.params.id);
    res.send(pet);
})

module.exports = {
    createPet,
    getPets,
    getPetById
}
