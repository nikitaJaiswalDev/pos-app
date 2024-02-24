const express = require('express')
const { 
    getAllRoleNames,
    createRoleName,
    getRoleNameById,
    updateRoleName,
    deleteRoleName
} = require('../Controller/RoleNames.Controller')

const router = express.Router()

router.route("/").get(getAllRoleNames).post(createRoleName);
router.route("/:id").get(getRoleNameById).put(updateRoleName).delete(deleteRoleName);

module.exports = router
