const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const normalize = require('normalize-mongoose');

const DepartmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: Number,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true
    },
    managers: [],
    employees: []    
});

DepartmentSchema.plugin(timestamp);
DepartmentSchema.plugin(normalize);

const Department = mongoose.model('Department', DepartmentSchema);

module.exports = Department;