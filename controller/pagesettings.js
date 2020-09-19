const pagesettings = require('../model/pagesettings');
const joi = require('@hapi/joi')
const verifyentry = require('./verifyentry');

var schema = joi.object({
    privacy: joi.string().min(200).max(4000).required()
});

//------------ privacy policy --------------------------

const verifyprivacy = (req, res, next) => {
    verifyentry(schema, req, res, next);
}

const privacy = (req, res) => {
    pagesettings.countDocuments((err, count) => {
        if (err) res.status(401)
            .json({ message: "OK", data: "Error can't change logo, try again" });
        else {
            console.log(count)
            if (count == 0 || typeof count === "undefined") {
                var them = new pagesettings({ privacy: req.body.privacy });
                them.save((err, doc) => {
                    if (err) res.status(401)
                        .json({ message: 'error', data: "Error can't add the page content,try later" });
                    else {
                        console.log(doc)
                        console.log("doc " + doc);
                        res.status(200)
                            .json({
                                message: 'OK',
                                data: "Privacy added"
                            })
                    }
                })
            } else {

                pagesettings.updateOne({}, { privacy: req.body.privacy }, (err, doc) => {
                    if (err) res.status(401)
                        .json({ message: 'error', data: "Error can't change logo" });
                    else {
                        console.log(doc)
                        res.status(200)
                            .json({
                                message: 'OK',
                                data: "the privacy is updated"
                            })
                    }
                })

            }
        }

    })
}


const getprivacy = (req, res) => {
    pagesettings.findOne((err, doc) => {
        if (err) res.status(401)
            .json({ message: 'error', data: "Privacy page content Not Found" });
        else {
            res.status(200)
                .json({
                    message: 'OK',
                    data: doc.privacy
                })
        }
    })
}


///////////------------------------------------------











module.exports = { privacy, verifyprivacy, getprivacy }