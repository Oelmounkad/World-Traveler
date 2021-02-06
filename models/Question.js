const mongoose = require('mongoose')

const Question = mongoose.model('Question', {
    user : {
        type : mongoose.Types.ObjectId,
        ref : 'User'
    },
    description : {
        type : String,
        required : true
    },
    picture : {
        type : String
    },
    theme : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    likes : {
        type : Number,
        default : 0
    },
    likers : [{
        type : mongoose.Types.ObjectId,
        ref : 'User'
    }],
    comments : [{
        type : mongoose.Types.ObjectId,
        ref : 'Comment'
    }],
    date : {
        type: Date,
        default: Date.now
    }
})

module.exports = Question