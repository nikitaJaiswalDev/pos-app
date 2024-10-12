const express = require('express')
const { 
    getAllOrders,
    createOrder,
    getOrderById,
    updateOrder,
    deleteOrder,
    getOrdersforChart
} = require('../Controller/Order.Controller')
const { verifyAccessToken } = require('../helpers/jwt_helpers');
const authorizeRoles = require('../helpers/authorize_roles');

const router = express.Router()
router.use(verifyAccessToken, authorizeRoles('admin', 'super_admin', 'manager', 'employee'))

router.route("/").get(getAllOrders).post(createOrder);
router.route("/:id").get(getOrderById).put(updateOrder).delete(deleteOrder);
router.route("/chart/:type").get(getOrdersforChart);

module.exports = router
