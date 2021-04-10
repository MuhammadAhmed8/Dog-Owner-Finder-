const httpStatus = require("http-status");
const { Message, Conversation, User } = require("../models")
const { userService } = require("./");

const ApiError = require('../utils/ApiError');


exports.createConversation = async(member1, member2) => {

    const conv = await Conversation.create({
        participants: [member1, member2]
    })

    return conv;

}



/**
 * This method will create a new message in the conversation
 *
 * @param {String} convId - id of conversation
 * @param {String} senderId - id of user who is sending the message
 * @param {Object} message - conetent of the message
 */

exports.createMessage = async(convId, senderId, message) => {

    let conv = await Conversation.findById(convId);

    if (!conv) {
        conv = await this.createConversation(senderId, receiverId);
    }

    const messageObject = await Message.create({
        convId: convId,
        senderId: senderId,
        content: message.payload,
        askedAbout: message.askedAbout

    });

    return messageObject;



}


exports.getMessages = async(convId) => {

    const messages = Message.find({ convId: convId }).sort({ "_id": 1 });

    return messages;



}
