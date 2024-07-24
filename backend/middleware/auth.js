// Initiating the middleware to verify the token
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({
            message: 'No token, authorization denied'
        });
    }
    try {
        const decoded = jwt.verify(token, 'secret');
        req.user = decoded.user;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Token is not valid'
        });
    }
};


module.exports = { auth, admin };