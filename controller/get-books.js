const Books = require('../model/book');

//books data with pages 
const booksdata = async(req, res) => {
    var numberpage = parseInt(req.params.page);
    var toskip = (numberpage - 1) * 12;

    await Books.countDocuments(async(err, count) => {
        if (err) res.status(401)
            .json({ message: 'error detected, please try again!' });
        else {
            await Books.find({}, 'title url img price', (err, doc) => {
                if (err) res.status(401)
                    .json({ message: 'error detected, please try again!' });
                else {
                    //detect pages number ----------------------
                    var pages;
                    var total = count / 12;
                    if (parseInt(total) < total) {
                        pages = parseInt(total) + 1;
                    } else {
                        pages = parseInt(total);
                    }
                    //--------------------------------------
                    res.status(200)
                        .json({
                            message: "OK",
                            data: doc,
                            pages: pages
                        });
                }
            }).skip(toskip).limit(12)
        }
    });
}

//function to get one book's details
const bookdata = (req, res) => {
    Books.find({ _id: req.params.id }, (err, doc) => {
        if (err) res.status(401)
            .json({ message: 'error detected, please try again!' });
        else {
            res.status(200)
                .json({
                    message: "OK",
                    data: doc
                })
        }
    });
}

//books data bu categories with pages
const booksdataByCategorie = async(req, res) => {
    var numberpage = parseInt(req.params.page);
    var categorie = req.params.categorie;
    var toskip = (numberpage - 1) * 12;

    await Books.countDocuments({ categorie: categorie }, async(err, count) => {
        if (err) res.status(401)
            .json({ message: 'error detected, please try again!' });
        else {
            console.log(count)
            await Books.find({ categorie: categorie }, 'title url img price', (err, doc) => {
                if (err) res.status(401)
                    .json({ message: 'error detected, please try again!' });
                else {
                    //detect pages number ----------------------
                    var pages;
                    var total = count / 12;
                    if (parseInt(total) < total) {
                        pages = parseInt(total) + 1;
                    } else {
                        pages = parseInt(total);
                    }
                    //--------------------------------------
                    res.status(200)
                        .json({
                            message: "OK",
                            data: doc,
                            pages: pages
                        });
                }
            }).skip(toskip).limit(12)
        }
    });
}

module.exports = { booksdata, bookdata, booksdataByCategorie };