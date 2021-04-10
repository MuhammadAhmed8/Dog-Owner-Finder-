const catchError = require("../utils/catchAsync");
const { petService, userService, messagingService } = require("../services");

exports.routeMessage = catchError(async(req, res, next) => {
    console.log("route message ");
    const userId = req.user._id;
    const { petId } = req.body;

    const pet = await petService.getPetById(petId);
    const staffMember = await userService.getStaffMemberIdByLocation(pet.location)
    const conv = await messagingService.createConversation(userId, staffMember);
    req.params.convId = conv._id;
    next();

})
