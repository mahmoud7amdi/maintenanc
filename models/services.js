const mongoose = require('mongoose')



const subCategorySchema = new mongoose.Schema({

   name:{
    type:String,
    required:true
   },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'category',
        
        
    },
    
   
},
{ versionKey: false },

)

subCategorySchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        delete ret._id;
    }
});
const Services = mongoose.model('Services',subCategorySchema)
module.exports = Services