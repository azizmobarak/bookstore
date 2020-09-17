const { themcolor, themfont, themlogo, themslider } = require('../model/them');

//---------color---------------------------------------

const updatecolor = (req, res) => {
    //count color
    themcolor.countDocuments((err, count) => {
        if (err)
            console.log(err);
        else {
            if (count == 0 || typeof count === "undefined") {
                var color = new themcolor(req.body)
                    //save new color
                color.save((err, doc) => {
                    if (err) res.status(403)
                        .json({ message: "error", data: "Error can't chnage the them color please try later" });
                    else {
                        res.status(200)
                            .json({
                                message: "OK",
                                data: "success,Color Changed to " + req.body.color
                            })
                    }
                })
            } else {
                //update the color
                themcolor.updateOne({}, { color: req.body.color }, (err, doc) => {
                    if (err) res.status(403)
                        .json({ message: "error", data: "Error can't chnage the them color please try later" });
                    else {
                        res.status(200)
                            .json({
                                message: "OK",
                                data: "success,Color Changed to " + req.body.color
                            })
                    }
                });
            }
        }
    });
}

//grt color 
const getcolor = (req, res) => {
    themcolor.findOne((err, doc) => {
        if (err)
            res.status(401).json({
                message: "OK",
                data: "error try later!"
            })
        else {
            res.status(200)
                .json({
                    message: "OK",
                    data: doc.color
                });
        }
    })
}

//--------------font --------------------------------

const updatefont = (req, res) => {
    console.log(req.body)
        //count the font
    themfont.countDocuments((err, count) => {
        if (err) res.status(403)
            .json({ message: "error", data: "can't change the font , try later!" });
        else {
            console.log("count " + count);
            if (count == 0 || typeof count == "undefined") {
                var font = new themfont(req.body);
                font.save((err, doc) => {
                    if (err) res.status(403)
                        .json({ message: "error", data: "can't change the font , try later!" });
                    else {
                        console.log(doc);
                        res.status(200).json({
                            message: "OK",
                            data: "Font changed to " + req.body.font
                        })
                    }
                })
            } else {
                themfont.updateOne({}, { font: req.body.font }, (err, doc) => {
                    if (err) res.status(403)
                        .json({ message: "error", data: "can't change the font , try later!" });
                    else {
                        console.log(doc)
                        res.status(200).json({
                            message: "OK",
                            data: "Font changed to " + req.body.font
                        })
                    }
                })
            }
        }
    })
}


module.exports = { updatecolor, updatefont, getcolor }