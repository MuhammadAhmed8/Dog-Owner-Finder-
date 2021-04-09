const httpStatus = require('http-status');
const catchError = require('../utils/catchAsync');
const { AdoptionService } = require('../services');

exports.createAdoptionRequest = catchError(async(req, res) => {

    const userId = req.user._id;
    const petId = req.body.petId;
    const adoption = await AdoptionService.requestAdoption(userId, petId);
    console.log("succ");
    res.status(httpStatus.CREATED, "Request for adoption created").send({ 'adoption': adoption });

})

exports.getAllAdoptionRequests = catchError(async(req, res) => {
    const userId = req.user._id;

})
