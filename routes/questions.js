const express = require('express')
const router = express.Router()

const Question = require('../models/Question')

const cloudinary = require('../utils/cloudinary')

const auth = require('../middleware/auth')

// POST /api/questions
// @desc Adds a user's question
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
    //create the question 
     const question = new Question({
         user: req.sub,
         description: req.body.description,
         city: req.body.city,
         theme: req.body.theme,
         pictures: img_url,
     })

     await question.save()
     res.status(201).send(question)

     }catch(e) {
        res.status(500).send(e)
    }
})

 

module.exports = router