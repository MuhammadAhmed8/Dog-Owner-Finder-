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

exports.updatePet = async(petBody) => {
    await Pet.updateOne({ _id: petBody.id }, {
        $set: {
            ...petBody
        }
    })

}


exports.deletePet = async(petId) => {
    await Pet.deleteOne({ _id: petId })
}

exports.getPets = async(pageOptions) => {
    const petCounts = await Pet.count();
    const pets = await Pet.find({}).skip(pageOptions.page).limit(pageOptions.limit);
    return { petCounts, pets };
}


exports.getPetById = async(petId) => {
    return await Pet.findById(petId);
}

exports.getPetByName = async(petName) => {
    return await Pet.findOne({ name: petName })
}

exports.getPetsByBreed = async(petBreed, pageOptions) => {
    const petCounts = await Pet.count({ breed: petBreed });
    const pets = await Pet.find({ breed: petBreed }).skip(pageOptions.skip).limit(pageOptions.limit);
    return { petCounts, pets };
}

exports.checkIsPetAvailable = async(petId) => {
    const pet = await Pet.findOne({ _id: petId });
    if (pet && pet.status.toLowerCase() === "available") {
        return true;
    }

    return false;

}
