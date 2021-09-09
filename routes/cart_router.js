const express = require('express');
const router = express.Router();
const Product = require('../models/product_model');
const Cart = require('../models/cart_model');

router.get('/shoppingCart', (req, res) => {
    let query = Product.find(null);
    let cart = Cart.find(null);
    cart.exec((err, cart) => {
        query.exec((err, products) => {
            res.render('product/cart', {
                success: req.flash('success'),
                products: products,
                cart: cart,
                title: 'SHOPPING CART'
            })
        })
    })
})

module.exports = router;