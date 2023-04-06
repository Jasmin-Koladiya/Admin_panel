const mongoose = require('mongoose');
const path = require('path');
const subcategorySchema = mongoose.Schema({
    categoryid:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category',
        required : true
    },
    subcategory:{
        type : String,
        required : true
    }
})
const subcategory = mongoose.model('Subcategory',subcategorySchema);
module.exports = subcategory;