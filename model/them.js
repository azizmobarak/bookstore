const mongoose = require('mongoose');

//color model
const ThemcolorSchema = mongoose.Schema({
    color: String,
});
//font model
const ThemfontSchema = mongoose.Schema({
    font: String,
});
//logo model
const ThemlogoSchema = mongoose.Schema({
    logo: String,
});
//slider model
const ThemsliderSchema = mongoose.Schema({
    img1: String,
    img2: String,
    img3: String,
});

const themfont = mongoose.model('themFont', ThemfontSchema);
const themcolor = mongoose.model('themColor', ThemcolorSchema);
const themlogo = mongoose.model('themLogo', ThemlogoSchema);
const themslider = mongoose.model('themSliderSchema', ThemsliderSchema);

module.exports = { themlogo, themcolor, themfont, themslider };