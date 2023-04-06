
var express = require("express");
var routes = express.Router();
var subcategorycontroller = require("../controller/subcategorycontroller");
const { route } = require("./admin");
routes.get('/add_subcategory',subcategorycontroller.add_subcategory);
routes.post('/insert_subcategory',subcategorycontroller.insert_subcategory);
routes.get('/view_subcategory',subcategorycontroller.view_subcategory);
module.exports = routes;