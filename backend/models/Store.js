const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        
        min: 1,
        max: 5,
        default: 1,
    },
    reviewCount: {
        type: Number,
        
        default: 0,
    },
    ratings: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        rating: {
            type: Number,
            default: 1,
            min: 1,
            max: 5,
        },
    }]
});

module.exports = mongoose.model('Store', StoreSchema);
