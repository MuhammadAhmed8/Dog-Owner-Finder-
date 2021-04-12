const catchError = require("../utils/catchAsync");
const { petService, userService, messagingService } = require("../services");

exports.routeMessage = catchError(async(req, res, next) => {
    console.log("route message ");
    const userId = req.user._id;
    const { topic } = req.body;

    const pet = await petService.getPetById(topic.ref);
    console.log(pet)
    const staffMember = await userService.getStaffMemberIdByLocation(pet.location)
    const conv = await messagingService.createConversation(userId, staffMember, topic);
    req.params.id = conv._id;
    next();

})


exports.messageAuth = catchError(async(req, res, next) => {

    const isAuth = await messagingService.isParticipant(req.user._id, req.params.id);

    if (!isAuth) throw new ApiError(httpStatus.UNAUTHORIZED);

    next();

})
