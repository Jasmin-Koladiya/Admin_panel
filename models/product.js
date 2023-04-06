const mongoose = require('mongoose');
const path = require('path');
const productSchema = mongoose.Schema({
    categoryid:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category',
        required : true
    },
    subcategoryid:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Subcategory',
        required : true
    },
    extracategoryid:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Extracategory',
        required : true
    },
    product:{
        type : String,
        required : true
    }
    
})
const product = mongoose.model('Product',productSchema);
module.exports = product;