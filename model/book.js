const mongoose = require('mongoose');


const BookSchema = mongoose.Schema({
    title: String,
    price: Number,
    img: String,
    url: String,
    description: String,
    categorie: String
});

const Books = mongoose.model('books', BookSchema);

module.exports = Books;