const mongoose = require('mongoose');
const extracategorySchema = mongoose.Schema({
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
    extracategory:{
        type : String,
        required : true
    }
    
})
const extracategory = mongoose.model('Extracategory',extracategorySchema);
module.exports = extracategory;