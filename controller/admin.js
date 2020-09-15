const Admin = require('../model/admin');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const verifyentry = require('./verifyentry');


const verifyadminentry = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string()
            .regex(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/, "example@example.com")
            .min(8).max(100).required(),

        password: Joi.string().min(6).max(100)
    });

    verifyentry(schema, req, res, next);
}

//count admins 
const countadmins = (req, res) => {
    Admin.countDocuments((err, count) => {
        if (err) res.status(401)
            .json({ message: 'error detected, please try login again!' });
        else {
            res.status(200)
                .json({
                    message: "OK",
                    data: count
                })
        }
    })
}

//add an admin 
const addadmin = (req, res) => {
    var admin = new Admin(req.body);
    admin.save((err, doc) => {
        if (err) res.status(401)
            .json({ message: 'error detected, please try login again!' });
        else {
            res.status(200)
                .json({
                    message: "OK",
                    data: "Success please login now"
                })
        }
    })
}



//verify admin
const verifyadmin = (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;

    Admin.find({ email: email }, (err, doc) => {
        if (err) res.status(401)
            .json({ message: 'erorr', data: "error detected, please try login again!" });
        else {
            try {
                if (typeof(doc[0].password) !== "undefined") {
                    if (doc[0].password === password) {
                        next();
                    } else {
                        res.status(401)
                            .json({
                                message: 'error',
                                data: "the email or password not correct"
                            });
                    }
                }
            } catch {
                res.send({
                    message: 'error',
                    data: 'error , try again and make sure email are correct'
                })
            }
        }
    });
}


//admin key login
const adminlogin = (req, res) => {

    jwt.sign({ email: req.body.email }, "adminkey", (err, token) => {
        if (err) res.status(401)
            .json({ message: "error", data: 'error detected, please try login again!' });
        else {
            console.log(token)
            res.cookie(token, "tokenadmin", { httpOnly: true, maxAge: 1 * 60 * 60 * 1000 });
            res.json({
                message: "OK",
                data: "Login success"
            });
        }
    });
}


module.exports = { adminlogin, verifyadmin, countadmins, addadmin, verifyadminentry }