const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const normalize = require('normalize-mongoose');

const ProductSchemma = new mongoose.Schema({
    sku: {
        type: Number,
        unique: true
    },
    name: {
        type: String
    },
    price: {
        type: Number
    },
    salePrice: {
        type: Number
    },
    discount: {
        type: Number
    },
    shortDetails: {
        type: String
    },
    description: {
        type: String
    },
    stock: {
        type: Number
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand'
    },
    newPro: {
        type: Boolean,
        default: false
    },
    sale: {
        type: Boolean,
        default: false
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    tags: [],
    colorAvailable: [],
    pictures: []
})

ProductSchemma.index({ categories: 1 });
ProductSchemma.plugin(timestamp);
ProductSchemma.plugin(normalize);

const Product = mongoose.model('Product', ProductSchemma)

module.exports = Product;