const router = require('express').Router();

const User = require('../models/User');
const Store = require('../models/Store');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, address,role } = req.body;
        const user = await User.findOne({
            email
        });
        if (user) {
            return res.status(400).json({
                isRegister: false,
                message: 'User already exists'
            });
        }
        const newUser = new User({
            name,
            email,
            password,
            address,
            role
        });
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);
        await newUser.save();
        res.status(200).json({
            isRegister: true,
            message: 'User registered successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}
);

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            email
        });
        if (!user) {
            return res.status(400).json({
                isLogin:false,
                message: 'User not found'
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                isLogin:false,
                message: 'Incorrect Credinatials'
            });
        }
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(payload, 'secret', {
            expiresIn: 3600
        }, (err, token) => {
            if (err) {
                throw err;
            }
            res.status(200).json({
                isLogin:true,
                token: token,
                role:user.role
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            isLogin:false,
            message: 'Internal server error'
        });
    }
}
);

router.get('/get-users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}
);

router.put('/update-user/:id', async (req, res) => {
    try {
        const { name, email, address } = req.body;
        await User.findByIdAndUpdate(req.params.id, {
            name,
            email,
            address,
        });
        res.status(200).json({
            message: 'User updated successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}
);

router.delete('/delete-user/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}
);

router.put('/change-password', async (req, res) => {
    try {
        const { email, oldPassword, newPassword } = req.body;
        const user = await User.findOne({
            email
        });
        if (!user) {
            return res.status(400).json({
                message: 'User not found'
            });
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Incorrect password'
            });
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();
        res.status(200).json({
            message: 'Password changed successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}
);



module.exports = router;

