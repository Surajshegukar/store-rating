const router = require('express').Router();
const Store = require('../models/Store');
const User = require('../models/User');
const auth = require('../middleware/auth');

router.post('/add-rating/:storeId',auth, async (req, res) => {
    try {
        const { rating } = req.body;
        const store = await Store.findById(req.params.storeId);
        if (!store) {
            return res.status(400).json({
                message: 'Store not found'
            });
        }
        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                message: 'Rating must be between 1 and 5'
            });
        }
        const user = await User.findById(req.user.id);
        const ratingObj = {
            userId: user.id,
            rating
        };
        store.ratings.push(ratingObj);
        store.rating = store.ratings.reduce((acc, curr) => acc + curr.rating, 0) / store.ratings.length;
        store.reviewCount = store.ratings.length;
        await store.save();
        res.status(200).json({
            message: 'Rating added successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}
);

router.get('/get-rating/:storeId', async (req, res) => {
    try {
        const store = await Store.findById(req.params.storeId);
        if (!store) {
            return res.status(400).json({
                message: 'Store not found'
            });
        }
        res.status(200).json({
            rating: store.rating,
            reviewCount: store.reviewCount
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}
);

router.get('/get-store-rating/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(400).json({
                message: 'User not found'
            });
        }
        const ratings = await Store.find({
            'ratings.userId': user.id
        });
        res.status(200).json(ratings);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}
);



module.exports = router;