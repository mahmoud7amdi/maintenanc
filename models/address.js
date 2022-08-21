const mongoose = require('mongoose')
const addressSchema = new mongoose.Schema({

    address:{
        type:String,
        required:true
    },
    street:{
        type:String,
        required:true
    },
    building :{
        type:Number
    },
    flat:{
        type:Number
    },
    floor:{
        type:Number
    },
    lat:{
        type:String
    },
    lng:{
        type:String
    }
   

},{versionKey:false}
)

addressSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        delete ret._id;

    }
    
});

const Address = mongoose.model('Address',addressSchema)
module.exports = Address