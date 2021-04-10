const mongoose = require('mongoose');

const adoptionSchema = mongoose.Schema({
    pet: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Pet'
    },

    user: {
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
