const mongoose = require('mongoose')

const Profil = mongoose.model('Profil', {
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
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }
})

module.exports = Profil


