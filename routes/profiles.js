const express = require('express')
const router = express.Router()

const Profile = require('../models/Profile')

const cloudinary = require('../utils/cloudinary')

const auth = require('../middleware/auth')


// // @route   POST api/profiles
// // @desc    Create a profile
// // @access  Private  
 
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


// // @route   GET api/profiles/:id
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


// // @route   GET api/profiles/user/:id
// // @desc    Gets a profile by User ID
// // @access  Public

router.get ('/user/:id', async (req, res) => {
    const _id = req.params.id

    try {
       const profile = await Profile.findOne({user: _id})
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
// // @access  Private

router.patch ('/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        let profile = await Profile.findById(_id)
        if(!profile) {
            return res.status(404).send('Profile does not exist !')
        }
        if(profile.user.toString() !== req.sub ) {
            return res.status(401).send('Not authorized to edit this profile !')
        }

    const {fullName,birthDate,city,description,languages,hobbies,profilePicture,address} = req.body
    const modifications = {}

    if(fullName) modifications.fullName = fullName
    if(birthDate) modifications.birthDate = birthDate
    if(city) modifications.city = city
    if(description) modifications.description = description
    if(languages) modifications.languages = languages
    if(hobbies) modifications.hobbies = hobbies
    if(address) modifications.address = address

        let img_url = ""

    if(profilePicture){

         await cloudinary.uploader.upload(profilePicture)
        .then((result) => {
            // Recuperate the url of the image stored
            img_url = result.secure_url
            modifications.profilePicture = img_url
        })
        .catch((e) => {
          res.status(500).send({e})
        })
    }
    profile = await Profile.findByIdAndUpdate(_id, {$set : modifications},{new: true})
    res.send(profile)

    }catch(e) {
        res.status(500).send(e)
    }
})

// @route   DELETE api/profiles
// @desc    Deletes a profile
// @access  Private

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

// @route   PATCH api/profiles/portfolio
// @desc    ADD to a portfolio
// @access  Private

router.patch ('/portfolio/:id', auth , async (req, res) => {
    const _id = req.params.id

    const updates = Object.keys(req.body)
    const allowedUpdates = ['portfolio']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update) )

    if (!isValidOperation) {
        return res.status(400).send({ error : 'Invalid updates'})
    }
    
    try {
        let profile = await Profile.findById(_id)
        if(!profile) {
            return res.status(404).send('Profile does not exist !')
        }
        if(profile.user.toString() !== req.sub ) {
             return res.status(401).send('Not authorized to edit this profile s portfolio !')
         }
        
        let img_url = "" 
 
        await cloudinary.uploader.upload(req.body.portfolio)
        .then((result) => {
            // Recuperate the url of the image stored
             img_url = result.secure_url          
        })
        .catch((e) => {
          res.status(500).send({e})
        })
         
             profile.portfolio.push(img_url)
             profile.save()  
             res.send(profile)
        
    }catch(e) {
        res.status(500).send(e)
    }
}) 

module.exports = router