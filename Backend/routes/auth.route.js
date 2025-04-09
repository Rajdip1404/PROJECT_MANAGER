const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload.middleware');

const { registerUser, loginUser, getUserProfile, updateUserProfile } = require("../controllers/auth.controller");
const {project} = require("../middlewares/auth.middleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", project, getUserProfile);
router.put("/update-profile", project, updateUserProfile);

router.post("upload-image", upload.single("image"), (req, res) => {
    if(!req.file) {
        return res.status(400).json({message: "No file uploaded"});
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({message: "File uploaded successfully", imageUrl});
})

module.exports = router;
