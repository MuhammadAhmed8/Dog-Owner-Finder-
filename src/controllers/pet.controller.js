const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');

const createPet = catchAsync(async(req, res) => {
    res.status(httpStatus.CREATED).send({ pet: "created" })
})


exports.createPet = createPet;
