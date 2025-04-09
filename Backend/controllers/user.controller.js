const Task = require('../models/task.model');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find({role:'member'}).select("-password");

        const userWithTaskCounts = await Promise.all(users.map(async (user) => {
            const pendingTasks = await Task.countDocuments({assignedTo: user._id, status: "Pending"});
            const inProgressTasks = await Task.countDocuments({assignedTo: user._id, status: "In-Progress"});
            const completedTasks = await Task.countDocuments({assignedTo: user._id, status: "Completed"});
            return {...user._doc, pendingTasks, inProgressTasks, completedTasks}; 
        }));

        res.status(200).json(userWithTaskCounts);

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}
const getUserByid = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}


module.exports = {getUsers, getUserByid};