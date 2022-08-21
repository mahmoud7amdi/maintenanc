const express = require('express')
const router = express.Router()
const Order = require('../models/order')
const OrderItem = require('../models/order-Items')
const auth = require('../middleware/auth')


router.post('/api/addOrder', async(req,res)=>{

    const orderItemsIds = Promise.all(req.body.orderItems.map(async(orderItem)=>{
        let newOrderItem = new OrderItem({
            count: orderItem.count,
            services: orderItem.services
        })
        newOrderItem = await newOrderItem.save()
        return newOrderItem._id
    }))
    const orderItemResolved = await orderItemsIds;
    const totalPrices =  await Promise.all(orderItemResolved.map(async(orderItemsId)=>{
        const orderItem = await OrderItem.findById(orderItemsId).populate('services','price')
        const totalPrice = orderItem.services.price * orderItem.count
        return totalPrice
    }))

    const totalPrice = totalPrices.reduce((a,b)=> a+b , 0)
    console.log(totalPrices)
    const order = new Order({
        orderItems:orderItemResolved,
        user:req.body.user,
        address:req.body.address,
        totalPrice:totalPrice
    })
    try{
        await order.save()
        res.status(200).send({
            status : 200 ,
            message:`order submited your total is : ${totalPrice}`
        })
        
    }catch (Error) {
        res.status(400).send({
            status:400,
            message : Error.message
        })
    }
})

router.get('/api/getOrder',auth,async(req,res)=>{
    try{
        
        const order = await Order.find({
            user:req.user._id
        }).populate('user').populate('address')
        .populate({ 
            path: 'orderItems', populate: {
                path :'services'} 
            });
        res.status(200).send({order})
    }catch(Error){
        res.status(400).send({
            status:400,
            message:Error.message
        })
    }

})
router.get('/api/getOrders',async(req,res)=>{
    try{
        const orderes = await Order.find().populate('user').populate('address')
        .populate({ 
            path: 'orderItems', populate: {
                path :'services'} 
            });
         res.status(200).send({orderes})
    }catch(Error){
        res.status(400).send({
            status:400,
            message:Error.message
        })
    }
})

router.get('/api/getOrder/:id', async (req, res) =>{
    try{
        const order = await Order.findById(req.params.id).populate('user').populate('address')
        .populate({ 
            path: 'orderItems', populate: {
                path :'services'} 
            });
        res.status(200).send({order})
    }catch(Error){
        res.status(400).send({ 
            status : 400,
            message : Error.message
        })
    }
})


module.exports = router