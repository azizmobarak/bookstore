const mongoose = require('mongoose');

const pageschema = mongoose.Schema({
    FAQ: String,
    privacy: String,
});

const pagessettings = mongoose.model('pagesettings', pageschema);

module.exports = pagessettings;