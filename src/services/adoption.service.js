const httpStatus = require("http-status");
const Pet = require("../models/pet.model")
const User = require("../models/user.model")
const Adoption = require("../models/adoption.model")
const PetService = require("./pet.service");
const ApiError = require('../utils/ApiError');


exports.requestAdoption = async(userId, petId) => {

    const isAvailable = PetService.checkIsPetAvailable(petId);

    if (!isAvailable) {
        throw new ApiError(httpStatus.NOT_FOUND, "Pet not available");
    }


    return await Adoption.create({ userId, petId });
}

exports.getAllAdoptionRequests = async(userId) => {



}
