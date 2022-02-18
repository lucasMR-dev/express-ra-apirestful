const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const normalize = require('normalize-mongoose');

const MetricSchema = new mongoose.Schema({
    code: {
        type: String
    },
    name: {
        type: String
    },
    count: {
        type: Number
    }
});

MetricSchema.plugin(timestamp, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

MetricSchema.plugin(normalize);

const Metric = mongoose.model('Metric', MetricSchema);

module.exports = Metric;