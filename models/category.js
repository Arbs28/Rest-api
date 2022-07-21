const mongoose = require('mongoose'),
Schema = mongoose.Schema

const categorySchema = mongoose.Schema(
    {
        categoryName:{
            type: String,
            unique: true,
            required: true,
        },
            
    },
    {timestamps:true}
);
module.exports = mongoose.model('Category',categorySchema);