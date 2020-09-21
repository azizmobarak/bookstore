const express = require('express');
const app = express();
const route = express.Router();
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        var type = file.originalname;
        cb(null, file.fieldname + '-' + Date.now() + type.substring(type.indexOf('.'), type.length))
    }
})
var uploads = multer({ dest: 'uploads/', storage: storage });

var uploadslider = uploads.fields([
    { name: "img1", maxCount: 1 },
    { name: "img2", maxCount: 1 },
    { name: "img3", maxCount: 1 }
]);

//authorization
const { Authorization, AdminAuthorization } = require('./controller/authorization');

const { Register, Emailexistence, verifyRegister } = require('./controller/register');
const { Login, verifyLogin, Userexistence } = require('./controller/login');
const { newbook_verification, Newbooks } = require('./controller/new-books');
const { booksdata, bookdata, booksdataByCategorie, underteen, search, searchall } = require('./controller/get-books');
const updatebook = require('./controller/updatebook');
const deletebook = require('./controller/deletebook');
const { updatetviews, countviews } = require('./controller/countviews');
const { allusers, deleteuser } = require('./controller/users');
const { adminlogin, verifyadmin, countadmins, addadmin, verifyadminentry } = require('./controller/admin');
const { getallbookscount } = require('./controller/admin-chart');
const { updatecolor, updatefont, getcolor, getfont, updatelogo, getlogo, uploadsliderimg, getslider } = require('./controller/them');

//user routes 
route.route('/register').post(verifyRegister, Emailexistence, Register);
route.route('/login').post(verifyLogin, Userexistence, Login);
route.route("/allbooks/:page").get(booksdata);
route.route("/underteen/:page").get(underteen);
route.route("/search/:page/:searchkey").get(search);
route.route("/booksbycategorie/:page/:categorie").get(booksdataByCategorie);


//admin routes
route.route("/newbooks").post(AdminAuthorization, newbook_verification, Newbooks);
route.route("/updatebook").patch(AdminAuthorization, newbook_verification, updatebook);
route.route("/deletebook").delete(AdminAuthorization, deletebook);
route.route("/bookdetails/:id").get(bookdata);
route.route("/updateviews").put(updatetviews);
route.route("/countviews").get(countviews);
route.route("/allusers/:page").get(AdminAuthorization, allusers);
route.route("/deleteuser").delete(AdminAuthorization, deleteuser);
route.route("/admin").post(verifyadminentry, verifyadmin, adminlogin);
route.route("/admin/bookscount").get(getallbookscount);
route.route("/admin/count").get(countadmins);
route.route("/admin/new").post(verifyadminentry, addadmin);
route.route("/admin/searchbookwithoutlimit/:searchkey").get(AdminAuthorization, searchall);
route.route('/user/them/color').get(getcolor);
route.route('/user/font').get(getfont);
route.route('/user/slider').get(getslider)
route.route('/user/logo').get(getlogo)

//them routes 
route.route('/admin/them/color').put(AdminAuthorization, updatecolor);
route.route('/admin/them/font').put(AdminAuthorization, updatefont);
route.route('/admin/them/logo').post(AdminAuthorization, uploads.single('logo'), updatelogo);
route.route('/admin/them/slider').post(AdminAuthorization, uploadslider, uploadsliderimg);

module.exports = route;