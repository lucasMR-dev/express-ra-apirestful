const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const normalize = require('normalize-mongoose');

const EmployeeSchema = new mongoose.Schema({
    job_name: {
        type: String,
        required: true
    },
    hire_date: {
        type: Date,
        required: true
    },
    position: {
        type: String,
        default: 'worker'
    },
    salary: {
        type: Number,
        required: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    }, 
    profile: {
        firstname: {
            type: String,
            trim: true
        },
        lastname: {
            type: String,
            trim: true
        },
        birthday: {
            type: String
        },
        phone: {
            type: String,
            default: ''
        },
        path: {
            type: String,
            default: '',
            trim: true
        },
        config: {
            language: {
                type: String,
                default: 'en-EN'
            },
            darkTheme: {
                type: Boolean,
                default: false
            },
            color: {
                type: String,
                default: 'blue'
            }
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
});

EmployeeSchema.plugin(timestamp);
EmployeeSchema.plugin(normalize);

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;