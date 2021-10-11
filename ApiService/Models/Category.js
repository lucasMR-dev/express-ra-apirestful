const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const normalize = require("normalize-mongoose");

const CategorySchemma = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  family: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Family',
    required: true,
  }
});
CategorySchemma.index({name: 1})
CategorySchemma.plugin(timestamp);
CategorySchemma.plugin(normalize);

const Category = mongoose.model("Category", CategorySchemma);

module.exports = Category;
