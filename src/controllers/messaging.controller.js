const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const catchError = require('../utils/catchAsync');
const { messagingService, userService, petService } = require('../services');


exports.postMessage = catchError(async(req, res) => {

    const senderId = req.user._id;
    const { id } = req.params;
    const { message } = req.body;

    const msg = await messagingService.createMessage(id, senderId, message)

    return res.send({ message: msg });

})


exports.getMessages = catchError(async(req, res) => {

    const { id } = req.params;

    const messages = await messagingService.getMessages(id);

    return res.send({ messages });

})


exports.getConversations = catchError(async(req, res) => {

    const userId = req.user._id;

    const messages = await messagingService.getAllConversations(userId);

    return res.send({ messages });

})
