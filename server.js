const express = require('express')
const app = express()
const connectDB = require('./config/db')
const path = require('path')
const cors = require('cors')

//Connect DB
connectDB()

//Init Middleware
app.use(cors())
app.use(express.json({limit: '50mb',extended:true}))

// Users routes
app.use('/api/profiles',require('./routes/profiles'))
// Recommandations routes
app.use('/api/recommandations',require('./routes/recommandations'))
// Questions routes
app.use('/api/questions',require('./routes/questions')) 
// Comments routes
app.use('/api/comments',require('./routes/comments')) 
// Meetings routes
app.use('/api/meetings',require('./routes/meetings'))
// Cities routes
app.use('/api/cities',require('./routes/cities'))
// Ratings routes
app.use('/api/ratings',require('./routes/ratings'))

//Serve static assets in production (to uncomment in Production)

/*if(process.env.NODE_ENV === 'production'){
    //Set static folder
    app.use(express.static('client/build'))

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname,'client','build','index.html')))
}*/


module.exports = app
