const jwt = require('jsonwebtoken')
const Admin = require('../models/admin.model.js')

module.exports = async (req, res, next) => {
    const authHeader = req.header('Authorization')

    if (!authHeader) {
        return res.status(401).json({ message: 'No token, authorization denied' })
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const admin = await Admin.findById(decoded.admin.id)

        if (!admin) {
            return res.status(401).json({ message: 'Access denied, admin access required...!!!' })
        }

        req.admin = admin;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token, authorization denied' })
    }
}