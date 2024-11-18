const { validationResult } = require('express-validator');
const Admin = require('../models/admin.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');
const Task = require('../models/task.model.js');

// Register Admin
exports.registerAdmin = async (req, res) => {
    const errors = validationResult(req); // Changed `error` to `errors`

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, phonenumber } = req.body;

    try {
        let admin = await Admin.findOne({ email });

        if (admin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        admin = new Admin({ username, email, phonenumber, password: hash });
        await admin.save();

        const payload = { admin: { id: admin.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3d' });

        res.status(201).json({ email, username, phonenumber, token });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Login Admin
exports.loginAdmin = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(400).json({ message: 'Admin does not exist' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const payload = { admin: { id: admin.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3d' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Assign Task
exports.assignTask = async (req, res) => {
    const { userId, taskId } = req.body;

    try {
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.assignedTo = userId;
        await task.save();
        res.status(200).json({ message: 'Task assigned successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
