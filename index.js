const Dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const BodyParser = require('body-parser');
const CookieParser = require('cookie-parser');
const Cors = require('cors');
const Port = process.env.PORT || 2000;
const mongoose = require('mongoose');
const router = require('./routes');

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(CookieParser());
app.use(Cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: "GET,PUT,PATCH,POST,DELETE,UPDATE",
}));

//routers
app.use('/api', router);

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true }, (err) => {
    if (err) console.log(err);
    else {
        console.log("connected to database")
    }
});

app.listen(Port, () => console.log("connected " + Port))