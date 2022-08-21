const express = require('express')
const router = express.Router()
const Address = require('../models/address')

router.post('/api/addAddres',async(req,res)=>{
    const address = new Address(req.body)
    try{
        await address.save()
        res.status(200).json({
            status : 200,
            message : "Address Added"
        })
    }catch(Error){
        res.status(400).json({
            status: 400 ,
            message: Error.message
        })
    }
})

router.get('/api/getAdress',async(req,res)=>{
    
    try{
        const adresess = await Address.find()
        res.status(200).send({adresess})
    }catch(Error){
        res.status(400).json({
            status: 400 ,
            message: Error.message
        })
    }
})

router.get('/api/getAdress/:id',async(req,res)=>{
    const _id = req.params.id
    try{
        const address = await Address.findById(_id)
        if(!address){
            res.status(404).send('error')
        }
        res.status(200).json(address)
    }catch(Error){
        res.status(400).json({
            status: 400 ,
            message: Error.message
        })
    }
})

router.delete('/api/deleteAddress/:id',async(req,res)=>{
    try{
        const address = await Address.findByIdAndDelete(req.params.id)
        if(!address){
            res.status(404).send(Error)
        }
        res.json({
            status : 200,
            message : 'deleted success '
        })
    }catch(Error){
        res.status(400).json({
            status : 400 ,
            message : Error.message
        })
    }
})


module.exports = router