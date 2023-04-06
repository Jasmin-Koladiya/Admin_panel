const { urlencoded } = require('express');
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const port = 8081;
const app = express();
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://jasminkoladiya:jasminkoladiya098@cluster0.bamfqbm.mongodb.net/?retryWrites=true&w=majority" , {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB connected!");
}).catch(err => {
    console.log("Error connecting to DB:", err);
});

const session = require('express-session')
const passport = require('passport')
const passportLocal = require('./config/passport_local_strategy');
const flash = require('connect-flash');
var custom = require('./config/middleware');
const { Cookie } = require('express-session');
const { default: mongoose } = require('mongoose');
app.use(express.static('assets'));
app.use(cookieParser());
app.use(urlencoded());  
app.use(session({
    name : "jasmin",
    secret : "node",
    resave : true,
    saveUninitialized : false,
    Cookie :{
        maxAge : 100*60*1000
    }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser)
app.use(flash());
app.use(custom.setFlash);
app.use('/', require('./routes/admin'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/category', require('./routes/category'));
app.use('/subcategory', require('./routes/subcategory'));
app.use('/extracategory', require('./routes/extracategory'));
app.use('/product',require('./routes/product'));
app.use('/uploads', express.static(path.join(__dirname,'uploads')));
app.listen(port, function(err){
    if(err)
    {
        console.log(err);
        return false;
    }
    console.log("Server is running on port = "+port);
});