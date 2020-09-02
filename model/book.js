const mongoose = require('mongoose');


const BookSchema = mongoose.Schema({
    title: String,
    price: Number,
    img: String,
    url: String,
    description: String
});

const books = mongoose.model('books', BookSchema);

module.exports = books;