
var express = require("express");
var routes = express.Router();
var categorycontroller = require("../controller/categorycontroller");
const { route } = require("./admin");

routes.get('/add_category',categorycontroller.add_category);
routes.post('/insert_category',categorycontroller.insert_category);
routes.get('/view_category',categorycontroller.view_category);
routes.get('/delete_category/:id',categorycontroller.delete_category);
routes.get('/update_category/:id',categorycontroller.update_category);
routes.post('/edite_category',categorycontroller.edite_category)
routes.post('/searchingData',categorycontroller.searchingData)
routes.get('/deactivestatus/:id',categorycontroller.deactivestatus)
routes.get('/activestatus/:id',categorycontroller.activestatus)
module.exports = routes;