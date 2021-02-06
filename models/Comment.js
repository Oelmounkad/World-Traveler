const mongoose = require('mongoose')

const Comment = mongoose.model('Comment',{
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    description: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    likers : [{
        type : mongoose.Types.ObjectId,
        ref : 'User'
    }],
    date : {
        type: Date,
        default: Date.now
    }
})

module.exports = Comment