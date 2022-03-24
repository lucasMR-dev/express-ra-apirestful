const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const normalize = require('normalize-mongoose');

const ClientSchema = new mongoose.Schema({
    firstname: {
        type: String,
        trim: true
    },
    lastname: {
        type: String,
        trim: true
    },
    birthday: {
        type: Date
    },
    email: {
        type: String
    },
    phone: {
        type: String,
        default: ''
    }
});

ClientSchema.plugin(timestamp);
ClientSchema.plugin(normalize);

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;