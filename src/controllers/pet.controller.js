const httpStatus = require('http-status');
const catchError = require('../utils/catchAsync');
const { petService } = require('../services');
const pick = require('../utils/pick');



const createPet = catchError(async(req, res) => {

    /*
      Post Pet Action. Calls the pet service to create new
      pets. Needs authorization.
    */

    const pet = await petService.createPet(req.body);
    res.status(httpStatus.CREATED).send({ pet });

})


const getPets = catchError(async(req, res) => {

    /*
      Get Pet Action. Returns the pets documents. Also Filters
      the response based on the query params. Possible filters are
      breed, age, color, size, limit, and page.
    */

    let defaultLimit = 4;
    let limit = !req.query.limit ? defaultLimit : +req.query.limit;
    let page = !req.query.page || req.query.page < 1 ? 1 : +req.query.page;
    let sortBy = req.query.sortBy;
    let orderBy = req.query.orderBy;

    let options = {
        'limit': limit,
        'skip': (page - 1) * limit,
    }

    let filter = pick(req.query, ['breed', 'color', 'age', 'size']);

    console.log(options)

    const pets = await petService.getPets(filter, options);



    res.send(pets); // STATUS CODE Default 200
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
