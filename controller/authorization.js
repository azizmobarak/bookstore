const jwt = require("jsonwebtoken");


const Authorization = (req, res, next) => {

    var token = req.cookies.token;
    jwt.verify(token, 'logikeyn', (err, decode) => {
        if (err) res.status(203)
            .json({ message: 'error detected, please try login again!' });
        else {
            next();
        }
    })

}

module.exports = Authorization;