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
    theme : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    location : {
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
    }]
})

module.exports = Recommandation