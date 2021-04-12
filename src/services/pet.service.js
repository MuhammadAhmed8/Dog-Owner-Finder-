const httpStatus = require("http-status");
const Pet = require("../models/pet.model")
const User = require("../models/user.model")

exports.createPet = async(petBody) => {
    const pet = await Pet.create(petBody);
    if (!pet) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Pet not created");
    }
    return pet;
}

exports.updatePet = async(petId, petBody) => {

    if ('_id' in petBody) {
        delete petBody["_id"];
    }

    return await Pet.findOneAndUpdate({ _id: petId }, petBody, { new: true })

}


exports.deletePet = async(petId) => {
    await Pet.deleteOne({ _id: petId })
}

exports.getPets = async(filter, options) => {
    const petCounts = await Pet.count(filter);
    const pets = await Pet.find({...filter }).sort({ '_id': -1 }).skip(options.skip).limit(options.limit)

    return { petCounts, pets };
}


exports.getPetById = async(petId) => {
    return await Pet.findById(petId);
}

exports.getPetByName = async(petName) => {
    return await Pet.findOne({ name: petName })
}


exports.checkIsPetAvailable = async(petId) => {
    const pet = await Pet.findOne({ _id: petId });
    if (pet && pet.status.toLowerCase() === "available") {
        return true;
    }

    return false;

}
