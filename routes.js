const express = require('express');
const app = express();
const route = express.Router();

//authorization
const Authorization = require('./controller/authorization');

const { Register, Emailexistence, verifyRegister } = require('./controller/register');
const { Login, verifyLogin, Userexistence } = require('./controller/login');
const { newbook_verification, Newbooks } = require('./controller/new-books');
const { booksdata, bookdata } = require('./controller/get-books');
const updatebook = require('./controller/updatebook');
const deletebook = require('./controller/deletebook');
const { updatetviews, countviews } = require('./controller/countviews');
const { allusers } = require('./controller/users');

route.route('/register').post(verifyRegister, Emailexistence, Register);
route.route('/login').post(verifyLogin, Userexistence, Login);
route.route("/newbooks").post(newbook_verification, Newbooks);
route.route("/allbooks/:page").get(booksdata);
route.route("/updatebook").patch(newbook_verification, updatebook);
route.route("/deletebook").delete(deletebook);
route.route("/bookdetails/:id").get(bookdata);
route.route("/updateviews").put(updatetviews);
route.route("/countviews").get(countviews);
route.route("/allusers/:page").get(allusers);


module.exports = route;