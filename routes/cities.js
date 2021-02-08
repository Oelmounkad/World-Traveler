const express = require('express')
const router = express.Router()

const City = require('../models/City')

const cloudinary = require('../utils/cloudinary')

const auth = require('../middleware/auth')



// POST /api/cities
// @desc Adds a city
// @access Private

router.post('/', auth, async (req, res) => {

    try {
        
        let img_url = ""
        
    // upload images to cloudinary
    
        await cloudinary.uploader.upload(req.body.picture)
        .then((result) => {
            img_url = result.secure_url
        })
        .catch((e) => { 
            res.status(500).send(e)
        })

      
    //create the City 
     const city = new City({
         title: req.body.title,
         description: req.body.description,
         picture: img_url,
     })
     
     await city.save()
     res.send(city)
 
     }catch(e) {
        res.status(500).send(e)
    }
})

module.exports = router