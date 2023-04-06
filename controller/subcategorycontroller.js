const path = require('path');
const fs = require('fs');
const category = require('../models/category');
const subcategory = require('../models/subcategory');
module.exports.add_subcategory = function (req, res) {
    category.find({},function (err,cateData) {
        if(err){
            console.log(err);
        }
        return res.render('add_subcategory',{
            cdata : cateData
        });
    });
}
module.exports.insert_subcategory = function (req, res) {
    subcategory.create({
        categoryid: req.body.categoryid,
        subcategory: req.body.subcategory
    },function(err){
        if(err) {
            console.log("subcategory not add"+ err);
        }
        return res.redirect('back');
    })
}

module.exports.view_subcategory = async function (req, res) {
    let sdata = await subcategory.find({}).populate('categoryid').exec();
    return res.render('view_subcategory', {
        subData: sdata
    });
}