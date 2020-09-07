const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    count: Number
});

const Views = mongoose.model('Views', Schema);

module.exports = Views;