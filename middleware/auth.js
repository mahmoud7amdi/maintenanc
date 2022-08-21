const jwt = require('jsonwebtoken')
const User = require('../models/user')
require('dotenv').config()

const auth = async(req ,res , next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token,'mahmoud555')
        req.user = decoded
        const user = await User.findOne({ _id: decoded._id })
        if(!user){
            throw new Error()
        }
         req.token = token
         req.user = user
        next()
    }catch(Error){
        res.status(401).send({
            message : Error.message
        })
    }
}
module.exports = auth