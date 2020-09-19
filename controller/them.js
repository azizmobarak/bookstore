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

const getfont = (req, res) => {
    themfont.findOne((err, doc) => {
        if (err)
            res.status(401).json({
                message: "error",
                data: "error try later!"
            })
        else {
            res.status(200)
                .json({
                    message: "OK",
                    data: doc.font
                });
        }
    })
}

//--------------- logo --------------------------

const updatelogo = (req, res) => {
    console.log(req.file.filename)
    var file = req.file.filename;
    themlogo.countDocuments((err, count) => {
        if (err) res.status(401)
            .json({ message: "OK", data: "Error can't change logo, try again" });
        else {
            if (count == 0 || typeof count === "undefined") {
                var them = new themlogo({ logo: file });
                them.save((err, doc) => {
                    if (err) res.status(401)
                        .json({ message: 'error', data: "Error can't change logo" });
                    else {
                        console.log("doc " + doc);
                        res.status(200)
                            .json({
                                message: 'OK',
                                data: doc.logo
                            })
                    }
                })
            } else {

                themlogo.updateOne({}, { logo: file }, (err, doc) => {
                    if (err) res.status(401)
                        .json({ message: 'error', data: "Error can't change logo" });
                    else {
                        res.status(200)
                            .json({
                                message: 'OK',
                                data: "the logo is updated"
                            })
                    }
                })

            }
        }
    })
}

const getlogo = (req, res) => {
    themlogo.findOne((err, doc) => {
        if (err) res.status(401)
            .json({ message: 'error', data: "Error can't change logo" });
        else {
            res.status(200)
                .json({
                    message: 'OK',
                    data: doc.logo
                })
        }
    })
}

//--------------------------- Slider --------------------------------

const uploadsliderimg = (req, res) => {
    var img1 = req.files["img1"][0].filename;
    var img2 = req.files["img2"][0].filename;
    var img3 = req.files["img3"][0].filename;

    themslider.countDocuments((err, count) => {
        if (err) res.status(401)
            .json({ message: "OK", data: "Error can't change logo, try again" });
        else {
            console.log(count)
            if (count == 0 || typeof count === "undefined") {
                var them = new themslider({ img1: img1, img2: img2, img3: img3 });
                them.save((err, doc) => {
                    if (err) res.status(401)
                        .json({ message: 'error', data: "Error can't change logo" });
                    else {
                        console.log(doc)
                        console.log("doc " + doc);
                        res.status(200)
                            .json({
                                message: 'OK',
                                data: "new slider added"
                            })
                    }
                })
            } else {

                themslider.updateOne({}, { img1: img1, img2: img2, img3: img3 }, (err, doc) => {
                    if (err) res.status(401)
                        .json({ message: 'error', data: "Error can't change logo" });
                    else {
                        console.log(doc)
                        res.status(200)
                            .json({
                                message: 'OK',
                                data: "the slider is updated"
                            })
                    }
                })

            }
        }
    })


}


const getslider = (req, res) => {
    themslider.findOne((err, doc) => {
        if (err) res.status(401)
            .json({ message: 'error', data: "Error can't change logo" });
        else {
            res.status(200)
                .json({
                    message: 'OK',
                    data: doc
                })
        }
    })
}

//----------------------------------------------------------------------









module.exports = { updatecolor, updatefont, getcolor, getfont, updatelogo, getlogo, uploadsliderimg, getslider }