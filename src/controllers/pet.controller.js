const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { petService } = require('../services')

const createPet = catchAsync(async(req, res) => {

    const pet = await petService.createPet(req.body);
    res.status(httpStatus.CREATED).send(pet)
})

const getPets = catchAsync(async(req, res) => {
    const pets = await petService.getPets();
    res.send(pets);
});

module.exports = {
    createPet,
    getPets
}
