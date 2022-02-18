const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const normalize = require('normalize-mongoose');

const ProfileSchema = new mongoose.Schema({
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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    }
});

ProfileSchema.plugin(timestamp);
ProfileSchema.plugin(normalize);

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;
