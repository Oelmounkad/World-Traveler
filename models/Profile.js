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
        enum: ["Male","Female","Other"],
        required: true
    },
    birthdate : {
        type: Date,
        required: false
    },
    city : {
        type: String,
        required: true
    },
    profilePicture : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: false
    },
    portfolio : {
        type: [String],
        required : false
    },
    languages : {
        type: [String],
        required : false
    },
    hobbies : {
        type: String,
        required : false
    },
})

module.exports = Profile



