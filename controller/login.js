const User = require('../model/user');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');


//schema for verification
const verifySchema = Joi.object({
    email: Joi.string()
        .regex(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/, "example@example.com")
        .required(),
    password: Joi.string().required()
});

//verification data middlware
const verifyLogin = (req, res, next) => {

    if (typeof(verifySchema.validate(req.body).error) !== "undefined") {
        var path = verifySchema.validate(req.body).error.details[0].path[0];
        if (path === "password") {
            res.status(406)
                .json({ message: 'password can not be empty' })
        }
        if (path === "email") {
            res.status(406)
                .json({ message: 'email not valid please try something like this : example@example.example' })
        }

    } else {
        next();
    }
}

//verification user existance middlware 
const Userexistence = (req, res, next) => {
    User.find({ $and: [{ "password": req.body.password }, { "email": req.body.email }] }, "password", (err, doc) => {
        if (err) res.status(406)
            .json({ message: 'something happen please try later or contact us' });
        else {
            var tab = doc;
            if (tab.length == 1) {
                if (typeof(tab[0].password) !== "undefined") {
                    if (tab[0].password === req.body.password) {
                        next();
                    } else {
                        res.status(401)
                            .json({ massage: 'Email or password not correct please enter a valid email and password' });
                    }
                }
            } else {
                res.status(401)
                    .json({ massage: 'Email or password not correct please enter a valid email and password' });
            }
        }
    }).exec();
}

const Login = (req, res) => {
    try {
        jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: req.body.email
            },
            "logikeyn",
            (err, token) => {
                if (err) res.status(401)
                    .json({ message: 'error detected, please try login again!' });
                else {
                    res.cookie('token', token, { httpOnly: true });
                    res.status(200)
                        .json({ message: 'OK', data: "login" });
                }
            });
    } catch {
        res.status(403)
            .json({ message: 'please try again!' });
    }
}

module.exports = { Login, verifyLogin, Userexistence };