
var express = require("express");
var routes = express.Router();
var productController = require("../controller/productController");
const { route } = require("./admin");
routes.get('/add_product',productController.add_product);
routes.post('/subdata',productController.subdata);
routes.post('/extradata', productController.extradata);
routes.get('/view_product', productController.view_product);
routes.post('/insert_product',productController.insert_product)

module.exports = routes;