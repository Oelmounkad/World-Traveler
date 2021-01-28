const express = require('express')
const router = express.Router()

const Recommandation = require('../models/Recommandation')

const cloudinary = require('../utils/cloudinary')

const auth = require('../middleware/auth')

// POST /api/recommandations
// @desc Adds a user's recommandation
// @access Private

router.post('/', auth, async (req, res) => {

    try {
        
        let img_url = []
        
    // upload images to cloudinary
    for (let i = 0; i < req.body.pictures.length; i++) {
        await cloudinary.uploader.upload(req.body.pictures[i])
        .then((result) => {
            img_url.push(result.secure_url)
        })
        .catch((e) => { 
            res.status(500).send(e)
        })
      }
      
    //create the Recommandation 
     const recommandation = new Recommandation({
         user: req.sub,
         description: req.body.description,
         city: req.body.city,
         location: req.body.location,
         theme: req.body.theme,
         pictures: img_url,
     })
     
     await recommandation.save()
     res.status(201).send(recommandation)
 
     }catch(e) {
        res.status(500).send(e)
    }
})

module.exports = router