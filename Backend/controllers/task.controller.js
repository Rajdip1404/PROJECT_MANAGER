const Task = require("../models/task.model");

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};
    if (status) {
      filter.status = status;
    }

    let tasks;

    if (req.user.role === "admin") {
      tasks = await Task.find(filter).populate(
        "assignedTo",
        "name email profileImageUrl"
      );
    } else {
      tasks = await Task.find({ ...filter, assignedTo: req.user._id }).populate(
        "assignedTo",
        "name email profileImageUrl"
      );
    }

    // Add completed todoChecklist count to each task
    tasks = await Promise.all(
      tasks.map(async (task) => {
        const completedCount = task.todoCheckList.filter(
          (item) => item.completed
        ).length;

        return { ...task._doc, completedTodoCount: completedCount };
      })
    );

    // Status summmary counts
    const taskFilter =
      req.user.role === "admin" ? {} : { assignedTo: req.user._id };

    const allTasks = await Task.countDocuments(taskFilter);
    const pendingTasks = await Task.countDocuments({
      ...taskFilter,
      status: "Pending",
    });
    const inProgressTasks = await Task.countDocuments({
      ...taskFilter,
      status: "In Progress",
    });
    const completedTasks = await Task.countDocuments({
      ...taskFilter,
      status: "Completed",
    });

    res.status(200).json({
      tasks,
      statusSummary: {
        all: allTasks,
        pendingTasks,
        inProgressTasks,
        completedTasks,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get a task by ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "assignedTo",
      "name email profileImageUrl"
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Create a new task
const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      attachments,
      todoCheckList,
    } = req.body;

    const createdBy = req.user._id;

    if (!Array.isArray(assignedTo)) {
      return res
        .status(400)
        .json({ message: "AssignedTo must be an array of user IDs" });
    }

    if(dueDate && new Date(dueDate) < new Date()) {
      return res.status(400).json({ message: "Due date cannot be in the past" });
    }

    const task = new Task({
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      attachments,
      todoCheckList,
      createdBy,
    });
    const savedTask = await task.save();

    res
      .status(201)
      .json({ message: "Task created successfully", task: savedTask });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    if (!task.assignedTo.includes(req.user._id) && req.user.role !== "admin") {
      return res.status(403).json({
        message: "You are not authorized to update this task",
      });
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.priority = req.body.priority || task.priority;
    task.dueDate = req.body.dueDate || task.dueDate;
    task.assignedTo = req.body.assignedTo || task.assignedTo;
    task.attachments = req.body.attachments || task.attachments;
    task.todoCheckList = req.body.todoCheckList || task.todoCheckList;

    if (!Array.isArray(task.assignedTo)) {
      return res
        .status(400)
        .json({ message: "AssignedTo must be an array of user IDs" });
    }

    const updatedTask = await task.save();
    res
      .status(200)
      .json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask)
      return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Update task status
const updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const isAssigned = task.assignedTo.some(
      (userId) => userId.toString() === req.user._id.toString()
    );

    if (!isAssigned && req.user.role !== "admin")
      return res
        .status(403)
        .json({ message: "You are not authorized to update this task" });

    task.status = req.body.status || task.status;

    if (task.status === "Completed") {
      task.todoCheckList.forEach((item) => (item.completed = true));
      task.progress = 100;
    }

    const updatedTask = await task.save();

    res.status(200).json({ message: "Task status updated", task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Update task checklist
const updateTaskCheckList = async (req, res) => {
  try {
    const { todoCheckList } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    if (!task.assignedTo.includes(req.user._id) && req.user.role !== "admin") {
      return res.status(403).json({
        message: "You are not authorized to update this task checklist",
      });
    }

    task.todoCheckList = todoCheckList;

    const completedCount = task.todoCheckList.filter(
      (item) => item.completed
    ).length;
    const totalItems = task.todoCheckList.length;

    task.progress =
      totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

    if (task.progress === 100) task.status = "Completed";
    else if (task.progress === 0) task.status = "Pending";
    else task.status = "In Progress";

    await task.save();
    const updatedTask = await Task.findById(req.params.id).populate(
      "assignedTo",
      "name email profileImageUrl"
    );

    res.status(200).json({ message: "Checklist updated", task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get overall dashboard data
const getDashboardData = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments();
    const completedTasks = await Task.countDocuments({ status: "Completed" });
    const inProgressTasks = await Task.countDocuments({
      status: "In Progress",
    });
    const pendingTasks = await Task.countDocuments({ status: "Pending" });
    const overDueTasks = await Task.countDocuments({
      status: { $ne: "Completed" },
      dueDate: { $lt: new Date() },
    });

    const taskStatuses = ["Pending", "In Progress", "Completed"];
    const taskDistributionRaw = await Task.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);
    const taskDistribution = taskStatuses.reduce((acc, status) => {
      const formattedKey = status.replace(/\s+/g, "");
      acc[formattedKey] =
        taskDistributionRaw.find((item) => item._id === status)?.count || 0;
      return acc;
    }, {});
    taskDistribution["All"] = totalTasks;

    const taskPriorities = ["low", "medium", "high"];
    const taskPriorityLevelsRaw = await Task.aggregate([
      {
        $group: {
          _id: "$priority",
          count: { $sum: 1 },
        },
      },
    ]);

    const taskPriorityLevels = taskPriorities.reduce((acc, priority) => {
      acc[priority] =
        taskPriorityLevelsRaw.find((item) => item._id === priority)?.count || 0;
      return acc;
    }, {});

    const recentTasks = await Task.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select("title status priority dueDate createdAt");

    res.status(200).json({
      statistics: {
        totalTasks,
        completedTasks,
        inProgressTasks,
        pendingTasks,
        overDueTasks,
      },
      charts: {
        taskDistribution,
        taskPriorityLevels,
      },
      recentTasks,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get dashboard data for a specific user
const getUserDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;
    const totalTasks = await Task.countDocuments({ assignedTo: userId });
    const completedTasks = await Task.countDocuments({
      assignedTo: userId,
      status: "Completed",
    });
    const inProgressTasks = await Task.countDocuments({
      assignedTo: userId,
      status: "In Progress",
    });
    const pendingTasks = await Task.countDocuments({
      assignedTo: userId,
      status: "Pending",
    });
    const overdueTasks = await Task.countDocuments({
      assignedTo: userId,
      status: { $ne: "Completed" },
      dueDate: { $lt: new Date() },
    });

    const taskStatuses = ["Pending", "In Progress", "Completed"];
    const taskDistributionRaw = await Task.aggregate([
      {
        $match: { assignedTo: userId },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);
    const taskDistribution = taskStatuses.reduce((acc, status) => {
      const formattedKey = status.replace(/\s+/g, "");
      acc[formattedKey] =
        taskDistributionRaw.find((item) => item._id === status)?.count || 0;
      return acc;
    }, {});
    taskDistribution["All"] = totalTasks;

    const taskPriorities = ["low", "medium", "high"];
    const taskPriorityLevelsRaw = await Task.aggregate([
      {
        $match: { assignedTo: userId },
      },
      {
        $group: {
          _id: "$priority",
          count: { $sum: 1 },
        },
      },
    ]);

    const taskPriorityLevels = taskPriorities.reduce((acc, priority) => {
      acc[priority] =
        taskPriorityLevelsRaw.find((item) => item._id === priority)?.count || 0;
      return acc;
    }, {});

    const recentTasks = await Task.find({ assignedTo: userId })
      .sort({ createdAt: -1 })
      .limit(10)
      .select("title status priority dueDate createdAt");

    res.status(200).json({
      statistics: {
        totalTasks,
        completedTasks,
        inProgressTasks,
        pendingTasks,
        overdueTasks,
      },
      charts: {
        taskDistribution,
        taskPriorityLevels,
      },
      recentTasks,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  updateTaskCheckList,
  getDashboardData,
  getUserDashboardData,
};
