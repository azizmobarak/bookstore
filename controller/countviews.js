const Views = require("../model/views")

//update current site view
const updatetviews = (req, res) => {
    Views.find((err, doc) => {
        if (err) res.status(401)
            .json({ message: "error detected , please try later" });
        else {
            console.log("get : " + doc[0].count);
            var count = doc[0].count;
            Views.updateOne({ _id: doc[0]._id }, { count: count + 1 }, (err, doc) => {
                if (err) res.status(401)
                    .json({ message: "error detected , please try later" });
                else {
                    res.status(200)
                        .json({
                            message: "OK",
                            data: "updated"
                        })
                }
            })
        }
    })
}

//number of site visites
const countviews = (req, res) => {
    Views.find((err, doc) => {
        if (err) res.status(401)
            .json({ message: "error detected , please try later" });
        else {
            res.status(200)
                .json({
                    message: "OK",
                    data: doc[0].count
                })
        }
    })
}

module.exports = { updatetviews, countviews };