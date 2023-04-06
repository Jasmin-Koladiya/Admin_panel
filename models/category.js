var mongoose = require('mongoose');

var add_category = mongoose.Schema({
    category : {
        type : String,
        required : true
    },
    isactive : {
        type : Number,
        required : true
    },
});
var category = mongoose.model('Category', add_category);

module.exports = category;