const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchError = require('../utils/catchAsync');
const { userService } = require('../services');


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

    addToFavourites,
    getFavourites
};
