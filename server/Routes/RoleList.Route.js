const express = require('express')
const { 
    getAllRoleList,
    createRoleList,
    getRoleListById,
    updateRoleList,
    deleteRoleList
} = require('../Controller/RoleList.Controller')

const router = express.Router()

router.route("/").get(getAllRoleList).post(createRoleList);
router.route("/:id").get(getRoleListById).put(updateRoleList).delete(deleteRoleList);

module.exports = router
