const express = require('express')
const router = express.Router()

const Profile = require('../models/Profile')
const User = require('../models/User')

const config = require('config')
// const cloudinary = require('../utils/cloudinary')

const auth = require('../middleware/auth')


// // @route   POST api/profiles
// // @desc    Create a profile
// // @access  Public  
 
router.post('/', async (req, res) => {
    const profile = new Profile(req.body)
    console.log(profile);
    try {
        const resultat = await profile.save()
        res.json(resultat)
    }catch(e) {
        res.status(400).send(e)
    }
})

// // @route   GET api/profiles
// // @desc    Gets all the profiles
// // @access  Public

// router.get ('/', async (req, res) => {

//     try {
//        
//     }catch(e) {
//
//     }
// })


// // @route   GET api/profiles
// // @desc    Gets a profile by ID
// // @access  Public

// router.get (':id', async (req, res) => {

//     try {
//        
//     }catch(e) {
//
//     }
// })

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

// router.delete ('/', async (req, res) => {

//     try {
//        
//     }catch(e) {
//
//     }
// })

module.exports = router