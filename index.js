const Dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const BodyParser = require('body-parser');
const CookieParser = require('cookie-parser');
const Cors = require('cors');
const Port = process.env.PORT || 2000;
const mongoose = require('mongoose');


app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(CookieParser());
app.use(Cors({
    origin: "http://localhost:2222",
    credentials: true
}))

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true }, (err) => {
    if (err) console.log(err);
    else {
        console.log("connected to database")
    }
});

app.listen(Port, () => console.log("connected " + Port))