const express = require('express')
const multer = require('multer');
const { 
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../Controller/Product.Controller')
const { verifyAccessToken } = require('../helpers/jwt_helpers');
const authorizeRoles = require('../helpers/authorize_roles');

const router = express.Router()

// Set up Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Make getAllRoleList accessible to anyone
router.use(verifyAccessToken, authorizeRoles('admin', 'super_admin', 'manager', 'employee'))

router.post("/", upload.single('image'), createProduct);
router.put("/:id", upload.single('image'), updateProduct);

router.route("/").get(getAllProducts);
router.route("/:id").get(getProductById).delete(deleteProduct);

module.exports = router
