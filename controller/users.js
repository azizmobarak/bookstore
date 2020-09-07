const User = require('../model/user');


const allusers = (req, res) => {
    var page = req.params.page;
    var toskip = (page * 20) - 20;

    User.find({}, 'email', (err, doc) => {
        if (err) res.status(401)
            .json({ message: "error detected , please try later" });
        else {
            res.status(200)
                .json({
                    message: "OK",
                    data: doc
                });
        }
    }).skip(toskip).limit(20);
}


module.exports = { allusers }