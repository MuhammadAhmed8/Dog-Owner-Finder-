const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchError = require('../utils/catchAsync');
const { userService } = require('../services');

const createUser = catchError(async(req, res) => {
    const user = await userService.createUser(req.body);
    res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchError(async(req, res) => {
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await userService.queryUsers(filter, options);
    res.send(result);
});

const getUser = catchError(async(req, res) => {
    const user = await userService.getUserById(req.params.userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    res.send(user);
});

const updateUser = catchError(async(req, res) => {
    const user = await userService.updateUserById(req.params.userId, req.body);
    res.send(user);
});

const deleteUser = catchError(async(req, res) => {
    await userService.deleteUserById(req.params.userId);
    res.status(httpStatus.NO_CONTENT).send();
});

const addToFavourites = catchError(async(req, res) => {
    const favs = await userService.addPetsToUserFavourites(req.body.petId, req.user._id);
    res.status(httpStatus.NO_CONTENT).send({
        favourites: favs
    })
})

const getFavourites = catchError(async(req, res) => {

    const userId = req.user._id;
    const favs = await userService.getFavourites(userId);
    res.send(favs);

})

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    addToFavourites,
    getFavourites
};
