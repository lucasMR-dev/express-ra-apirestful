const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const normalize = require('normalize-mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    access_type: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        required: true
    }
});

UserSchema.plugin(timestamp);
UserSchema.plugin(normalize);

const User = mongoose.model('User', UserSchema);

module.exports = User;
