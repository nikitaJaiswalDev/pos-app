const express = require('express');
const multer = require('multer');
const { 
    createProPic,
    getProPicById,
    deletePic
} = require('../Controller/ProfilePicture.Controller')
const { verifyAccessToken } = require('../helpers/jwt_helpers');
const authorizeRoles = require('../helpers/authorize_roles');

const router = express.Router()

// Set up Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.use(verifyAccessToken, authorizeRoles('Admin'))

router.post("/", upload.single('image'), createProPic);
router.route("/:id").get(getProPicById).delete(deletePic);

module.exports = router
