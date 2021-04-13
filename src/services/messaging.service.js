const httpStatus = require("http-status");
const { Message, Conversation, User } = require("../models")
const { userService } = require("./");

const ApiError = require('../utils/ApiError');


exports.createConversation = async(member1, member2, topic) => {

    const conv = await Conversation.create({
        participants: [member1, member2],
        topic
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
        content: message,

    });

    return messageObject;

}



/**
 * This method will return messages in a conversation
 *
 * @param {String} convId - id of conversation
 * @return {Object} messages - all messages of a specific conversation
 */
exports.getMessages = async(convId, userId) => {

    const messages = await Message.find({ convId: convId }).populate("senderId").sort({ "_id": 1 });

    return messages;

}

exports.getAllConversations = async(userId) => {

    const conversations = await Conversation.find({ participants: userId }).populate("participants").sort({ "_id": -1 });

    return conversations;
}


exports.isParticipant = async(userId, convId) => {

    const conv = await Conversation.findOne({ _id: convId, participants: userId });

    if (conv) return true;

    return false;

}