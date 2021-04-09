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
    const adoptionRequests = await AdoptionService.getAllAdoptionRequests(userId);

    res.send(adoptionRequests);
})


exports.changeRequestStatus = catchError(async(req, res) => {
    const userId = req.user._id;
    const requestId = req.body.requestId;
    const newStatus = req.body.status;

    const adoptionRequest = await AdoptionService.changeRequestStatus(userId, requestId, newStatus);
    res.send(adoptionRequest);
})
