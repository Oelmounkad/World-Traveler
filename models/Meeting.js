const mongoose = require('mongoose')

const Meeting = mongoose.model('Meeting',{
    user_1 : {
        type : mongoose.Types.ObjectId,
        ref : 'User'
    },
    user_2 : {
        type : mongoose.Types.ObjectId,
        ref : 'User' 
    },
    location : {
        type : String,
        required : true
    },
    time : {
        type : String,
        required : true
    },
    statut : {
        type : String
    }
})

module.exports = Meeting