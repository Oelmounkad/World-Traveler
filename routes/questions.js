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

// GET /api/questions
// @desc Gets all the questions
// @access Public

router.get ('/', async (req, res) => {

    try {
       const questions = await Question.find()
       if (!questions) {
           return res.status(404).send('error : No question found')
       }
       res.send(questions)
    }catch(e) {
        res.status(500).send(e) 
    }
})

// DELETE /api/questions
// @desc Delete a question
// @access Private

router.delete ('/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const question = await Question.findById(_id)
        if(!question) {
            return res.status(404).send('Question does not exist !')
        }
        if(question.user.toString() !== req.sub ) {
            return res.status(401).send('Not authorized to delete this question !')
        }
        const questionDeleted = await Question.findByIdAndDelete(_id)
        res.send(questionDeleted)
    }catch(e) {
        res.status(500).send(e)
    }
}) 
 

module.exports = router