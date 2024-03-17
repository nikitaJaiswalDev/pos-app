const express = require('express')
const { 
    getAllEmployees, 
    getEmployeeById, 
    createEmployee, 
    updateEmployee, 
    deleteEmployee 
} = require('../Controller/Employee.Controller')
const { verifyAccessToken } = require('../helpers/jwt_helpers');
const authorizeRoles = require('../helpers/authorize_roles');

const router = express.Router()
router.use(verifyAccessToken, authorizeRoles('Admin', 'Supar Admin'))

router.route("/").get(getAllEmployees).post(createEmployee);
router.route("/:id").get(getEmployeeById).put(updateEmployee).delete(deleteEmployee);

module.exports = router
