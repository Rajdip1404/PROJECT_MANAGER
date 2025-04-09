const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const project = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        
        if(token && token.startsWith('Bearer')) {
            token = token.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id).select("-password");
            req.user = user;
            next();
        } else {
            res.status(401).json({ message: 'Unauthorized, no token' });
        }


    } catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Token failed', error: error.message });
    }
};

const adminOnly = (req, res, next) => {
    if(req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access Denied, Admin only' });
    }
}

module.exports = { project, adminOnly };