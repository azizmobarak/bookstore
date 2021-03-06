const Books = require('../model/book');

const getallbookscount = (req, res) => {
    Books.countDocuments((err, all) => {
        if (err) res.json({
            message: "error",
            data: "error refrech the page again"
        })
        else {
            Books.countDocuments({ $or: [{ ctaegorie: "diary" }, { categorie: "journal" }] }, (err, journal) => {
                if (err) res.json({
                    message: "error",
                    data: "error refrech the page again"
                })
                else {
                    Books.countDocuments({ categorie: ["other", "Other", "clothes", "sport", "shoes"] }, (err, other) => {
                        if (err) res.json({
                            message: "error",
                            data: "error refrech the page again"
                        })
                        else {
                            res.json({
                                message: "OK",
                                data: {
                                    all: all,
                                    journal: journal,
                                    other: other
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}




module.exports = { getallbookscount };