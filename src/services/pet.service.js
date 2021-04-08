const httpStatus = require("http-status");
const Pet = require("../models/pet.model")
const User = require("../models/user.model")

const createPet = async(petBody) => {
    const pet = await Pet.create(petBody);
    if (!pet) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Pet not created");
    }
    return pet;
}

const updatePet = async(petBody) => {
    await Pet.updateOne({ _id: petBody.id }, {
        $set: {
            ...petBody
        }
    })

}


const deletePet = async(petId) => {
    await Pet.deleteOne({ _id: petId })
}

const getPets = async(pageOptions) => {
    return await Pet.find({}).skip(pageOptions.page).limit(pageOptions.limit);
}


const getPetById = async(petId) => {
    return await Pet.findById(petId);
}

const getPetByName = async(petName) => {
    return await Pet.findOne({ name: petName })
}

const getPetsByBreed = async(petBreed, pageOptions) => {
    return await Pet.find({ breed: petBreed }).skip(pageOptions.skip).limit(pageOptions.limit);
}


module.exports = {
    createPet,
    updatePet,
    deletePet,
    getPetById,
    getPetByName,
    getPetsByBreed,
    getPets
}
