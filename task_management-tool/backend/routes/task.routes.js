const express = require('express')
const {check} = require('express-validator')
const auth = require('../middleware/auth.js')
const adminAuth = require('../middleware/adminAuth.js')
const {createTask, deleteTask, markTaskCompleted, getAllTasks} = require('../controllers/task.controller.js')

const router = express.Router()

router.post(
    '/',
        auth,
        adminAuth,[
        check('taskName', 'Task name is required').notEmpty(),
        check('taskDetails', 'Task details are required').notEmpty(),
        check('taskNumber', 'Task number is required').isNumeric()
    ],
    createTask
);

// Delete a task (Admin only)
router.delete('/:taskId', auth, adminAuth, deleteTask);

// Mark task as completed (User only)
router.patch('/:taskId/complete', auth, markTaskCompleted);

// Get all tasks (for Admin and User)
router.get('/', auth, getAllTasks);


module.exports = router