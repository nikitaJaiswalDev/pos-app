const express = require('express')
const { 
    getAllRoleList,
    createRoleList,
    getRoleListById,
    updateRoleList,
    deleteRoleList
} = require('../Controller/RoleList.Controller')
const { verifyAccessToken } = require('../helpers/jwt_helpers');
const authorizeRoles = require('../helpers/authorize_roles');

const router = express.Router()
router.use(verifyAccessToken, authorizeRoles('Admin'))

router.route("/").get(getAllRoleList).post(createRoleList);
router.route("/:id").get(getRoleListById).put(updateRoleList).delete(deleteRoleList);

module.exports = router
