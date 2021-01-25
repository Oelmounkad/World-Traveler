const mongoose = require('mongoose')

const Recommandation = mongoose.model('Recommandation', {
    user : {
        type : mongoose.Types.ObjectId,
        ref : 'User'
    },
    description : {
        type : String,
        required : true
    },
    pictures : {
        type : [String]
    },
    city : {
        type : String,
        required : true
    },
    location : {
        type : String
    },
    likes : {
        type : Number,
        default : 0
    },
    likers : [{
        type : mongoose.Types.ObjectId,
        ref : 'User'
    }],
    comments : {
        type : mongoose.Types.ObjectId,
        ref : 'Comment'
    }
})

module.exports = Recommandation