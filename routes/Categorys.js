const express = require('express')
const router = express.Router()
const Category = require('../models/Category')
const upload = require('../utils/multer')
const cloudinary  = require('../utils/cloudinary')



  

router.post('/api/addCategory',upload.single('image'),async(req,res)=>{
    try{
        let result = await cloudinary.uploader.upload(req.file.path)
        let category = new Category({
            name:req.body.name,
            image:result.url
        })
        await category.save()
        res.send({
            status:200,
            message : req.t('create_success')})
    }catch(Error){
        res.status(400).json({
            status : 400 ,
            message1 : req.t('get_Error'),
            message2:Error.message
        })
    }
})

router.get('/api/getCategories',async(req,res)=>{
    try{
        const categories = await Category.find()
        res.status(200).send({
            status:200,
            message:req.t('create_success'),
            categories
        })
    }catch(Error){
        res.status(400).json({
            status : 400 ,
            message1 :req.t('get_Error'),
            message2 : Error.message
        })
    }
})

router.get('/api/getCategories/:id',async(req,res)=>{
    const _id = req.params.id
    try{
        const categories = await Category.findById(_id)
        if(!categories){
            res.status(404).json({
                status: 404,
                message1:req.t('get_Error'),
                message2:Error.message
            })
        }
        res.send({
            status:200,
            message:req.t('create_success'),
            categories
        })
    }catch(Error){
        res.status(400).json({
            status: 400 ,
            message1: req.t('get_Error'),
            message2:Error.message
        })
    }
})






module.exports = router