const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const orderSchema = new mongoose.Schema({
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required: true
    }],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    address:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Address',
        required:true
    },
    totalPrice:{
        type: Number,
        
        
    },
    dateOrdered:{
        type: Date,  
        default:Date.now
    }
},
{ versionKey: false }
)
orderSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        delete ret._id;
    }
});


const Order = mongoose.model('Order',orderSchema)
module.exports = Order