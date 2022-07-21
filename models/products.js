const mongoose = require('mongoose'),
Schema = mongoose.Schema

const productsSchema = mongoose.Schema(
    {
        name:{
            type: String,
        },
        cmimi:{
            type: Number,
            min: 0,
        },
        categoryId: 
            {
             type: mongoose.Schema.Types.ObjectId, ref: 'Category'
         }
    },
    {timestamps:true}
);
module.exports = mongoose.model('Produkte',productsSchema)