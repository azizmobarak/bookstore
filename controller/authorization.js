const jwt = require("jsonwebtoken");


const Authorization = (req, res, next) => {

    var token = req.cookies.token;
    jwt.verify(token, 'logikeyn', (err, decode) => {
        if (err) res.status(203)
            .json({ message: 'session', data: "error detected, please try login again!" });
        else {
            next();
        }
    })

}

const AdminAuthorization = (req, res, next) => {

    var token = req.cookies.admintoken;

    jwt.verify(token, 'adminkey', (err, decode) => {
        if (err) {
            res.status(203)
                .json({ message: 'session', data: "error detected please try again!" });
        } else {
            next();
        }
    })

}

module.exports = { Authorization, AdminAuthorization };