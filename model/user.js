const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const users = mongoose.model('books', UserSchema);

module.exports = users;