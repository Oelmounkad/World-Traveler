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

// GET /api/meetings/
// @desc READ a user's meetings
// @access Private

router.get('/', auth, async (req, res) => {

    try {
        const meetings = await Meeting.find({user_1 : req.sub })
        const meetingsBis = await Meeting.find({user_2 : req.sub})

        Array.prototype.push.apply(meetings, meetingsBis)
        
        if (!meetings) {
            return res.status(404).send('error : No meeting found')
        }
        res.send(meetings)
     }catch(e) {
        res.status(500).send(e)
    }
})

module.exports = router