const mongoose = require('mongoose');


const AdminSchema = mongoose.Schema({
    email: String,
    password: String
});

const admin = mongoose.model('Admin', AdminSchema);

module.exports = admin;