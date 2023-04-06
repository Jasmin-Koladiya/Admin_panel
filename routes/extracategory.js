
var express = require("express");
var routes = express.Router();
var extracategorycontroller = require("../controller/extracategorycontroller");
const { route } = require("./admin");
routes.get('/add_extracategory',extracategorycontroller.add_extracategory);
routes.post('/subdata',extracategorycontroller.subdata);
routes.post('/insert_extracategory',extracategorycontroller.insert_extracategory)
routes.get('/view_extracategory',extracategorycontroller.view_extracategory);
module.exports = routes;