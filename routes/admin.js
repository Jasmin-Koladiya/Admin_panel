const { render } = require("ejs");
var express = require("express");
const passport = require("passport");
var routes = express.Router();
var Admin = require('../models/admin')
var AdminController = require("../controller/adminController");
routes.post(
  "/creatsession",
  passport.authenticate("local", { failureRedirect: "/login" }),
  AdminController.dashbordsession
);
routes.get("/", passport.checkAuthenticon, AdminController.Admin);
routes.get("/add_admin", passport.checkAuthenticon, AdminController.addAdmin);
routes.get("/view_admin", passport.checkAuthenticon, AdminController.viewAdmin);
// routes.post(  "/insertData",  passport.checkAuthenticon,Admin.uploadAvatar,  AdminController.insertData);
routes.post(  "/insertData",  passport.checkAuthenticon, AdminController.insertData);
routes.get(  "/deleteData/:id",  passport.checkAuthenticon, AdminController.deleteData);
routes.get(  "/updateData/:id",  passport.checkAuthenticon,  AdminController.updateData);
routes.post("/editData", passport.checkAuthenticon, AdminController.editData);
routes.get(  "/viewProfile/:id",  passport.checkAuthenticon,  AdminController.viewProfile);
routes.get("/lostpass",function(req, res){
  return res.render('lostpass')
})
routes.post('/checkmaile',AdminController.checkmaile)
routes.get("/registration", AdminController.registration);
routes.post("/register", AdminController.register);
routes.get("/login", AdminController.login);
routes.post("/Login", AdminController.Login);
routes.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      console.log("function not run");
     
    }
    return res.redirect("/login");
  });
});
routes.get('/checkotp',AdminController.checkotp);
routes.post('/verifyotp', AdminController.verifyotp);
routes.get('/generatenewpass',AdminController.generatenewpass)
routes.post('/resetpassword', AdminController.resetpassword);
module.exports = routes;
