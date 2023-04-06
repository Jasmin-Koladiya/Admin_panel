const path = require('path');
const fs = require('fs');
const category = require('../models/category');
const subcategory = require('../models/subcategory');
const extracategory = require('../models/extracategory');
const { model } = require('mongoose');
const { log } = require('console');
module.exports.add_extracategory = function (req, res) {
    category.find({},function(err,cateData){
        if(err){
            console.log(err);
        }
        return res.render('add_extracategory',{
            'cateData':cateData
        });
    })
}
module.exports.subdata = function(req,res){
    subcategory.find({'categoryid':req.body.cateid},
    function(err,subData){
        if(err){
            console.log("data not send");
        }
        return res.render('getsuboption',{
           'subData':subData
        })
    })
}
module.exports.insert_extracategory = function(req,res){
    console.log(req.body);
    extracategory.create(req.body,function(err,extra){
        if(err){
            console.log(err);
        }
        return res.redirect('back')
    });
}
module.exports.view_extracategory = async function (req, res) {
    let edata = await extracategory.find({}).populate('categoryid').populate('subcategoryid').exec();
    console.log(edata);
    return res.render('view_extracategory', {
        extradata: edata
    });
}
module.exports.extradata = function(req,res){
    extracategory.find({'subcategoryid':req.body.extraid},
    function(err,extraData){
        if(err){
            console.log("data not send");
        }
        return res.render('getsuboption',{
           'extraData':extraData
        })
    })
}