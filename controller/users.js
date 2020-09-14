const User = require('../model/user');


const allusers = (req, res) => {
    var page = req.params.page;
    var toskip = (page * 20) - 20;

    User.find({}, 'email', (err, doc) => {
        if (err) res.status(401)
            .json({ message: "error", data: "error  detected , please try later" });
        else {
            User.countDocuments((err, count) => {
                if (err) res.status(401)
                    .json({ message: "error", data: "error  detected , please try later" });
                else {
                    var pages = parseInt(count / 20);
                    res.status(200)
                        .json({
                            message: "OK",
                            data: doc,
                            pages: pages
                        });
                }
            })
        }
    }).skip(toskip).limit(20);
}

//remove user from list of users
const deleteuser = (req, res) => {
    var id = req.body.id;
    User.deleteOne({ _id: id }, (err, doc) => {
        if (err) res.status(401)
            .json({ message: "error", data: "error  detected , please try later" });
        else {
            res.status(200)
                .json({
                    message: "OK",
                    data: doc
                })
        }
    })
}

module.exports = { allusers, deleteuser }