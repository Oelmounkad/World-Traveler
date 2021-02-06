const express = require('express')
const router = express.Router()

const Comment = require('../models/Comment')
const Recommandation = require('../models/Recommandation')
const Question = require('../models/Question')


const auth = require('../middleware/auth')


// POST /api/comments/recommandations/:id
// @desc Adds a comment to a recommandation
// @access Private

router.post('/recommandations/:id', auth, async (req, res) => {
    const id = req.params.id
    
    try {
        const recommandation = await Recommandation.findById(id)

        const comment = new Comment({
            description: req.body.description,
            user: req.sub
        })
        await comment.save()

        recommandation.comments.push(comment._id)
        recommandation.save() 
        
        res.status(201).send(comment)
    }catch(e) {
        res.status(500).send(e)
    }
})

// GET /api/comments/recommandations
// @desc Gets all the comments of a recommandation by ID
// @access Public

router.get ('/recommandations/:id', async (req, res) => {
    const id = req.params.id

    try {
       const recommandation = await Recommandation.findById(id)
       const commentsIds = recommandation.comments

        const comments = await Comment.find({ _id : commentsIds })
       if (!comments) {
           return res.status(404).send('error : No comment found')
       }
       res.send(comments)
    }catch(e) {
        res.status(500).send(e) 
    }
})

// DELETE /api/comments/recommandations/:id
// @desc Delete a recommandation's comment
// @access Private
 
router.delete ('/recommandations/:id', auth, async (req, res) => {
    const _id = req.params.id
 
    try {
        const comment = await Comment.findById(_id)
        if(!comment) {
            return res.status(404).send('Comment does not exist !')
        }
        if(comment.user.toString() !== req.sub ) {
            return res.status(401).send('Not authorized to delete this comment !')
        }
        const commentDeleted = await Comment.findByIdAndDelete(_id)
        res.send(commentDeleted)
    }catch(e) {
        res.status(500).send(e)
    }
})


// POST /api/comments/questions/:id
// @desc Adds a comment to a question
// @access Private
 
router.post('/questions/:id', auth, async (req, res) => {
    const id = req.params.id
    
    try {
        const question = await Question.findById(id)
 
        const comment = new Comment({
            description: req.body.description,
            user: req.sub
        })
        await comment.save()
 
        question.comments.push(comment._id)
        question.save() 
        
        res.status(201).send(comment)
    }catch(e) {
        res.status(500).send(e)
    }
})

// GET /api/comments/questions/:id
// @desc Gets all the comments of a question by ID
// @access Public

router.get ('/questions/:id', async (req, res) => {
    const id = req.params.id

    try {
       const question = await Question.findById(id)
       const commentsIds = question.comments

        const comments = await Comment.find({ _id : commentsIds })
       if (!comments) {
           return res.status(404).send('error : No comment found')
       }
       res.send(comments)
    }catch(e) {
        res.status(500).send(e) 
    }
})

// DELETE /api/comments/questions
// @desc Delete a question's comment
// @access Private
 
router.delete ('/questions/:id', auth, async (req, res) => {
    const _id = req.params.id
 
    try {
        const comment = await Comment.findById(_id)
        if(!comment) {
            return res.status(404).send('Comment does not exist !')
        }
        if(comment.user.toString() !== req.sub ) {
            return res.status(401).send('Not authorized to delete this comment !')
        }
        const commentDeleted = await Comment.findByIdAndDelete(_id)
        res.send(commentDeleted)
    }catch(e) {
        res.status(500).send(e)
    }
})

// The like and unlike routes are for both recommandations's comments and questions's comments

// PATCH /api/comments/like/:id
// @desc Likes a comment
// @access Private

router.patch('/like/:id', auth , async (req,res) => {

    try {
        let comment = await Comment.findById(req.params.id)
        let currentLikes = comment.likes
        let newLikes = currentLikes + 1

        const updatedComment = {
            likes: newLikes
        }
        // Check if the comment exists in the database
        if(!comment) 
               return res.status(404).send({error :'Comment not found !'})

        let l = comment.likers.filter( liker => req.sub == liker)

        if(l.length === 0 ) {
            // Update the comment
            comment = await Comment.findByIdAndUpdate(req.params.id,
           {$set : updatedComment},
           {new: true})
           comment.likers.push(req.sub)
           comment.save()  
           res.send(comment)} 
           else{
            res.status(401).send({ error : 'you already liked this comment !'})
                }     
    }catch (e) {
        res.status(500).send(e)
    }
})

// PATCH /api/comments/unlike/:id
// @desc Unlikes a comment
// @access Private

router.patch('/unlike/:id', auth , async (req,res) => {

    try {
        let comment = await Comment.findById(req.params.id)
        let currentLikes = comment.likes
        let newLikes = currentLikes - 1

        const updatedComment = {
            likes: newLikes
        }
        // Check if the comment exists in the database
        if(!comment) 
               return res.status(404).send('Comment not found !')

            let l = comment.likers.filter( liker => req.sub == liker)

        if(l.length !== 0 ) {
            // Update the comment
            comment = await Comment.findByIdAndUpdate(req.params.id,
           {$set : updatedComment},
           {new: true})
           comment.likers.splice(comment.likers.indexOf(req.sub), 1)
           comment.save()  
            res.send(comment)
                                            } 
           else{
            res.status(401).json('you already dont like this comment !')
                }      
    } catch (e) {
        res.status(500).send(e)
    } 
})

module.exports = router