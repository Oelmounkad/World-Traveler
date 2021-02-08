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
            requester : req.sub,
            hoster : req.params.id,
            location : req.body.location,
            time : req.body.time,
            message: req.body.message,
            statut : req.body.statut
        })

        const resu = await meeting.save()
        
        res.send(resu)
     }catch(e) {
        res.status(500).send(e.message)
    }
})

// GET /api/meetings/
// @desc READ a user's meetings
// @access Private

router.get('/', auth, async (req, res) => {

    try {
        const meetings = await Meeting.find({requester : req.sub })
        .populate([{path: 'hoster' , populate: {path: 'profile'}},{path: 'requester' , populate: {path: 'profile'}}])
        const meetingsBis = await Meeting.find({hoster : req.sub})
        .populate([{path: 'hoster' , populate: {path: 'profile'}},{path: 'requester' , populate: {path: 'profile'}}])
        Array.prototype.push.apply(meetings, meetingsBis)

        if (!meetings) {
            return res.status(404).send('error : No meeting found')
        }
        res.send(meetings)
     }catch(e) {
        res.status(500).send(e)
    }
})

// PATCH /api/meetings/
// @desc Update a meeting statut
// @access Private

router.patch('/:id', auth, async (req, res) => {

    try {
        const meeting = await Meeting.findById(req.params.id)
        
        if (!meeting) {
            return res.status(404).send('error : No meeting found')
        }
        if(meeting.requester.toString() !== req.sub ) {
            return res.status(401).send('Not authorized to delete this recommandation !')
        }
        res.send(meeting)
     }catch(e) {
        res.status(500).send(e)
    }
})
module.exports = router