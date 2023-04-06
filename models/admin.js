var mongoose = require('mongoose');
var multer = require('multer');
var path = require('path');
var AVATAR_PATH = ('/uploads/admin');

var adminSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    hobby : {
        type : Array,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    avatar : {
        type : String,
        required : true
    }
});

var storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, path.join(__dirname,"..",AVATAR_PATH));
    },
    filename : function(req, file, cb){
        cb(null, file.fieldname+"-"+Date.now());
    }
});

adminSchema.statics.uploadAvatar = multer({
    storage : storage
}).single('avatar');

adminSchema.statics.avatarpath = AVATAR_PATH;


var admin = mongoose.model('Admin', adminSchema);

module.exports = admin;