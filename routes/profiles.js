const express = require('express')
const router = express.Router()

const Profile = require('../models/Profile')
const User = require('../models/User')

const cloudinary = require('../utils/cloudinary')

const auth = require('../middleware/auth')


// // @route   POST api/profiles
// // @desc    Create a profile
// // @access  Public  
 
router.post('/', auth, async (req, res) => {
    const {fullName, sexe, birthDate, city, profilePicture, description, portfolio, languages, hobbies } = req.body
    const profile = new Profile({fullName, sexe, birthDate, city, description,
                                 portfolio, languages, hobbies, user : req.sub })
     
    try {
        let img_url = ""

        if(profilePicture){
         await cloudinary.uploader.upload(profilePicture)
        .then((result) => {
            // Recuperate the url of the image stored
          img_url = result.secure_url
          console.log('image url : '+img_url)
        })
        .catch((error) => {
          res.status(500).send({
            message: "failure",
            error,
          })
        })
        }
        profile.profilePicture = img_url

        await profile.save()
        res.status(201).send(profile)

    }catch(e) {
        res.status(400).send(e)
    }
})

// // @route   GET api/profiles
// // @desc    Gets all the profiles
// // @access  Public

router.get ('/', async (req, res) => {

    try {
       const profiles = await Profile.find()
       if (!profiles) {
           return res.status(404).send('error : No profile found')
       }
       res.send(profiles)
    }catch(e) {
        res.status(500).send(e) 
    }
})


// // @route   GET api/profiles
// // @desc    Gets a profile by ID
// // @access  Public

router.get ('/:id', async (req, res) => {
    const _id = req.params.id

    try {
       const profile = await Profile.findById(_id)
       if (!profile) {
        return  res.status(404).send('error : Profile not found')
      }
      res.send(profile)
    }catch(e) {
        res.status(500).send()
    }
})

// // @route   PATCH api/profiles
// // @desc    Updates a profile
// // @access  Public

// router.patch ('/', async (req, res) => {

//     try {
//        
//     }catch(e) {
//
//     }
// })

// // @route   DELETE api/profiles
// // @desc    Deletes a profile
// // @access  Public

router.delete ('/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const profile = await Profile.findById(_id)
        if(!profile) {
            return res.status(404).send('Profile does not exist !')
        }
        if(profile.user.toString() !== req.sub ) {
            return res.status(401).send('Not authorized to delete this profile !')
        }
        const profileDeleted = await Profile.findByIdAndDelete(_id)
        res.send(profileDeleted)
    }catch(e) {
        res.status(500).send(e)
    }
}) 

module.exports = router