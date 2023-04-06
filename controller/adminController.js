var Admin = require('../models/admin');
var fs = require('fs');
var path = require('path');
const { render } = require('ejs');
const { match } = require('assert');
const nodemailer = require('nodemailer');
module.exports.dashbordsession = function (req, res) {
    req.flash('success', 'loging successfully')

    return res.redirect('/')
}
module.exports.Admin = function (req, res) {
    return res.render('dashboard');
}

module.exports.addAdmin = function (req, res) {
    return res.render('add_admin', {
        record: req.cookies.admin
    });
}

module.exports.viewAdmin = async function (req, res) {
    // Admin.find({}, function (err, record) {
    //     if (err) {
    //         console.log(err);
    //         return false;
    //     }
    //     return res.render('view_admin', {
    //         data: record

    //     });
    // });
    let search = '';
    if(req.query.search){
        search = req.query.search;
    }

    var page = 1;
    if(req.query.page){
        page = req.query.page;
    }

    var per_page = 3;
    let recordata = await Admin.find({
        $or:[
            {name :{$regex : '.*'+search+'.*'}},
            {email :{$regex : '.*'+search+'.*'}}
        ]
    })
    .skip((page -1)*per_page)
    .limit(per_page)
    .exec();

    let countdata = await Admin.find({
        $or:[
            {name :{$regex : '.*'+search+'.*'}},
            {email :{$regex : '.*'+search+'.*'}}
        ]
    }).countDocuments();
    return res.render('view_admin',{
        'data':recordata,
        'countrecord':Math.ceil(countdata/per_page),
        'searchdata': search,
        'previous': page-1,
        'next': page+1,
        'current': page
    });
}

module.exports.insertData = async function (req, res) {

    // call back function


    Admin.uploadAvatar(req, res, function () {
        var name = req.body.fname + " " + req.body.lname;
        if (req.file) {
            imgPath = Admin.avatarpath + "/" + req.file.filename;
        }
        Admin.create({
            name: name,
            email: req.body.email,
            password: req.body.password,
            gender: req.body.gender,
            hobby: req.body.hobby,
            city: req.body.city,
            description: req.body.description,
            avatar: imgPath
        }, function (err) {
            if (err) {
                console.log(err);
                return false;
            }
        });
    req.flash('success','Admin record inserted successfully in Database')
        return res.redirect('/view_admin');
    });


    // async await


    // var imgPath = '';
    // if (req.file) {
    //     imgPath = Admin.avatarpath + "/" + req.file.filename;
    // }
    // req.body.name = req.body.fname + " " + req.body.lname;
    // req.body.avatar = imgPath;
    // let admindata = await Admin.create(req.body);
    // if (admindata) {
    //     req.flash('success', ' record inserted successfully')
    //     return res.redirect('/view_admin');
    // }
    // else {
    //     console.log('Error record not add');
    // }

    // then




}

module.exports.deleteData = async function (req, res) {
    var id = req.params.id;
    // Admin.findById(id, function (err, record) {
    //     if (record.avatar) {
    //         fs.unlinkSync(path.join(__dirname, "..", record.avatar));
    //     }
    //     Admin.findByIdAndDelete(id, function (err, data) {
    //         if (err) {
    //             console.log(err);
    //             return false;
    //         }
    //         req.flash('success', ' record Delete successfully')
    //         return res.redirect('/view_admin');
    //     });
    // });
    let 
}

module.exports.updateData = async function (req, res) {

    let Update =  await Admin.findById(req.params.id);
    if (Update) {
        req.flash('success', ' record update successfully')
        return res.render('update', {
                    data: Update
                });
    }
    else{
        console.log('record not update');
    }

}

