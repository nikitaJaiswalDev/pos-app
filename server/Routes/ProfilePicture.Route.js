const express = require('express');
const multer = require('multer');
const { 
    createProPic,
    getProPicById
} = require('../Controller/ProfilePicture.Controller')

const router = express.Router()

// Set up Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single('image'), createProPic);
router.route("/:id").get(getProPicById);

module.exports = router
