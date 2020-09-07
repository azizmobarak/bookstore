const Books = require('../model/book');


const booksdata = async(req, res) => {
    var numberpage = parseInt(req.params.page);
    var toskip = (numberpage - 1) * 12;

    await Books.countDocuments(async(err, count) => {
        if (err) res.status(401)
            .json({ message: 'error detected, please try again!' });
        else {
            await Books.find((err, doc) => {
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
                            pages: pages,
                            data: doc
                        })
                }
            }).skip(toskip).limit(12)
        }
    });
}


module.exports = { booksdata };