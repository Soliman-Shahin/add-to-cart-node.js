const mongoose = require('mongoose');
const schema = mongoose.Schema;

let productSchema = new schema({
    productImg: {
        type: Buffer
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

module.exports = mongoose.model('Product', productSchema, 'Products');