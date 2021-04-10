const httpStatus = require('http-status');
const catchError = require('../utils/catchAsync');
const { petService } = require('../services')

const createPet = catchError(async(req, res) => {

    const pet = await petService.createPet(req.body);
    res.status(httpStatus.CREATED).send(pet)
})

const getPets = catchError(async(req, res) => {
    let pets;
    console.log(req.query)
    let pageOptions = {
        'limit': 2,
        'skip': (+req.query.page - 1) * 2,
    }
    console.log(pageOptions)
    if (req.query.breed) {
        pets = await petService.getPetsByBreed(req.query.breed.toLowerCase(), pageOptions)
    } else {
        pets = await petService.getPets(pageOptions);
    }

    res.send(pets);
});

const getPetById = catchError(async(req, res) => {
    console.log(req.params.id);
    const pet = await petService.getPetById(req.params.id);
    res.send(pet);
})

const updatePet = catchError(async(req, res) => {

    const { id } = req.params;
    const petDetails = req.body // req.body will contain all the updated fields for the pet
    const pet = await petService.updatePet(id, petDetails);;
    res.send(pet);
});

const deletePet = catchError(async(req, res) => {
    await petService.deletePet(req.params.userId);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createPet,
    getPets,
    getPetById,
    updatePet,
    deletePet
}
