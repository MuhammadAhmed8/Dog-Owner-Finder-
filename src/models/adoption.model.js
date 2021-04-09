const mongoose = require('mongoose');

const adoptionSchema = mongoose.Schema({
    petId: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Pet'
    },

    userId: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User'
    },

    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },

    location: {
        type: String,
        required: true
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Adoption', adoptionSchema);
