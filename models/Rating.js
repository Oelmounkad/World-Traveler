const mongoose = require('mongoose')

const Rating = mongoose.model('Rating',{
    rater: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    rated: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    rating: {
        type: String,
        required: true
    },
    opinion: {
        type: String,
        required: true
    },
    date : {
        type: Date,
        default: Date.now
    }
})

module.exports = Rating