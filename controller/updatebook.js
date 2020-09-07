const Joi = require('jsonwebtoken');
const book = require('../model/book');

const updatebook = (req, res) => {
    book.updateOne({ _id: req.body.id }, { title: req.body.title, description: req.body.description, price: req.body.price, url: req.body.url, img: req.body.img, categorie: req.body.categorie }, (err, doc) => {
        if (err) console.log(err);
        else {
            res.send(doc);
        }
    });
}

module.exports = updatebook;