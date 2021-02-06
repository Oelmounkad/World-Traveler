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

// DELETE /api/questions/:id
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

// PATCH /api/questions/like/:id
// @desc Likes a question
// @access Private

router.patch('/like/:id', auth , async (req,res) => {

    try {
        let question = await Question.findById(req.params.id)
        let currentLikes = question.likes
        let newLikes = currentLikes + 1

        const updatedQuestion = {
            likes: newLikes
        }
        // Check if the question exists in the database
        if(!question) 
               return res.status(404).send({error :'Question not found !'})

        let l = question.likers.filter( liker => req.sub == liker)

        if(l.length === 0 ) {
            // Update the question
            question = await Question.findByIdAndUpdate(req.params.id,
           {$set : updatedQuestion},
           {new: true})
           question.likers.push(req.sub)
           question.save()  
           res.send(question)} 
           else{
            res.status(401).send({ error : 'you already liked this question !'})
                }     
    }catch (e) {
        res.status(500).send(e)
    }
})

// PATCH /api/questions/like/:id
// @desc Unlikes a Question
// @access Private

router.patch('/unlike/:id', auth , async (req,res) => {

    try {
        let question = await Question.findById(req.params.id)
        let currentLikes = question.likes
        let newLikes = currentLikes - 1

        const updatedQuestion = {
            likes: newLikes
        }
        // Check if the question exists in the database
        if(!question) 
               return res.status(404).send('Question not found !')

            let l = question.likers.filter( liker => req.sub == liker)

        if(l.length !== 0 ) {
            // Update the question
            question = await Question.findByIdAndUpdate(req.params.id,
           {$set : updatedQuestion},
           {new: true})
           question.likers.splice(question.likers.indexOf(req.sub), 1)
           question.save()  
            res.send(question)
                                            } 
           else{
            res.status(401).json('you already dont like this question !')
                }      
    } catch (e) {
        res.status(500).send(e)
    } 
})
 

module.exports = router