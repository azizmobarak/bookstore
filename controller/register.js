const User = require('../model/user');
const Joi = require('@hapi/joi');
const Verifyentry = require('./verifyentry');


//Join user Verification Schema
const Userdetails = Joi.object({
    username: Joi.string().max(30).min(4).required(),
    email: Joi.string()
        .max(80)
        .regex(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/, "example@example.com")
        .required(),
    password: Joi.string().max(40).min(6).required()
});

//entry verification middlware
const verifyRegister = (req, res, next) => {
    //call verification
    Verifyentry(Userdetails, req, res, next);
}

//email existance verification middlware
const Emailexistence = (req, res, next) => {
    var email = req.body.email;
    User.find({ "email": email }, (err, doc) => {
        if (err) res.status(500)
            .json({ message: "error", data: "error detected please try later" });
        else {
            if (typeof(doc) !== "undefined") {
                if (doc.length > 0) {
                    res.status(406)
                        .json({ message: "error", data: "email already registred please try different" });
                } else {
                    next();
                }
            }
        }
    })
}

//finish the job = register success 
const Register = (req, res) => {
    var newuser = new User(req.body);
    newuser.save((err, doc) => {
        if (err) res.status(500)
            .json({ message: "error", data: "error detected please try later" });
        else {
            res.status(200)
                .json({
                    message: "OK",
                    data: 'Congrate!,you have registred succefully'
                });
        }
    });
}

module.exports = { verifyRegister, Emailexistence, Register }