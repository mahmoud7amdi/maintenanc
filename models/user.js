const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
require('dotenv').config()





const userSchema = new mongoose.Schema({
 

    gender:{
        type:String,
        required:true,
        enum:
         ["1","2"]
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    mobile:{
        type:String,
        required:true,
        trim:true,
        minlength : 7,
        maxlength: 11,
        unique:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate:{
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email',
            isAsync: false
        }
    },
    city:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    house_number:{
        type:Number
    },
    lat:{
        type:String
    },
    long:{
        type:String
    },
    fcm_token:{
        type:String,
        required:true
    },

    
  
    

},
{ versionKey: false },


)



userSchema.statics.findByCredentials = async(mobile)=>{
    const user = await User.findOne({mobile})
   
    if(!user&&!user.mobile){
        throw new Error('unable to login')
    }
    return user
    
}
userSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        delete ret._id;
    }
});


userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id:user._id.toString()},'mahmoud555')
    user.tokens = user.tokens
    await user.save()
    return token

}

const User = mongoose.model('User',userSchema)
module.exports = User