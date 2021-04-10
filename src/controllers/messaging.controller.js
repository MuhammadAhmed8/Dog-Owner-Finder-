const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const catchError = require('../utils/catchAsync');
const { messagingService, userService, petService } = require('../services');


exports.postMessage = catchError(async(req, res) => {

    const senderId = req.user._id;
    const { convId } = req.params;
    const { message } = req.body;

    await messagingService.createMessage(convId, senderId, message)

    return res.send({ 'success': true });

})


exports.getMessages = catchError(async(req, res) => {

    const { convId } = req.params;

    const messages = await messagingService.getMessages(convId);

    return res.send({ messages });

})
