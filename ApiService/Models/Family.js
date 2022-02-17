const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const normalize = require('normalize-mongoose');

const FamilySchemma = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
});

FamilySchemma.plugin(timestamp);
FamilySchemma.plugin(normalize);

const Family = mongoose.model("Family", FamilySchemma);

module.exports = Family;
