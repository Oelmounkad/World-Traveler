const express = require('express')
const router = express.Router()

const Rating = require('../models/Rating')

const auth = require('../middleware/auth')



// POST /api/ratings
// @desc Adds a rating
// @access Private

router.post('/', auth, async (req, res) => {

    try {
 
    //create the Rating 
     const rating = new Rating({
         rater: req.sub,
         rated: req.body.rated,
         rating: req.body.rating,
         opinion: req.body.opinion
     })
     
     await rating.save()
     res.send(rating)
 
     }catch(e) {
        res.status(500).send(e)
    }
})


// // @route   GET api/ratings
// // @desc    Gets all rating for a user
// // @access  Public

router.get('/:id', async (req, res) => {

    try {
       const ratings = await Rating.find({rated: req.params.id})
       .populate([{path: 'rated' , populate: {path: 'profile'}},{path: 'rater' , populate: {path: 'profile'}}])
       if (!ratings) {
        return  res.status(404).send('error : No Ratings')
      }
      res.send(ratings)
    }catch(e) {
        res.status(500).send(e.message)
    }
})

module.exports = router