const path = require('path');
const fs = require('fs');
const category = require('../models/category');
const subcategory = require('../models/subcategory');
const extracategory = require('../models/extracategory');
const product = require('../models/product');
const { model } = require('mongoose');
const { log } = require('console');
module.exports.add_product = function (req, res) {
    category.find({},function(err,cateData){
        if(err){
            console.log(err);
        }
        return res.render('add_product',{
            'cateData':cateData
        });
    })
}
module.exports.subdata = function(req,res){
    subcategory.find({'categoryid':req.body.cateid},
    function(err,subData){
        if(err){
            console.log("data not get");
        }
        return res.render('getsuboption',{
           'subData':subData
        })
    })
}
module.exports.extradata = function(req,res){
    extracategory.find({'subcategoryid':req.body.extraid},
    function(err,extraData){
        if(err){
            console.log("data not get");
        }
        return res.render('getextraoption',{
           'extraData':extraData
        })
    })
}

module.exports.insert_product = function(req,res){
    product.create(req.body,function(err,product){
        if(err){
            console.log(err);
        }
        return res.redirect('back')
    });
}
// module.exports.view_product = function (req, res) {
//     product.find({}, function (err, product) {
//         if(err){
//             console.log("data not get");
//         }
//         return res.render('view_product', {
//             'extradata' : product
//         });
//     });
// }
module.exports.view_product = async function (req, res) {
    let pdata = await product.find({}).populate('categoryid').populate('subcategoryid').populate('extracategoryid').exec();
    console.log(pdata);
    return res.render('view_product', {
        product : pdata
    });
}