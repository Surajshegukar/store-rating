const express = require('express');
const router = express.Router();
const Store = require('../models/Store');

router.get('/get-store', async (req, res) => {
    try {
        const store = await Store.find();
        res.status(200).json(store);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
});

router.post('/add-store', async (req, res) => {
    try {
        const { name,address } = req.body;
        const store = new Store({
            name,
            address
        });
        await store.save();
        res.status(200).json({
            message: 'Store added successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
});

router.put('/update-store/:id', async (req, res) => {
    try {
        const { name, address } = req.body;
        await Store.findByIdAndUpdate(req.params.id, {
            name,
            address
        });
        res.status(200).json({
            message: 'Store updated successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}
);

router.delete('/delete-store/:id', async (req, res) => {
    try {
        await Store.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: 'Store deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
});

module.exports = router;