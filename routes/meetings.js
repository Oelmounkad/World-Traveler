const express = require('express')
const router = express.Router()

const Meeting = require('../models/Meeting')

const auth = require('../middleware/auth')

// POST /api/meetings/:id
// @desc Adds a meeting
// @access Private

router.post('/:id', auth, async (req, res) => {

    try {
        const meeting = new Meeting({
            user_1 : req.sub,
            user_2 : req.params.id,
            location : req.body.location,
            time : req.body.time,
            statut : req.body.statut
        })

        await meeting.save()
        
        res.status(201).send(meeting)
     }catch(e) {
        res.status(500).send(e)
    }
})

module.exports = router