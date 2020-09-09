const Joi = require('@hapi/joi');


const Verifyentry = (schema, req, res, next) => {

    if (typeof(schema.validate(req.body).error) === "undefined") {
        next();
    } else {
        res.status(401)
            .json({
                message: "error",
                data: schema.validate(req.body).error.details[0].message
            });
    }
}

module.exports = Verifyentry;