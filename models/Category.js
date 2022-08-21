const mongoose = require('mongoose')


const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
   image:{
    type:String,
    required:true
   }
},

    { versionKey: false }
)

categorySchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        delete ret._id;

    }
    
});
const Category = mongoose.model('Category',categorySchema)
module.exports = Category