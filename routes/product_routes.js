const express = require('express');
const router = express.Router();
const Product = require('../models/product_model');
const Cart = require('../models/cart_model');

const fileUpload = require('express-fileupload');
router.use(fileUpload());


// upload product page route
router.get('/uploadProduct', (req, res) => {
    res.render('product/upload_product', {
        title: 'UPLOAD PRODUCT'
    })
})


// show single Product page route
router.get('/:id', (req, res) => {
    let query = Product.find(null);
    query.exec((err, products) => {
        Product.findOne({ _id: req.params.id }, (err, product) => {
            if (!err) {
                res.render('product/product_page', {
                    product: product,
                    products: products,
                    title: 'PRODUCT PAGE'
                })
            } else {
                console.log(err)
            }
        })
    })
})

// create product
router.post('/uploadProduct', (req, res) => {
    if (req.files) {
        // file upload : imageFile is name of input
        // uploads folder name
        req.files.imageFile.mv('uploads/products/' + req.body.productTitle + ".png",
            (err) => {
                if (err)
                    return res.status(500).send(err);
            });
        let product = new Product({
            productImg: req.files.imageFile.data,
            productTitle: req.body.productTitle,
            productDetails: req.body.productDetails,
            productPrice: req.body.productPrice
        });
        product.save((err) => {
            if (!err) {
                console.log('Product was Uploaded')
                req.flash('info', 'Product Uploaded successfully')
                res.redirect('/home')
            } else {
                console.log(err)
            }
        })
    } else {
        res.status(500).json({
            success: false,
            msg: 'no image for upload'
        });
    }
});


// add product to cart
router.post('/addProductToCart', (req, res) => {
    Cart.findOne({ productId: req.body.productId }, (err, used) => {
        if (used) {
            return res.status(200).json({ error: true, msg: 'This Product already in Cart' });
        }
        if (!used) {
            let product = new Cart({
                productId: req.body.productId,
                productTitle: req.body.productTitle,
                productDetails: req.body.productDetails,
                productPrice: req.body.productPrice
            });
            product.save((err) => {
                    if (!err) {
                        res.status(200).json({ success: true, msg: 'Product was Added To Cart' });
                        console.log('Product Added to cart')
                        req.flash('info', 'Product Added to cart')
                    } else {
                        console.log(err)
                    }
                },
                (err) => {
                    if (!err) {
                        console.log('Product was Added To Cart')
                    } else {
                        console.log(err)
                    }
                })
        }
    })
});

// delete product from cart
router.post('/deleteProductFromCart', (req, res) => {
    Cart.findOneAndRemove({ productId: req.body.productId }, { multi: false },
        (err) => {
            if (!err) {
                console.log('Product Removed from cart')
                req.flash('success', 'Product Removed from cart')
                res.redirect('/shoppingCart')
            } else {
                console.log(err)
            };
        })
});


module.exports = router;