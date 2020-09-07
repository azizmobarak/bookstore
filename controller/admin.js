const Admin = require('../model/admin');
const jwt = require('jsonwebtoken');

//verify admin
const verifyadmin = (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;

    Admin.find({ email: email }, (err, doc) => {
        if (err) res.status(401)
            .json({ message: 'error detected, please try login again!' });
        else {
            try {
                if (typeof(doc[0].password) !== "undefined") {
                    if (doc[0].password === password) {
                        next();
                    } else {
                        res.status(401)
                            .json({ message: 'Email or password not matches any user' });
                    }
                }
            } catch {
                res.send('error , try again and make sure email are correct')
            }
        }
    });
}



const adminlogin = (req, res) => {
    jwt.sign({ email: req.body.email }, "adminkey", (err, token) => {
        if (err) res.status(401)
            .json({ message: 'error detected, please try login again!' });
        else {
            res.cookie(token, "tokenadmin", { httpOnly: true });
            res.json({
                message: "OK",
            });
        }
    });
}


module.exports = { adminlogin, verifyadmin }