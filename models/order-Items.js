const mongoose = require('mongoose')
const orderItemSchema = new mongoose.Schema({
    count:{
        type:Number,
        required:true
    },
    services:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Services',
        required:true
    }
})

const OrderItem = mongoose.model('OrderItem',orderItemSchema)
module.exports = OrderItem
