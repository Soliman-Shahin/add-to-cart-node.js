const mongoose = require('mongoose');
const schema = mongoose.Schema;

let addToCartSchema = new schema({
    productId: {
        type: String,
        required: true
    },
    productTitle: {
        type: String,
        required: true
    },
    productDetails: {
        type: String,
        required: true
    },
    productPrice: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('product', addToCartSchema, 'shoppingCart');