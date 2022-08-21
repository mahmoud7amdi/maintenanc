const express = require('express')
const User = require('../models/user')
const router = express.Router()
const auth = require('../middleware/auth')
require('dotenv').config()



router.post('/api/user/register', async(req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(200).send({user,token})
    }catch(Error){
        res.status(400).send({
            status:400,
            message:Error.message
        })
    }
})
router.get('/api/Users', auth ,async(req,res)=>{
    try{
        const users = await User.find({})
        res.status(200).send({users})
    }catch(Error){
        res.status(400).send({
            status:400,
            message:Error.message
        })
    }
})
router.get('/api/user/:id',async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    }catch(Error){
        res.status(400).send({
            status:400,
            message:Error.message
        })
    }
})
router.get('/api/users/me',auth,(req,res)=>{
    try{
        res.send(req.user)
    }catch(Error){
        res.status(400).send({
            status:400,
            message:Error.message
        })
    }
})

router.post('/api/user/login',async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.mobile)
        
        const token = await user.generateAuthToken()
        res.send({user,token})
    }catch(Error){
        res.status(400).send({
            status:400,
            message:Error.message
        })
    }
})

router.patch('/api/updateUser',auth, async(req,res)=>{
    const updates = Object.keys(req.body);
    // console.log('update',  update)
    const allowedUpdates = ['name','email','mobile','address']
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update)) 
    
    if(!isValidOperation){
      return res.status(400).send({
        message : Error.message
    })
    }
    try{
      console.log('updates', updates)
       updates.forEach((update) => req.user[update] = req.body[update])
      await req.user.save()
      //const user =await User.findByIdAndUpdate(req.params.id , req.body ,{ new : true ,runValidators : true})
      
      res.send({
        status:200,
        message:'user updated successfuly'
      })

    }catch(Error){
      res.status(400).send({
        status:400,
        message: Error.message
      })

    }
  })

  router.delete('/api/deleteUser',auth, async(req , res)=>{
    try{

     await req.user.remove()
      res.send({
        status:200,
        message:'user deleted successfuly '
      })

    }catch(Error){
      res.status(400).send({
        status:400,
        message:Error.message
      })

    }
  })
module.exports = router