const express = require("express");
const { adminOnly, project } = require("../middlewares/auth.middleware");
const {
    getUsers,
    getUserByid,
} = require("../controllers/user.controller");

const router = express.Router();



router.get("/", project, adminOnly, getUsers);
router.get("/:id", project, getUserByid);


module.exports = router;