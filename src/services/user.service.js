const httpStatus = require('http-status');
const { User } = require('../models');
const { Pet } = require('../models');

const ApiError = require('../utils/ApiError');
const { petService } = require('../services');

const mongoose = require('mongoose')

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
exports.createUser = async(userBody) => {
    if (await User.isEmailTaken(userBody.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    const user = await User.create(userBody);
    return user;
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
exports.queryUsers = async(filter, options) => {
    const users = await User.paginate(filter, options);
    return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
exports.getUserById = async(id) => {
    return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
exports.getUserByEmail = async(email) => {
    return User.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
exports.updateUserById = async(userId, updateBody) => {
    const user = await getUserById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    Object.assign(user, updateBody);
    await user.save();
    return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
exports.deleteUserById = async(userId) => {
    const user = await getUserById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    await user.remove();
    return user;
};

exports.addPetsToUserFavourites = async(petId, userId) => {

    let pet = Pet.findById(petId);

    if (!pet) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Pet does not exist");

    }
    const user = await User.updateOne({ _id: userId }, {
        $addToSet: {
            favourites: petId
        }
    })

    return user.favourites
}


exports.petsManageRights = async(userId, location) => {
    const user = await this.getUserById(userId);
    return user.location.toLowerCase() === location.toLowerCase();
}
