const User = require('../model/user');
const Joi = require('@hapi/joi');

//entry verification middlware
const verifyRegister = (req, res, next) => {
    var userdetails = Joi.object({
        username: Joi.string().max(30).min(4).required(),
        email: Joi.string()
            .max(80)
            .regex(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/, "example@example.com")
            .required(),
        password: Joi.string().max(40).min(6).required()
    });
    if (typeof(userdetails.validate(req.body).error) === 'undefined') {
        next();
    } else {
        res.status(406)
            .json({ message: userdetails.validate(req.body).error.details[0].message })
    }
}

//email verification middlware
const Emailexistence = (req, res, next) => {
    var email = req.body.email;
    User.find({ "email": email }, (err, doc) => {
        if (err) res.status(500)
            .json({ message: "error detected please try later" });
        else {
            console.log(doc)
            if (typeof(doc) !== "undefined") {
                if (doc.length > 0) {
                    res.status(406)
                        .json({ message: "email already registred please try different" });
                } else {
                    next();
                }
            }
        }
    })
}

const Register = (req, res) => {
    var newuser = new User(req.body);
    newuser.save((err, doc) => {
        if (err) res.status(500)
            .json({ message: "error detected please try later" });
        else {
            res.status(200).json({ message: 'Congrate!,you have registred succefully' });
        }
    });
}

module.exports = { verifyRegister, Emailexistence, Register }