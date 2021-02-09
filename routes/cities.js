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
         country: req.body.country,
         description: req.body.description,
         picture: img_url,
     })
     
     await city.save()
     res.send(city)
 
     }catch(e) {
        res.status(500).send(e)
    }
})


// // @route   GET api/cities
// // @desc    Gets all cities
// // @access  Public

router.get ('/', async (req, res) => {

    try {
       const cities = await City.find()
       if (!cities) {
        return  res.status(404).send('error : No cities')
      }
      res.send(cities)
    }catch(e) {
        res.status(500).send()
    }
})


// // @route   GET api/cities/:id
// // @desc    Gets a city by ID
// // @access  Public

router.get ('/:id', async (req, res) => {
    const _id = req.params.id

    try {
       const city = await City.findById(_id)
       if (!city) {
        return  res.status(404).send('error : City not found')
      }
      res.send(city)
    }catch(e) {
        res.status(500).send()
    }
})

module.exports = router