const mongoose = require('mongoose');


const conversationSchema = mongoose.Schema({

    participants: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User'
    }],
    topic: {
        type: {},
        required: true
    }

}, {
    timestamps: true
})


const messageSchema = mongoose.Schema({

    senderId: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User'
    },

    convId: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Conversation'
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



exports.Conversation = mongoose.model("Conversation", conversationSchema);
exports.Message = mongoose.model("Message", messageSchema);
