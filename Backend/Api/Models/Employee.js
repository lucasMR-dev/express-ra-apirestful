const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const normalize = require('normalize-mongoose');

const EmployeeSchema = new mongoose.Schema({
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
    },
    job_name: {
        type: String,
        required: true
    },
    hire_date: {
        type: Date,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        unique: true
    }
});

EmployeeSchema.plugin(timestamp);
EmployeeSchema.plugin(normalize);

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;