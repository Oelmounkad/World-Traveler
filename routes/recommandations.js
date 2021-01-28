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

// GET /api/recommandations
// @desc Gets all the recommandations
// @access Public

router.get ('/', async (req, res) => {

    try {
       const recommandations = await Recommandation.find()
       if (!recommandations) {
           return res.status(404).send('error : No recommandation found')
       }
       res.send(recommandations)
    }catch(e) {
        res.status(500).send(e) 
    }
})

// DELETE /api/recommandations
// @desc Delete a recommandation
// @access Private

router.delete ('/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const recommandation = await Recommandation.findById(_id)
        if(!recommandation) {
            return res.status(404).send('Recommandation does not exist !')
        }
        if(recommandation.user.toString() !== req.sub ) {
            return res.status(401).send('Not authorized to delete this recommandation !')
        }
        const recommandationDeleted = await Recommandation.findByIdAndDelete(_id)
        res.send(recommandationDeleted)
    }catch(e) {
        res.status(500).send(e)
    }
}) 

// PATCH /api/recommandations/:id
// @desc Likes a Recommandation
// @access Private

router.patch('/like/:id', auth , async (req,res) => {

    try {
        let recommandation = await Recommandation.findById(req.params.id)
        let currentLikes = recommandation.likes
        let newLikes = currentLikes + 1

        const updatedRecommandation = {
            likes: newLikes
        }
        // Check if the recommandation exists in the database
        if(!recommandation) 
               return res.status(404).send({error :'Recommandation not found !'})

        let l = recommandation.likers.filter( liker => req.user.id == liker)

        if(l.length === 0 ) {
            // Update the recommandation
            recommandation = await Recommandation.findByIdAndUpdate(req.params.id,
           {$set : updatedRecommandation},
           {new: true})
           recommandation.likers.push(req.sub)
           recommandation.save()  
           res.send(recommandation)} 
           else{
            res.status(401).send({ error : 'you already liked this recommandation !'})
                }     
    }catch (e) {
        res.status(500).send(e)
    }
})


module.exports = router