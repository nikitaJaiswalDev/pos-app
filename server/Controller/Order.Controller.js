const createError = require("http-errors");
const OrderService = require("../Services/Order");

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await OrderService.getAllOrders();
    res.json({ data: orders, status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const order = await OrderService.createOrder(req.body);
    res.json({ data: order, message: "Order created Successfully", status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const order = await OrderService.getOrderById(req.params.id);
    if(!order) throw createError.NotFound()
    res.json({ data: order, status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const order = await OrderService.updateOrder(req.params.id, req.body);
    if(!order) throw createError.NotFound()
    res.json({ message: "Order Updated Successfully", status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await OrderService.deleteOrder(req.params.id);
    if(!order) throw createError.NotFound()
    res.json({ message: "Order Deleted Successfully", status: "success" });
  } catch (err) {
    next(err)
  }
};
