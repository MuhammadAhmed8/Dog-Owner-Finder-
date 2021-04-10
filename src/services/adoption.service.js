const httpStatus = require("http-status");
const Pet = require("../models/pet.model")
const User = require("../models/user.model")
const Adoption = require("../models/adoption.model")
const { userService, petService } = require("./");

const ApiError = require('../utils/ApiError');


exports.requestAdoption = async(userId, petId) => {

    const pet = await petService.getPetById(petId);

    if (!pet) {
        throw new ApiError(httpStatus.NOT_FOUND, "Pet not available");
    }


    return await Adoption.create({ userId: userId, petId: pet._id, location: pet.location });
}

exports.getAllAdoptionRequests = async(userId) => {

    const user = await userService.getUserById(userId);
    return await Adoption.find({ location: user.location }).populate("user pet").sort({ createdAt: -1 });

}

exports.changeRequestStatus = async(userId, requestId, newStatus) => {

    const adoptionRequest = await Adoption.findOne({ _id: requestId });

    if (!adoptionRequest) {
        throw new ApiError(httpStatus.NOT_FOUND);
    }

    if (!userService.petsManageRights(userId, adoptionRequest.location)) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You don't have enough rights. ");

    }

    if (adoptionRequest.status !== "pending") {
        throw new ApiError(httpStatus.NOT_ACCEPTABLE, "Accepted/Rejected status can't be changed directly. ");

    }

    return await Adoption.findOneAndUpdate({ _id: requestId }, {
        $set: {
            status: newStatus
        }
    })


}
