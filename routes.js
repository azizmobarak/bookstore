const express = require('express');
const app = express();
const route = express.Router();

//authorization
const Authorization = require('./controller/authorization');

const { Register, Emailexistence, verifyRegister } = require('./controller/register');
const { Login, verifyLogin, Userexistence } = require('./controller/login');
const { newbook_verification, Newbooks } = require('./controller/new-books');
const { booksdata, bookdata, booksdataByCategorie, underteen, search } = require('./controller/get-books');
const updatebook = require('./controller/updatebook');
const deletebook = require('./controller/deletebook');
const { updatetviews, countviews } = require('./controller/countviews');
const { allusers, deleteuser } = require('./controller/users');
const { adminlogin, verifyadmin } = require('./controller/admin');

route.route('/register').post(verifyRegister, Emailexistence, Register);
route.route('/login').post(verifyLogin, Userexistence, Login);
route.route("/newbooks").post(newbook_verification, Newbooks);
route.route("/allbooks/:page").get(booksdata);
route.route("/underteen/:page").get(underteen);
route.route("/search/:page/:searchkey").get(search);
route.route("/booksbycategorie/:page/:categorie").get(booksdataByCategorie);
route.route("/updatebook").patch(newbook_verification, updatebook);
route.route("/deletebook").delete(deletebook);
route.route("/bookdetails/:id").get(bookdata);
route.route("/updateviews").put(updatetviews);
route.route("/countviews").get(countviews);
route.route("/allusers/:page").get(allusers);
route.route("/deleteuser").delete(deleteuser);
route.route("/admin").post(verifyadmin, adminlogin);


module.exports = route;