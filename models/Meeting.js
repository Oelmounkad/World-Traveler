const mongoose = require('mongoose')

const Meeting = mongoose.Meeting('Meeting',{
    user_1 : {
        type : mongoose.Types.ObjectId,
        ref : 'User'
    },
    user_2 : {
        type : mongoose.Types.ObjectId,
        ref : 'User'
    },
    location : {
        type : String
    },
    time : {
        type : String
    },
    statut : {
        type : String
    }
})