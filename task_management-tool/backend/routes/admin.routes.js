const express = require('express');
const { check } = require('express-validator');
const { registerAdmin, loginAdmin, getAllUsers, assignTask } = require('../controllers/admin.controller.js');
const auth = require('../middleware/auth.js');

const router = express.Router();

router.post(
    '/register',
    [
        check('username', 'Username is required').notEmpty(),
        check('email', 'Please enter a valid email').isEmail(),
        check('phonenumber', 'Please enter a valid phone number').isLength({ min: 10, max: 10 }),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
    ],
    registerAdmin
);

router.post(
    '/login',
    [
        check('email', 'Please enter a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    loginAdmin
);

router.get('/users', auth, getAllUsers);

router.post('/assign-task', auth, assignTask);

module.exports = router;
