const Joi = require('jsonwebtoken');
const book = require('../model/book');

const deletebook = (req, res) => {
    book.deleteOne({ _id: req.body.id }, (err, doc) => {
        if (err) console.log(err);
        else {
            res.send(doc);
        }
    });
}

module.exports = deletebook;