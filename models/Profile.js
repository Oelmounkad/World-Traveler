const mongoose = require('mongoose')

const Profile = mongoose.model('Profile', {
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    fullName : {
        type: String,
        required: true,
        trim : true
    },
    sexe : {
        type : String,
        required: false
    },
    birthDate : {
        type: String,
        required: false
    },
    city : {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    profilePicture : {
        type: String,
        required: false
    },
    description : {
        type: String,
        required: false
    },
    portfolio : [{
        type: String,
        required : false
    }],
    languages : [{
        type: [String],
        required : false
    }],
    hobbies : [{
        type: String,
        required : false
    }]
})

module.exports = Profile



