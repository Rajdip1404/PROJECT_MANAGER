const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true, minlength: 8},
    role: {type: String, required: true, enum: ['admin', 'member'], default: 'member'},
    profileImage: {type: String, default: ''}
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);