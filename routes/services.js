const express = require('express')
const router = express.Router()
const Services = require('../models/services')
const cloudinary = require("../utils/cloudinary")
const upload = require("../utils/multer")
const Category = require('../models/Category')



router.post('/api/addServices',upload.single('image'), async(req,res)=>{
    const category = await Category.findById(req.body.category)
    if(!category) return res.status(404).send('invalid category')

    try{
        const result = await cloudinary.uploader.upload(req.file.path)
    const services = new Services({
        name:req.body.name,
        price:req.body.price,
        image:result.secure_url,
        category:category,
        quantity:req.body.quantity


            
    })
       
            await services.save()
            res.status(200).send({
                status : 200 ,
                message1 : req.t('create_success')
            })
        }catch(Error){
            res.status(400).json({
                status : 400,
                message : Error.message||req.t('get_Error')
            })
        }
    })
 


router.get('/api/getServices',async(req,res)=>{
    try{
        const services = await Services.find()
       res.status(200).send({
        status:200,
        message:req.t('create_success'),
        services
    })
    }catch(e){
        res.status(400).send(error)
    }
})


router.get('/api/getServices/:id',async(req,res)=>{
   try{ 
     const services = await Services.find({
        category:req.params.id
        
     })
     res.status(200).send({
        status:200,
        message:req.t('create_success'),
        services
    })
    }catch(Error){
        res.status(400).json({
            status : 400,
            message : Error.message||req.t('get_Error')
        })
    }

    

})

router.get('/api/search/:key',async(req,res)=>{
    try{
       let services = await Services.find({
        "$or":[
            {name:{$regex:req.params.key}},
        ]
    })
    
        res.status(200).send({services})
    }catch(Error){
        res.status(400).send({
            message:Error.message
        })
    }
})






module.exports = router