const jwt = require('jsonwebtoken')
const config = require('config')
const jwtDecode = require('jwt-decode')

module.exports = (req,res,next) => {
    // Get token from the header

    const token = req.header('x-auth-token')

    // check if not token

    if(!token) return res.status(401).json({msg: 'No token, authorization denied'})
    
    try {
        const decoded = jwtDecode(token)
        req.sub = decoded.sub
        next()
    } catch (err) {
        res.status(401).json({msg: 'token is not valid'})
    }
}