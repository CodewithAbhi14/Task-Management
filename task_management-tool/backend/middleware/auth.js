const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.status(401).json({ msg: 'Authorization denied, no token provided' });
    }

    // Extract the token by removing "Bearer " from the beginning
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user || decoded.admin;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Authorization denied, token is invalid' });
    }
};
