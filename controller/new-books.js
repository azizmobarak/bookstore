const Joi = require("@hapi/joi");
const Verifyentry = require('./verifyentry');
const Book = require('../model/book');


//Joi schema to validate entry
const schema = Joi.object({
    id: Joi.string(),
    title: Joi.string().max(100).min(4).required(),
    price: Joi.number().min(5).required(),
    img: Joi.string().min(10).required(),
    url: Joi.string().min(10).required(),
    description: Joi.string().min(50).max(1000).required(),
    categorie: Joi.string().required()
});

//verification middlware
const newbook_verification = (req, res, next) => {
    Verifyentry(schema, req, res, next);
}

//register the book / products
const Newbooks = (req, res) => {
    var book = new Book(req.body);
    book.save((err, doc) => {
        if (err) console.log(err);
        else {
            res.send(doc);
        }
    });
}


module.exports = { newbook_verification, Newbooks };