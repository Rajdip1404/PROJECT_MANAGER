const express = require('express');
const {project, adminOnly} = require('../middlewares/auth.middleware');
const {exportTasksReport, exportUsersReport} = require('../controllers/report.controller');

const router = express.Router();

router.get("/export/tasks", project, adminOnly, exportTasksReport);
router.get("/export/users", project, adminOnly, exportUsersReport);

module.exports = router;