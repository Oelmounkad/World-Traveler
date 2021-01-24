const mongoose = require('mongoose')

const User = mongoose.model('User', {
    username : {
        type: String,
        required: true,
        unique: true,
        trim : true
    },
    fullName : {
        type: String,
        required: true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('This Email is not valid !')
            }
        }
    },
    password : {
        type : String,
        required : true,
        trim : true, 
        minlength : 7,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('The password can t contain the word "password", change it !')
            }
        }
    },
    sexe : {
        type : String,
        enum: ["Male","Female","Other"],
        required: true
    },
    birthdate : {
        type: Date,
        required: true
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
        type: String,
        required : false
    },
    languages : {
        type: String,
        required : false
    },
    hobbies : {
        type: String,
        required : false
    }

})

module.exports = User