module.exports.editData = function (req, res) {
    Admin.uploadAvatar(req, res, function () {
        if (req.file) {
            Admin.findById(req.body.Id, function (err, data) {
                if (err) {
                    console.log(err);
                    return false;
                }
                if (data.avatar) {
                    fs.unlinkSync(path.join(__dirname, "..", data.avatar));
                }
                var imgPath = Admin.avatarpath + "/" + req.file.filename;
                Admin.findByIdAndUpdate(req.body.Id, {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    gender: req.body.gender,
                    hobby: req.body.hobby,
                    city: req.body.city,
                    description: req.body.description,
                    avatar: imgPath,
                }, function (err) {
                    if (err) {
                        console.log(err);
                        return false;
                    }
                    req.flash('success', ' Update successfully')
                    return res.redirect('/view_admin');
                });
            });
        }
        else {
            Admin.findById(req.body.Id, function (err, data) {
                if (err) {
                    console.log(err);
                    return false;
                }
                if (data.avatar) {
                    imgPath = data.avatar;
                }
                Admin.findByIdAndUpdate(req.body.Id, {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    gender: req.body.gender,
                    hobby: req.body.hobby,
                    city: req.body.city,
                    description: req.body.description,
                    avatar: imgPath,
                }, function (err) {
                    if (err) {
                        console.log(err);
                        return false;
                    }
                    return res.redirect('/view_admin');
                });
            });
        }
    });
}

module.exports.viewProfile = function (req, res) {
    Admin.findById(req.params.id, function (err, data) {
        if (err) {
            console.log(err);
            return false;
        }
        res.render('viewProfile', {
            profile: data,
            record: req.cookies.admin

        });
    });
}

module.exports.registration = function (req, res) {
    res.render('registration');

}

module.exports.login = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.render('login');
}

module.exports.register = function (req, res) {
    Admin.findOne({ email: req.body.email }, function (err, data) {
        if (err) {
            console.log(err);
            return false;
        }
        if (data) {
            console.log("Already registr.");
            return res.redirect('back');
        }
        else {
            if (req.body.password == req.body.cpassword) {
                Admin.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    gender: 'null',
                    city: 'null',
                    description: 'null',
                    hobby: [],
                    avatar: 'null'
                }, function (err, data) {
                    if (err) {
                        console.log(err);
                        return false;
                    }
                    return res.redirect('login');
                });
            }
            else {
                console.log("Password not match");
                return res.redirect('back');
            }
        }
    });
}

module.exports.Login = function (req, res) {
    Admin.findOne({ email: req.body.email }, function (err, data) {
        if (err) {
            console.log(err);
            return false;
        }
        if (data) {
            if (data.password == req.body.password) {
                res.cookie('adminId', data.id);
                res.cookie('admin', data);
                res.redirect('/');
            }
            else {
                console.log("Invalid password.");
                res.redirect('login');
            }
        }
        else {
            console.log("Invalid email.");
            res.redirect('login');
        }
    });
}
module.exports.checkmaile = function (req, res) {
    Admin.findOne({ email: req.body.email }, function (err, userdata) {
        if (err) {
            req.flash('error', 'something went wrong')
            return res.redirect('/lostpass');
        }
        if (userdata) {
            var otp = Math.ceil(Math.random() * 10000)
            var transport = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: "5f6da7ebb8308f",
                    pass: "bcd6b4718657af"
                }
            });
            let info = transport.sendMail({
                from: 'jasminkoladiya098@gmail.com', // sender address
                to: userdata.email, // list of receivers
                subject: "testing node email", // Subject line
                text: "check OTP", // plain text body
                html: `<b>your OTP:${otp} </b>`, // html body
            });
            res.cookie('otp', otp);
            res.cookie('email', userdata.email);
            req.flash('success', ' OTP sending successfully')
            return res.redirect('/checkotp');
        }
        else {
            return res.redirect('/lostpass');
        }

    })
}

module.exports.checkotp = function (req, res) {
    return res.render('checkotp');
}
module.exports.verifyotp = function (req, res) {
    console.log(req.body.otp);
    if (req.body.otp == req.body.otp) {
        return res.redirect('/generatenewpass');
    }
    else {
        req.flash('error', 'Invalid OTP');
        return res.redirect('/checkotp');
    }
}
module.exports.generatenewpass = function (req, res) {
    return res.render('generatenewpass');
}
module.exports.resetpassword = function (req, res) {
    if (req.body.npass == req.body.cpass) {
        Admin.findOne({ email: req.cookies.email }, function (err, record) {
            if (err) {
                console.log(err);
                return res.redirect('back');
            }
            if (record) {
                console.log(record, 'reset');
                Admin.findByIdAndUpdate(record.id, {
                    password: req.body.npass
                }, function (err) {
                    if (err) {

                        return res.redirect('back');
                    }
                    else {

                        return res.redirect('/logout');
                    }
                })
            }
        })
    }
    else {
        req.flash('error', 'Password not match');
        return res.redirect('/generatenewpass');
    }
}