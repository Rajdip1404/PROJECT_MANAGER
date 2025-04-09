const express = require("express");
const { project, adminOnly } = require("../middlewares/auth.middleware");
const   router = express.Router();
const {
  getDashboardData,
  getUserDashboardData,
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  updateTaskCheckList,
} = require("../controllers/task.controller");

router.get("/dashboard", project, adminOnly, getDashboardData); // done
router.get("/user-dashboard", project, getUserDashboardData); // done
router.get("/", project, getTasks); // done
router.get("/:id", project, getTaskById);  // done
router.post("/create", project, adminOnly, createTask); // done
router.put("/update/:id", project, updateTask); // done
router.delete("/delete/:id", project, adminOnly, deleteTask); //done
router.put("/:id/status", project, updateTaskStatus); //done
router.put("/:id/checklist", project, updateTaskCheckList); //done

module.exports = router;
