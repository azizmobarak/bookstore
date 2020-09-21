const { themcolor, themfont, themlogo, themslider } = require('../model/them');

//---------color---------------------------------------

const updatecolor = (req, res) => {
    //count color
    themcolor.countDocuments((err, count) => {
        if (err)
            res.status(401).json({
                message: 'error',
                data: "Error detected tyr later!"
            })
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
    try {
        themcolor.findOne((err, doc) => {
            if (err)
                res.status(401).json({
                    message: "OK",
                    data: "error try later!"
                })
            else {
                if (doc !== null) {
                    res.status(200)
                        .json({
                            message: "OK",
                            data: doc.color
                        });
                } else {
                    res.status(200)
                        .json({
                            message: "OK",
                            data: 'rgb(245, 218, 99)'
                        });
                }
            }
        })
    } catch {
        res.status(200)
            .json({
                message: "OK",
                data: 'rgb(245, 218, 99)'
            });
    }
}

//--------------font --------------------------------

const updatefont = (req, res) => {
    //count the font
    themfont.countDocuments((err, count) => {
        if (err) res.status(403)
            .json({ message: "error", data: "can't change the font , try later!" });
        else {
            if (count == 0 || typeof count == "undefined") {
                var font = new themfont(req.body);
                font.save((err, doc) => {
                    if (err) res.status(403)
                        .json({ message: "error", data: "can't change the font , try later!" });
                    else {
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
    try {
        themfont.findOne((err, doc) => {
            if (err)
                res.status(401).json({
                    message: "error",
                    data: "error try later!"
                })
            else {
                if (doc !== null) {
                    res.status(200)
                        .json({
                            message: "OK",
                            data: doc.font
                        });
                } else {
                    res.status(200)
                        .json({
                            message: "OK",
                            data: 'normal'
                        });
                }
            }
        })
    } catch {
        res.status(200)
            .json({
                message: "OK",
                data: 'normal'
            });
    }
}

//--------------- logo --------------------------

const updatelogo = (req, res) => {
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
    try {

        themlogo.findOne((err, doc) => {
            if (err) res.status(401)
                .json({ message: 'error', data: "Error can't change logo" });
            else {
                if (doc !== null) {
                    res.status(200)
                        .json({
                            message: 'OK',
                            data: doc.logo
                        })
                } else {
                    res.status(200)
                        .json({
                            message: 'OK',
                            data: "logo.png"
                        })
                }
            }
        })
    } catch {
        res.status(200)
            .json({
                message: 'OK',
                data: "logo.png"
            })
    }
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
            if (count == 0 || typeof count === "undefined") {
                var them = new themslider({ img1: img1, img2: img2, img3: img3 });
                them.save((err, doc) => {
                    if (err) res.status(401)
                        .json({ message: 'error', data: "Error can't change logo" });
                    else {
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
    try {
        themslider.findOne((err, doc) => {
            if (err) res.status(401)
                .json({ message: 'error', data: "Error can't change logo" });
            else {
                if (doc !== null) {
                    res.status(200)
                        .json({
                            message: 'OK',
                            data: doc
                        })
                } else {

                    res.status(200)
                        .json({
                            message: 'OK',
                            data: [
                                { img1: "img1.PNG" },
                                { img2: "img2.PNG" },
                                { img3: "img3.PNG" }
                            ]
                        })
                }
            }
        })
    } catch {
        var tab = {
            img1: "img1.PNG",
            img2: "img2.PNG",
            img3: "img3.PNG"
        };
        res.status(200)
            .json({
                message: 'OK',
                data: tab
            })
    }
}

//----------------------------------------------------------------------









module.exports = { updatecolor, updatefont, getcolor, getfont, updatelogo, getlogo, uploadsliderimg, getslider }