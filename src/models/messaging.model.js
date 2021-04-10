const mongoose = require('mongoose');


const conversationSchema = mongoose.Schema({

    participants: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User'
    }],


}, {
    timestamps: true
})


const messageSchema = mongoose.Schema({

    senderId: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User'
    },

    content: {
        type: String,
        maxLength: 200,
        required: true,
    },

    isDeleted: {
        type: Boolean,
        default: false
    },

    isSeen: {
        type: Boolean,
        default: false
    },

    seenTime: {
        type: Date,
    }


}, {
    timestamps: true
})



module.exports.Conversation = mongoose.model("Conversation", conversationSchema);
module.exports.Message = mongoose.model("Message", messageSchema);
