const express = require('express')
const router = express.Router()

const Comment = require('../models/Comment')
const Recommandation = require('../models/Recommandation')
const Question = require('../models/Question')

const cloudinary = require('../utils/cloudinary')

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


module.exports = router