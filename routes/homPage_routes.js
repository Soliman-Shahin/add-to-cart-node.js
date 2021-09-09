const express = require('express');
const router = express.Router();
const Product = require('../models/product_model');


// home page route
router.get('/:pageNo?', (req, res) => {
    let pageNo = 1
    if (req.params.pageNo) {
        pageNo = parseInt(req.params.pageNo)
    }
    if (req.params.pageNo == 0) {
        pageNo = 1
    }
    let q = {
            skip: 18 * (pageNo - 1),
            limit: 18
        }
        //find total documents
    let totalDocs = 0
    Product.countDocuments({}, (err, total) => {}).then((response) => {
        totalDocs = parseInt(response)
        Product.find({}, {}, q, (err, products) => {
            // res.json(products)
            let chunk = []
            let chunkSize = 3
            for (let i = 0; i < products.length; i += chunkSize) {
                chunk.push(products.slice(i, chunkSize + i))
            }
            //res.json(chunk)
            res.render('product/index', {
                chunk: chunk,
                message: req.flash('info'),
                total: parseInt(totalDocs),
                pageNo: pageNo,
                products: products,
                title: 'Home Page'
            })
        })
    })
})

module.exports = router;