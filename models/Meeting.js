const mongoose = require('mongoose')

const Meeting = mongoose.model('Meeting',{
    requester : {
        type : mongoose.Types.ObjectId,
        ref : 'User'
    },
    hoster : {
        type : mongoose.Types.ObjectId,
        ref : 'User' 
    },
    location : {
        type : String
    },
    message : {
        type : String
    },
    time : {
        type : String
    },
    statut : {
        type : String
    }
})

module.exports = Meeting