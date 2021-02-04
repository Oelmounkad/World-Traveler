const mongoose = require('mongoose')


const User = mongoose.model('User', {
    profile: {
        type: mongoose.Types.ObjectId,
        ref: 'Profile'
    },
    username : {
        type: String
    },
    email : {
        type : String 
    },
    password : {
        type : String    
    }  
},'users')

module.exports = User