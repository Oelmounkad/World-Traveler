const mongoose = require('mongoose')

const City = mongoose.model('City',{
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    picture : {
        type : String,
        required : true
    }
})

module.exports = City