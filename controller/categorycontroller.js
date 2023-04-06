const path = require('path');
const fs = require('fs');
const category = require('../models/category');
module.exports.add_category = function (req, res) {
    return res.render('add_category');
}
module.exports.insert_category = function (req, res) {
    console.log(req.body);
    category.create({
        category: req.body.category,
        isactive:1
    }, function(err){
        if(err) {
            console.log("category not add" +err);
            return false;
        }
        req.flash('success',' category inserted successfully')
        return res.redirect('back');
    })
}

module.exports.view_category = async function(req, res) {
    var activedata = await category.find({isactive: 1});
    let deactivedata = await category.find({isactive : 0});
    return res.render('view_category', {
        activedata: activedata,
        deactivedata: deactivedata
    })
}
module.exports.delete_category = function (req, res) {
    var id = req.params.id;
    category.findByIdAndDelete(id, function (err, data) {
        if (err) {
            console.log("category not delete");
            return false;
        }
        req.flash('success',' category Delete successfully')
        return res.redirect('back');
    });
}
module.exports.update_category = function (req, res) {
    category.findById(req.params.id, function (err, record) {
        if(err){
            console.log(err);
            return false;
        }
        return res.render('update_category', {
            data: record
    });
});
}
module.exports.edite_category = function (req, res){
    category.findByIdAndUpdate(req.body.id,{
        category:req.body.category,
    },function(err,){
            if(err){
                console.log(" can not update category");
                return false;
            }
        req.flash('success',' category Update successfully')
            return res.redirect('view_category');
        })
    }
module.exports.searchingData = async (req, res) => {
    var activedata = await category.find({"category" : new RegExp(req.body.search)});
    let deactivedata = await category.find({'isactive' : 0});
    return res.render('view_category', {
        activedata: activedata,
        deactivedata: deactivedata
    })
}   
module.exports.activestatus = function(req, res){
    category.findByIdAndUpdate(req.params.id,{
        'isactive': 1
    },function(err,updateData){
        if(err){
            console.log(err);
        }
        return res.redirect('back');
    })
}
module.exports.deactivestatus = function(req, res){
    category.findByIdAndUpdate(req.params.id,{
        'isactive': 0
    },function(err,updateData){
        if(err){
            console.log(err);
        }
        return res.redirect('back');
    })
}