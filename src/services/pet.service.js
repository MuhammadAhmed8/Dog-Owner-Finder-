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

exports.getPets = async(pageOptions) => {
    const petCounts = await Pet.count();
    const pets = await Pet.find({}).skip(pageOptions.skip).limit(pageOptions.limit);
    return { petCounts, pets };
}


exports.getPetById = async(petId) => {
    return await Pet.findById(petId);
}

exports.getPetByName = async(petName) => {
    return await Pet.findOne({ name: petName })
}

exports.getPetsByBreed = async(petBreed, pageOptions) => {
    const pattern = { '$regex': petBreed, $options: 'i' };

    const petCounts = await Pet.count({ breed: pattern });

    const pets = await Pet.find({ breed: pattern }).skip(pageOptions.skip).limit(pageOptions.limit);

    return { petCounts, pets };
}

exports.checkIsPetAvailable = async(petId) => {
    const pet = await Pet.findOne({ _id: petId });
    if (pet && pet.status.toLowerCase() === "available") {
        return true;
    }

    return false;

}
