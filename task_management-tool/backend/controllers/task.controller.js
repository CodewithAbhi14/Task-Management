const Task = require('../models/task.model.js')
const {validationResult} = require('express-validator')

exports.createTask = async (req, res) => {
    const error = validationResult(req)

    if(!error.isEmpty())
    {
        return res.status(400).json({error : error.array()})
    }

    const {taskName, taskDetails, taskNumber} = req.body;

    try {
        
        const task = new Task({taskName, taskDetails, taskNumber})

        await task.save()

        res.status(201).json({message : "Task created successfully", task})


    } catch (error) {
        res.status(500).json({message : "Task created successfully", error : error.message})
    }
}

exports.deleteTask = async (req, res) => {
    const { taskId } = req.params;

    try {
        const task = await Task.findByIdAndDelete(taskId);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error while deleting task' });
    }
};

exports.markTaskCompleted = async (req, res) => {
    const { taskId } = req.params;

    try {
        const task = await Task.findById(taskId);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        // Check if the task is already completed
        if (task.status === "Completed") {
            return res.status(400).json({ message: 'Task is already marked as completed' });
        }

        // Update status to Completed
        task.status = "Completed";
        await task.save();

        res.status(200).json({ message: 'Task marked as completed', task });
    } catch (error) {
        res.status(500).json({ message: 'Server error while marking task as completed' });
    }
};

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate('assignedTo', 'username email');
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching tasks' });
    }
};