const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const normalize = require('normalize-mongoose');

const BrandSchemma = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    logo: {
        type: String
    },
    partnerStatus: {
        type: String
    },
    active: {
        type: Boolean,
        default: false
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }]

})
BrandSchemma.index({ name: 1 });
BrandSchemma.plugin(timestamp);
BrandSchemma.plugin(normalize);

const Brand = mongoose.model('Brand', BrandSchemma)

module.exports = Brand;