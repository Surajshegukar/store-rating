const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin','storeowner'],
        default: 'user',
    },
    ratings: [{
        storeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Store',
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
    }]
});

module.exports = mongoose.model('User', UserSchema);
