const Order = require('../Models/Order.model')

exports.getAllOrders = async () => {
    return await Order.find();
};
exports.createOrder = async (data) => {
  return await Order.create(data);
};
exports.getOrderById = async (id) => {
  return await Order.findById(id);
};
 
exports.updateOrder = async (id, data) => {
  return await Order.findByIdAndUpdate(id, data);
};
 
exports.deleteOrder = async (id) => {
  return await Order.findByIdAndDelete(id);
};
