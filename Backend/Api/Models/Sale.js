const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const normalize = require('normalize-mongoose');

const SaleSchemma = new mongoose.Schema({    
    details: {
        productInfo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number
        },
        total: {
            type: Number
        },
    },
    total: {
        type: Number
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    }
});

SaleSchemma.index({ product: 1 });
SaleSchemma.index({ employee: 1 });
SaleSchemma.plugin(timestamp);
SaleSchemma.plugin(normalize);

const Sale = mongoose.model('Sale', SaleSchemma);

module.exports = Sale;