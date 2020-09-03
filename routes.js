const express = require('express');
const app = express();
const route = express.Router();


const { Register, Emailexistence, verifyRegister } = require('./controller/register');
const { Login, verifyLogin, Userexistence } = require('./controller/login');


route.route('/register').post(verifyRegister, Emailexistence, Register);
route.route('/login').post(verifyLogin, Userexistence, Login);


module.exports = route;