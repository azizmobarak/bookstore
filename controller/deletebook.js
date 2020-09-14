const Joi = require('jsonwebtoken');
const book = require('../model/book');

const deletebook = (req, res) => {
    book.deleteOne({ _id: req.body.id }, (err, doc) => {
        if (err) res.status(401)
            .json({ message: "error", data: "Error please try late" })
        else {
            res.status(200)
                .json({
                    message: "OK",
                    data: "Success item deleted",
                });
        }
    });
}

module.exports = deletebook;